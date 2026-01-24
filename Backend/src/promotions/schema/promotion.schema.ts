import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Promotion extends Document {

  @Prop({ required: true, unique: true})
  code: string;

  @Prop({enum: ['PERCENT', 'FIXED'], required: true})
  discountType: string;

  @Prop({ required: true })
  discountValue: number;

  @Prop({ required: true})
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE';
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
