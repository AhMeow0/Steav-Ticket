import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsInt,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRouteDto {
  @IsOptional()
  @IsMongoId()
  busId?: string;

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsString()
  @IsNotEmpty()
  departureTime: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalSeats?: number;
}
