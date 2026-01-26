import { IsArray, IsString, ArrayMinSize, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class HoldSeatsDto {
  @IsString()
  tripId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  seatNos: string[];

  @Type(() => Number)
  @IsNumber()
  totalPrice: number;
}
