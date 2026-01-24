import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Route } from "../../routes/schema/route.schema";
import { Bus } from "../../buses/schema/bus.schema"
import { Promotion } from "../../promotions/schema/promotion.schema";

@Schema()
export class schedule{
    @Prop({type: Types.ObjectId, ref: 'Route', required: true})
    routeId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Bus', required: true})
    busId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Promotion', required: true})
    promotionId: Types.ObjectId;

    @Prop({require: true})
    departureDate: Date

    @Prop({required: true})
    departureTime: String

    @Prop({required: true})
    price: number

    @Prop({ enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
    status: 'ACTIVE' | 'INACTIVE';
}
export const scheduleSchema = SchemaFactory.createForClass(schedule);