import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeatDocument = HydratedDocument<Seat>;

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  HELD = 'HELD',
  SOLD = 'SOLD',
}

@Schema({ timestamps: true })
export class Seat {
  @Prop({ required: true, index: true })
  tripId: string; // or Types.ObjectId if you use ObjectId

  @Prop({ required: true })
  seatNo: string; // e.g. "A1", "B2"

  @Prop({ required: true, enum: SeatStatus, default: SeatStatus.AVAILABLE })
  status: SeatStatus;

  @Prop({ type: String, default: null })
  holdByUserId: string | null;

  @Prop({ type: Date, default: null })
  holdUntil: Date | null;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
SeatSchema.index({ tripId: 1, seatNo: 1 }, { unique: true });
