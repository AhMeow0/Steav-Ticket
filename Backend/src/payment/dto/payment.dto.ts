import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  scheduleId: string;

  @IsArray()
  seats: string[];
}
