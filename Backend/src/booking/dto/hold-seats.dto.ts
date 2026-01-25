import { IsArray, IsString, ArrayMinSize } from 'class-validator';

export class HoldSeatsDto {
  @IsString()
  tripId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  seatNos: string[];
}
