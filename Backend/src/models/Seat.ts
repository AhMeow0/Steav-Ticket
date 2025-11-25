import { Schema, model } from "mongoose";

const seatSchema = new Schema({
  bus: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumber: { type: String, required: true }, // "A1", "B2"
  isBooked: { type: Boolean, default: false },
  booking: { type: Schema.Types.ObjectId, ref: "Booking" },
});

export default model("Seat", seatSchema);
