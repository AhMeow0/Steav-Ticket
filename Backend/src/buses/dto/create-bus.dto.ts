import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBusDto{

    @IsString()
    @IsNotEmpty()
    busPlate: string;

    @IsString()
    busType: string;

    @IsNumber()
    capacity: number;

    @IsNumber()
    routeid: number;
}