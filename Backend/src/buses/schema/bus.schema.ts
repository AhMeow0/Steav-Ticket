import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
import { Route } from "../../routes/schema/route.schema";

export type RouteDocument = HydratedDocument<bus>;

@Schema()
export class bus{
    @Prop({required: true})
    busPlate: string;

    @Prop({required: true})
    busType: string;

    @Prop({default: 40})
    capacity: number;

    @Prop({type: Types.ObjectId, ref: 'Route', required: true})
    routeId: number;
}
export const BusSchema = SchemaFactory.createForClass(bus);