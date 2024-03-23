import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Kos from "../models/kos";
import { KosType } from "../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const kos = await Kos.find({
      sewa: { $elemMatch: { userId: req.userId } },
    });
    const results = kos.map((eachKos) => {
      const userBookings = eachKos.sewa.filter(
        (booking) => booking.userId === req.userId
      );

      const kosWithUserSewa: KosType = {
        ...eachKos.toObject(),
        sewa: userBookings,
      };

      return kosWithUserSewa;
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ message: "Gagal Fetch Bookings" });
  }
});
export default router;
