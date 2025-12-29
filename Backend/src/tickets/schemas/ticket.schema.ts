import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
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

  @Prop({ default: 'BOOKED' })
  status: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
