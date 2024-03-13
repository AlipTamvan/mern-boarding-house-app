import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5M B
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Nama Harus Diisi"),
    body("phoneNumber").notEmpty().withMessage("Nomer HP Harus Diisi"),
    body("city").notEmpty().withMessage("Kota Harus Diisi"),
    body("country").notEmpty().withMessage("Daerah Harus Diisi"),
    body("description").notEmpty().withMessage("Deskripsi Harus Diisi"),
    body("price")
      .notEmpty()
      .isNumeric()
      .withMessage("Harga Harus Diisi Dan Harus Angka"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilitas Harus Diisi"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log("Masalah Ketika Menambahkan Hotel", error);
      res.status(500).json({ message: "Ada Sesuatu Yang Salah :(" });
    }
  }
);
export default router;
