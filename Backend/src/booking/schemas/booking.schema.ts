import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

export enum BookingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
}

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, index: true })
  tripId: string;

  @Prop({ type: [String], required: true })
  seatNos: string[];

  @Prop({ required: true, enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Prop({ default: 0 })
  totalPrice: number;
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
