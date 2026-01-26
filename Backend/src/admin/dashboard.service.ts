import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Booking,
  BookingDocument,
  BookingStatus,
} from '../booking/schemas/booking.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
  ) {}

  async getDashboard(period: string) {
    const filter: any = { status: BookingStatus.PAID };

    // Period filter
    const now = new Date();
    if (period === 'daily') {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      filter.createdAt = { $gte: start };
    } else if (period === 'weekly') {
      const last7 = new Date();
      last7.setDate(now.getDate() - 7);
      filter.createdAt = { $gte: last7 };
    }

    // Fetch PAID bookings
    const bookings = await this.bookingModel.find(filter).lean();

    // Total trips
    const totalTrips = new Set(bookings.map(b => b.tripId)).size;

    // Total booked seats
    const totalBookings = bookings.reduce((sum, b) => sum + b.seatNos.length, 0);

    // Total earnings
    const totalEarn = bookings.reduce((sum, b) => sum + (b.totalPrice ?? 0), 0);

    // Build series data
    const series = bookings.map(b => ({
      key: b._id.toString(),
      label: new Date(b.createdAt).toLocaleDateString(),
      bookings: b.seatNos.length,
      earn: b.totalPrice ?? 0,
    }));

    // Status breakdown
    const paidCount = bookings.length;

    const statusBreakdown = [
      { status: BookingStatus.PAID, count: paidCount },
      { status: BookingStatus.PENDING, count: 0 },
      { status: BookingStatus.CANCELLED, count: 0 },
    ];

    return {
      period,
      totalTrips,
      totalBookings,
      totalEarn,
      series,
      statusBreakdown,
    };
  }
}
