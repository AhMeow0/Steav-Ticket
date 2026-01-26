import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import {
  Booking,
  BookingDocument,
  BookingStatus,
} from '../booking/schemas/booking.schema';
import { User } from '../users/entities/user.entity';
import { RouteDocument } from '../routes/schema/route.schema';

type Period = 'daily' | 'weekly' | 'all';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel('Route')
    private readonly routeModel: Model<RouteDocument>,
  ) {}

// ===================== DASHBOARD =====================
async getDashboard(periodRaw?: string) {
  const period: Period =
    periodRaw === 'daily' || periodRaw === 'weekly' || periodRaw === 'all'
      ? (periodRaw as Period)
      : 'all';

  const filter: any = { status: BookingStatus.PAID };
  const now = new Date();

  // ---------- DETERMINE DATE RANGE ----------
  let days = 30; // default for "all"

  if (period === 'daily') {
    days = 1;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    filter.createdAt = { $gte: start };
  } else if (period === 'weekly') {
    days = 7;
    const start = new Date();
    start.setDate(now.getDate() - 6); // include today = 7 days
    start.setHours(0, 0, 0, 0);
    filter.createdAt = { $gte: start };
  }

  const bookings = await this.bookingModel.find(filter).lean();

  // ---------- BASIC STATS ----------
  const totalTrips = new Set(bookings.map(b => b.tripId)).size;
  const totalBookSeat = bookings.reduce((sum, b) => sum + b.seatNos.length, 0);
  const totalEarn = bookings.reduce((sum, b) => sum + (b.totalPrice ?? 0), 0);

  // ---------- BUILD DATE RANGE ----------
  const dateMap = new Map<string, { bookings: number; earn: number }>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dateMap.set(key, { bookings: 0, earn: 0 });
  }

  // ---------- INSERT BOOKING DATA ----------
  for (const b of bookings) {
    const d = new Date(b.createdAt);
    const key = d.toISOString().slice(0, 10);

    if (!dateMap.has(key)) continue;

    const row = dateMap.get(key)!;
    row.bookings += b.seatNos.length;
    row.earn += b.totalPrice ?? 0;
  }

  // ---------- CONVERT TO ARRAY ----------
  const series = Array.from(dateMap.entries()).map(([key, value]) => ({
    key,
    label: key,
    bookings: value.bookings,
    earn: value.earn,
  }));

  // ---------- STATUS BREAKDOWN ----------
  const statusBreakdown = [
    { status: BookingStatus.PAID, count: bookings.length },
    { status: BookingStatus.PENDING, count: 0 },
    { status: BookingStatus.CANCELLED, count: 0 },
  ];

  return {
    period,
    totalTrips,
    totalBookings: totalBookSeat,
    totalEarn,
    series,
    statusBreakdown,
  };
}
// ===================== LIST BOOKINGS =====================
// ===================== LIST BOOKINGS =====================
async listBookings(params: {
  destination?: string;
  date?: string;
  departureTime?: string;
  status?: string;
}) {
  const filter: any = {};

  // Filter by booking status
  if (params.status) {
    filter.status = params.status;
  }

  // Filter by date (YYYY-MM-DD)
  if (params.date) {
    const start = new Date(params.date);
    const end = new Date(params.date);
    end.setHours(23, 59, 59, 999);

    filter.createdAt = { $gte: start, $lte: end };
  }

  // Fetch all bookings first
  const bookings = await this.bookingModel.find(filter).lean();

  if (bookings.length === 0) return [];

  // -------- Fetch Route Info --------
  const tripIds = [...new Set(bookings.map(b => b.tripId))];

  const routes = await this.routeModel
    .find({ _id: { $in: tripIds } })
    .lean();

  const routeMap = new Map(routes.map(r => [String(r._id), r]));

  // -------- Apply route filters --------
  const filtered = bookings.filter(b => {
    const r = routeMap.get(String(b.tripId));
    if (!r) return false;

    if (params.destination && r.destination !== params.destination)
      return false;

    if (params.departureTime && r.departureTime !== params.departureTime)
      return false;

    return true;
  });

  // -------- Fetch Users --------
  const userIds = [...new Set(filtered.map(b => b.userId))];

  const users = await this.userModel
    .find({ _id: { $in: userIds } })
    .select({ name: 1, email: 1 })
    .lean();

  const userMap = new Map(users.map(u => [String(u._id), u]));

  // -------- Build Response --------
  return filtered.map(b => {
    const route = routeMap.get(String(b.tripId));
    const user = userMap.get(String(b.userId));

    return {
      _id: String(b._id),

      // Route fields
      origin: route?.origin ?? "",
      destination: route?.destination ?? "",
      departureTime: route?.departureTime ?? "",
      routeName: `${route?.origin ?? ""} → ${route?.destination ?? ""}`,

      // Booking fields
      seatNumbers: b.seatNos,
      price: b.totalPrice || 0,
      status: b.status,
      bookingDate: b.createdAt,

      passengerName: user?.name || user?.email || "-",
      user,
    };
  });
}


  // ===================== UPDATE BOOKING STATUS =====================
  async updateBookingStatus(id: string, status: BookingStatus) {
    const updated = await this.bookingModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .lean();

    if (!updated) throw new NotFoundException('Booking not found');

    return {
      _id: String(updated._id),
      status: updated.status,
    };
  }
}
