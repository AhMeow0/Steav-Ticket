import { IsMongoId } from 'class-validator';

export class MockPaymentDto {
  @IsMongoId()
  bookingId: string;
}
