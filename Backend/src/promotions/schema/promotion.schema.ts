import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Promotion extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  active: Date;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  promotionPercentage: number;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
