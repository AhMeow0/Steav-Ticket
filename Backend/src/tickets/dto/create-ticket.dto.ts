import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  passengerName: string;

  @IsNumber()
  seatNumber: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  destination: string;

  @IsString()
  departureTime: string;
}