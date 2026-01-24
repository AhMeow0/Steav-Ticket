import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRouteDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  routeNumber?: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @Min(1) // Price cannot be 0 or negative
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  departureTime: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalSeats?: number;
}
