import express, { Request, Response } from "express";
import Kos from "../models/kos";
import { KosSearchResponse } from "../shared/types";
import { ParsedQs } from "qs";

const router = express.Router();

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

export default router;
