import { Injectable } from '@nestjs/common';
import { SeatsService } from '../seats/seats.service';
import { BookingsService } from '../booking/bookings.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../tickets/schemas/ticket.schema';

function generateTicketCode() {
  // simple unique-ish code (you can replace with uuid)
  return `TCK-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

@Injectable()
export class CheckoutService {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly seatsService: SeatsService,
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async confirmPaidBooking(params: { bookingId: string; userId: string }) {
    const booking = await this.bookingsService.getById(
      params.bookingId,
      params.userId,
    );

    // Mark seats SOLD (must still be held by user and not expired)
    await this.seatsService.markSeatsSold(
      booking.tripId,
      booking.seatNos,
      params.userId,
    );

    // Create ticket
    const ticket = await this.ticketModel.create({
      bookingId: String(booking._id),
      userId: params.userId,
      ticketCode: generateTicketCode(),
    });

    return ticket;
  }
}
