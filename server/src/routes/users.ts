import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/user/register
router.post(
  "/register",
  [
    check("email", "Email Tidak boleh Kosong").isEmail(),
    check(
      "password",
      "Password Tidak Boleh Kosong & Minimal 6 Character"
    ).isLength({ min: 6 }),
    check("firstName", "Nama Depan Tidak Boleh Kosong").isString(),
    check("lastName", "Nama Belakang Tidak boleh Kosong").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "Email Sudah Terdaftar" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "Register Berhasil" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ada Yang Salah :(" });
    }
  }
);
export default router;
