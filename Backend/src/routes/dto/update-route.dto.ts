import { IsOptional, IsString } from "class-validator";

export class UpdateRouteDto{
    @IsString()
    @IsOptional()
    origin?: string;

    @IsString()
    @IsOptional()
    destination?: string;
}