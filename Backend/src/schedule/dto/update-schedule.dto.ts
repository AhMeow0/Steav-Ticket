import { IsDate, IsNumber, IsString } from "class-validator";

export class UpdateScheduleDto{
    @IsString()
    routeId: string

    @IsString()
    busId: string

    @IsString()
    promotionId: string

    @IsDate()
    departureDate: Date

    @IsString()
    departureTime: string

    @IsNumber()
    price: number

    @IsString()
    status: string

}