import { IsEnum } from 'class-validator';
import { BookingStatus } from '../../booking/schemas/booking.schema';

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
