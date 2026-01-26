import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeatsService } from '../seats/seats.service';
import {
  Booking,
  BookingDocument,
  BookingStatus,
} from './schemas/booking.schema';
import { NotificationsService } from '../notification/noti.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly seatsService: SeatsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async holdAndCreateBooking(params: {
    tripId: string;
    seatNos: string[];
    userId: string;
    totalPrice: number;
  }) {
    const { tripId, seatNos, userId, totalPrice } = params;

    await this.seatsService.holdSeats({ tripId, seatNos, userId, minutes: 10 });

    const booking = await this.bookingModel.create({
      userId,
      tripId,
      seatNos,
      totalPrice,
      status: BookingStatus.PENDING,
    });

    return booking;
  }

  async markPaid(bookingId: string, userId: string) {
    const booking = await this.bookingModel.findOne({ _id: bookingId, userId });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Booking not in PENDING state');
    }

    await this.seatsService.markSeatsSold(booking.tripId, booking.seatNos, userId);

    booking.status = BookingStatus.PAID;
    await booking.save();
    await this.notificationsService.create({
      userId,
      message: `Your booking for trip ${booking.tripId} is confirmed. Seats: ${booking.seatNos.join(', ')}`,
      read: false,
    });
    return booking;
  }

  async getById(bookingId: string, userId: string) {
    const booking = await this.bookingModel
      .findOne({ _id: bookingId, userId })
      .lean();
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }
  async getAllBookingsAdmin() {
  return this.bookingModel.find().lean();   
}

}
