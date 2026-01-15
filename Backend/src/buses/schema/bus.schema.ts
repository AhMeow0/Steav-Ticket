import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RouteDocument = HydratedDocument<bus>;

@Schema()
export class bus{
    @Prop({required: true})
    busPlate: string;

    @Prop({required: true})
    busType: string;

    @Prop({default: 40})
    capacity: number;
}
export const BusSchema = SchemaFactory.createForClass(bus);