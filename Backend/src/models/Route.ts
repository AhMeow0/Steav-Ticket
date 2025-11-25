import { Schema, model } from "mongoose";

const routeSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // "6h 30m"
});

export default model("Route", routeSchema);
