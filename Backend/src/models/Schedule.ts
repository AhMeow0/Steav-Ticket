import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
  bus: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
  route: { type: Schema.Types.ObjectId, ref: "Route", required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
});

export default model("Schedule", scheduleSchema);
