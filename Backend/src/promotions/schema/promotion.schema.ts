import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Promotion extends Document {

  @Prop({ required: true, unique: true})
  code: string;

  @Prop({enum: ['PERCENT', 'FIXED'], required: true})
  discount_type: string;

  @Prop({ required: true })
  discount_value: number;

  @Prop({ required: true})
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop({ enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
