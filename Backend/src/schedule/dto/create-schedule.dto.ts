import { IsDateString, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsMongoId()
  routeId: string;

  @IsMongoId()
  busId: string;

  @IsOptional()
  @IsMongoId()
  promotionId?: string;

  @IsDateString()
  departureDate: string;

  @IsString()
  departureTime: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  status?: string;
}
