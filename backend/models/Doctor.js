import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true },
    city: { type: String, required: true },
    fee: { type: Number, required: true },
    bio: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
