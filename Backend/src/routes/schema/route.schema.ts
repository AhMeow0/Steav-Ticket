import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RouteDocument = HydratedDocument<Route>;

@Schema()
export class Route {
  @Prop({ required: true })
  routeNumber: string; // e.g., "BUS-101"

  @Prop({ required: true })
  origin: string; // e.g., "Phnom Penh"

  @Prop({ required: true })
  destination: string; // e.g., "Siem Reap"

  @Prop({ required: true })
  price: number; // e.g., 15.00

  @Prop({ required: true })
  departureTime: string; // e.g., "2023-12-25T08:00:00.000Z"

  @Prop({ default: 40 })
  totalSeats: number;

  @Prop({ type: [Number], default: [] })
  bookedSeats: number[]; // Stores taken seats: [1, 2, 5]
}

export const RouteSchema = SchemaFactory.createForClass(Route);
