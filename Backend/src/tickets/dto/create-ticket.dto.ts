import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateTicketDto {

  @IsString()
  @IsNotEmpty()
  scheduleId: string;

  @IsNumber()
  @Min(1)
  seatNumber: number;

  @IsOptional()
  @IsString()
  promoCode?: string;
}
