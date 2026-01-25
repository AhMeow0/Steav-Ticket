export class BookingResponseDto {
  id: string;
  from: string;
  to: string;
  company: string;
  journeyDate: string;
  returnDate?: string;
  seats: string[];
  seatCount: number;
  price: number;
  total: number;
  status: string;
  bookingDate: string;
}
