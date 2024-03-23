import express, { Request, Response } from "express";
import Kos from "../models/kos";
import { KosSearchResponse, SewaType } from "../shared/types";
import { ParsedQs } from "qs";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};

    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "priceAsc":
        sortOptions = { price: 1 };
        break;
      case "priceDesc":
        sortOptions = { price: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const kos = await Kos.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Kos.countDocuments(query);

    const response: KosSearchResponse = {
      data: kos,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Ada Sesuatu Yang Salah" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Kos ID Dibutuhkan")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id.toString();
    try {
      const kos = await Kos.findById(id);
      res.json(kos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error Fetch Kos" });
    }
  }
);

router.post(
  "/:kosId/sewa/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;
    const kosId = req.params.kosId;

    const kos = await Kos.findById(kosId);
    if (!kos) {
      return res.status(400).json({ message: "Kos Tidak Di Temukan" });
    }

    const totalCost = kos.price * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "idr",
      metadata: {
        kosId,
        userId: req.userId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error Membuat Pembayaran" });
    }
    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };
    res.send(response);
  }
);
router.post(
  "/:kosId/sewa",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment Intent Not Found" });
      }

      if (
        paymentIntent.metadata.kosId !== req.params.kosId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "Payment Intent Mismatch" });
      }
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment Intent Not Succeeded. Status: ${paymentIntent.status}`,
        });
      }

      const newSewa: SewaType = {
        ...req.body,
        userId: req.userId,
      };

      const kos = await Kos.findOneAndUpdate(
        { _id: req.params.kosId },
        { $push: { sewa: newSewa } }
      );

      if (!kos) {
        return res.status(400).json({ message: "Kos Tidak Ditemukan" });
      }
      await kos.save();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ada sesuatu Yang Salah" });
    }
  }
);
const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }
  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }
  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars.toString());

    constructedQuery.starRating = { $in: starRatings };
  }
  if (queryParams.maxPrice) {
    constructedQuery.price = {
      $lte: parseInt(queryParams.maxPrice.toString()),
    };
  }
  return constructedQuery;
};

export default router;
