import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateBusDto{

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    busPlate: string;

    @IsString()
    busType: string;

    @Type(() => Number)
    @IsNumber()
    capacity: number;
}