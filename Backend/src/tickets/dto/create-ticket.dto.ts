export class CreateTicketDto {
  passengerName: string;
  seatNumber: number;
  price: number;
  destination: string;
  departureTime: string;
  status?: string;
}
