import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  routeNumber: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @Min(1) // Price cannot be 0 or negative
  price: number;

  @IsString()
  departureTime: string;
}