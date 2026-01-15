import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";

export type BusDocument = HydratedDocument<Bus>;

@Schema()
export class Bus{
    @Prop({required: true})
    busPlate: string;

    @Prop({required: true})
    busType: string;

    @Prop({required: true})
    capacity: number;
}
export const BusSchema = SchemaFactory.createForClass(Bus);