import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        user: import("mongoose").Types.ObjectId;
        schedule: import("mongoose").Types.ObjectId;
        seat: import("mongoose").Types.ObjectId;
        status: "confirmed" | "cancelled";
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        user: import("mongoose").Types.ObjectId;
        schedule: import("mongoose").Types.ObjectId;
        seat: import("mongoose").Types.ObjectId;
        status: "confirmed" | "cancelled";
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    user: import("mongoose").Types.ObjectId;
    schedule: import("mongoose").Types.ObjectId;
    seat: import("mongoose").Types.ObjectId;
    status: "confirmed" | "cancelled";
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map