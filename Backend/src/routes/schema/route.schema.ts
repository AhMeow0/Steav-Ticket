import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RouteDocument = HydratedDocument<Route>;

@Schema()
export class Route {
  @Prop({ required: true })
  origin: string; // e.g., "Phnom Penh"

  @Prop({ required: true })
  destination: string; // e.g., "Siem Reap"
}

export const RouteSchema = SchemaFactory.createForClass(Route);
