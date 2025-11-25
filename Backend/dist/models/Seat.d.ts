import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
}, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
}, import("mongoose").Document<unknown, {}, {
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
}, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<{
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        bus: import("mongoose").Types.ObjectId;
        seatNumber: string;
        isBooked: boolean;
        booking?: import("mongoose").Types.ObjectId | null;
    }, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<{
        bus: import("mongoose").Types.ObjectId;
        seatNumber: string;
        isBooked: boolean;
        booking?: import("mongoose").Types.ObjectId | null;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    bus: import("mongoose").Types.ObjectId;
    seatNumber: string;
    isBooked: boolean;
    booking?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Seat.d.ts.map