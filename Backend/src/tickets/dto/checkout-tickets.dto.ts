import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export const PAYMENT_METHODS = ['cash', 'card', 'aba'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export class CheckoutTicketsDto {
  @IsString()
  @IsNotEmpty()
  passengerName: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  seatNumbers: number[];

  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  departureTime: string;

  @IsIn(PAYMENT_METHODS)
  paymentMethod: PaymentMethod;
}
