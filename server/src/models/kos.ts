import mongoose from "mongoose";
import { KosType } from "../shared/types";

const KosSchema = new mongoose.Schema<KosType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  price: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const Kos = mongoose.model<KosType>("Kos", KosSchema);
export default Kos;
