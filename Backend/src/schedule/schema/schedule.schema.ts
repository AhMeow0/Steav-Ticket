import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
    @Prop({ type: Types.ObjectId, ref: 'Route', required: true })
    routeId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Bus', required: true })
    busId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Promotion', required: false })
    promotionId?: Types.ObjectId;

    @Prop({ required: true })
    departureDate: Date;

    @Prop({ required: true })
    departureTime: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: 'ACTIVE' })
    status: string;
}
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);