import { IsIn, IsString } from 'class-validator';

export const BOOKING_STATUSES = ['BOOKED', 'CONFIRMED', 'CANCELLED'] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export class UpdateBookingStatusDto {
  @IsString()
  @IsIn(BOOKING_STATUSES)
  status: BookingStatus;
}
