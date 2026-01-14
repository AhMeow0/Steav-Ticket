import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket{
  @Prop({ type: Types.ObjectId, ref: 'User', required: true})
  userId: string;

  @Prop({type: Types.ObjectId, ref: 'Schedule',required: true})
  scheduleId: string;

  @Prop({ required: true })
  seatNumber: number;

  @Prop({ default: 'BOOKED' })
  status: string;

  @Prop({ required: true })
  final_price: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
