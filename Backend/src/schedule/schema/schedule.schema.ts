import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Route } from "../../routes/schema/route.schema";
import { bus } from "../../buses/schema/bus.schema"
import { Promotion } from "../../promotions/schema/promotion.schema";

@Schema()
export class schedule{
    @Prop({type: Types.ObjectId, ref: 'Route', required: true})
    routeId: string

    @Prop({type: Types.ObjectId, ref: 'bus', required: true})
    busId: string

    @Prop({type: Types.ObjectId, ref: 'Promotion', required: true})
    promotionId: string

    @Prop({require: true})
    departureDate: Date

    @Prop({required: true})
    departureTime: string

    @Prop({required: true})
    price: number

    @Prop({default: 'ACTIVE'})
    status: string
}
export const scheduleSchema = SchemaFactory.createForClass(schedule);