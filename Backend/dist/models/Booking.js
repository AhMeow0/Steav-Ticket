import { Schema, model } from "mongoose";
const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    schedule: { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
    seat: { type: Schema.Types.ObjectId, ref: "Seat", required: true },
    status: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed",
    },
}, { timestamps: true });
export default model("Booking", bookingSchema);
//# sourceMappingURL=Booking.js.map