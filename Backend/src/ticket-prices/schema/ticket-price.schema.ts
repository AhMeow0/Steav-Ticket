import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketPriceDocument = HydratedDocument<TicketPrice>;

@Schema({ timestamps: true })
export class TicketPrice {
  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true, default: 0 })
  price: number;
}

export const TicketPriceSchema = SchemaFactory.createForClass(TicketPrice);
TicketPriceSchema.index({ origin: 1, destination: 1 }, { unique: true });
