import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  passengerName: string;

  @Prop({ required: true })
  seatNumber: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  departureTime: string;

  @Prop()
  paymentMethod?: string;

  @Prop({ default: 'BOOKED' })
  status: string;

  @Prop({ required: true, index: true })
  bookingId: string;

  @Prop({ required: true, index: true })
  ticketCode: string; // UUID-like string
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
