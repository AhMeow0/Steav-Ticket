import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { Ticket } from '../tickets/schemas/ticket.schema';
import { Route } from '../routes/schema/route.schema';
import { User } from '../users/entities/user.entity';
import { BookingStatus } from '../booking/schemas/booking.schema';

type Period = 'daily' | 'weekly' | 'all';

type RouteLean = {
  _id?: unknown;
  destination?: string;
  departureTime?: string;
};

type UserLean = {
  _id: unknown;
  name?: string;
  email?: string;
};

type TicketLean = {
  _id: unknown;
  userId?: unknown;
  seats?: string[];
  seatNumber?: string;
  price?: number;
  status?: string;
  createdAt?: Date | string;
  routeId?: RouteLean;
};

type BookingLean = {
  _id: unknown;
  userId?: unknown;
  seatNos?: string[];
  totalPrice?: number;
  status?: string;
  createdAt?: Date | string;
  routeId?: RouteLean;
};

type EarnAggRow = { _id: null; totalEarn: number };
type StatusAggRow = { _id: string; count: number };

function utcStartOfHour(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours()),
  );
}

function utcStartOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function periodRange(period: Period): { startIso?: string; endIso?: string } {
  if (period === 'all') return {};

  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const end = new Date(start);

  if (period === 'daily') end.setUTCDate(end.getUTCDate() + 1);
  else end.setUTCDate(end.getUTCDate() + 7);

  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel('Booking') private readonly bookingModel: Model<any>,
    @InjectModel(Route.name) private readonly routeModel: Model<Route>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /* ===================== DASHBOARD (for AdminController) ===================== */
  async getDashboard(periodRaw?: string) {
    const period: Period =
      periodRaw === 'daily' || periodRaw === 'weekly' || periodRaw === 'all'
        ? (periodRaw as Period)
        : 'all';

    const { startIso, endIso } = periodRange(period);

    // Here: we count/aggregate using Ticket model (as in your old code).
    // If you want dashboard based on Bookings too, we can extend later.
    const timeFilter =
      startIso && endIso
        ? { createdAt: { $gte: startIso, $lt: endIso } }
        : {};

    const [totalTrips, totalTickets, earnAgg, statusAgg] = await Promise.all([
      this.routeModel.countDocuments({}).exec(),
      this.ticketModel.countDocuments(timeFilter).exec(),
      this.ticketModel
        .aggregate<EarnAggRow>([
          { $match: timeFilter },
          { $group: { _id: null, totalEarn: { $sum: '$price' } } },
        ])
        .exec(),
      this.ticketModel
        .aggregate<StatusAggRow>([
          { $match: timeFilter },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ])
        .exec(),
    ]);

    const totalEarn = earnAgg.length ? earnAgg[0].totalEarn : 0;

    return {
      period,
      totalTrips,
      totalTickets,
      totalEarn,
      statusBreakdown: statusAgg,
    };
  }

  /* ===================== LIST BOOKINGS ===================== */
  async listBookings(params: {
    destination?: string;
    date?: string; // YYYY-MM-DD (from frontend)
    departureTime?: string; // exact departureTime if you want
    status?: string;
  }) {
    // 1) Build routeFilter FIRST (because destination/departureTime belong to Route)
    const routeFilter: Record<string, unknown> = {};

    if (params.destination) routeFilter.destination = params.destination;

    // If frontend sends a specific departureTime (full ISO string) use exact match:
    if (params.departureTime) routeFilter.departureTime = params.departureTime;

    // If frontend sends date=YYYY-MM-DD, match routes whose departureTime starts with that date
    if (params.date) routeFilter.departureTime = { $regex: `^${params.date}` };

    let routeIds: string[] | undefined = undefined;

    // Only query routes if we actually have a route-related filter
    if (Object.keys(routeFilter).length > 0) {
      const routes = await this.routeModel
        .find(routeFilter)
        .select({ _id: 1 })
        .lean<{ _id: unknown }[]>()
        .exec();

      routeIds = routes.map((r) => String(r._id));
      // If no routes match, return empty right away
      if (routeIds.length === 0) return [];
    }

    // 2) Build ticket/booking filters (status + routeId)
    const ticketFilter: Record<string, unknown> = {};
    const bookingFilter: Record<string, unknown> = {};

    if (params.status) {
      ticketFilter.status = params.status;
      bookingFilter.status = params.status;
    }

    if (routeIds) {
      ticketFilter.routeId = { $in: routeIds };
      bookingFilter.routeId = { $in: routeIds };
    }

    // 3) Fetch with populate(routeId) so destination/departureTime are available
    const [tickets, bookings] = await Promise.all([
      this.ticketModel
        .find(ticketFilter)
        .populate('routeId', 'destination departureTime')
        .lean<TicketLean[]>()
        .exec(),
      this.bookingModel
        .find(bookingFilter)
        .populate('routeId', 'destination departureTime')
        .lean<BookingLean[]>()
        .exec(),
    ]);

    // 4) Collect userIds
    const userIds = Array.from(
      new Set(
        [...tickets, ...bookings]
          .map((x: any) => x.userId)
          .filter((id) => id && isValidObjectId(id)),
      ),
    );

    const users = await this.userModel
      .find({ _id: { $in: userIds } })
      .select({ name: 1, email: 1 })
      .lean<UserLean[]>()
      .exec();

    const userById = new Map<string, UserLean>(users.map((u) => [String(u._id), u]));

    // 5) Normalize tickets
    const ticketResults = tickets.map((t: any) => {
      const route = t.routeId as RouteLean | undefined;
      const user = userById.get(String(t.userId));

      return {
        _id: String(t._id),
        type: 'TICKET',
        seatNumbers: t.seats ?? (t.seatNumber ? [t.seatNumber] : []),
        price: t.price ?? 0,
        status: t.status,
        destination: route?.destination ?? '-',
        dateOfJourney: route?.departureTime ?? '-',
        user: user
          ? { _id: String(user._id), name: user.name, email: user.email }
          : { _id: String(t.userId) },
      };
    });

    // 6) Normalize bookings
    const bookingResults = bookings.map((b: any) => {
      const route = b.routeId as RouteLean | undefined;
      const user = userById.get(String(b.userId));

      return {
        _id: String(b._id),
        type: 'BOOKING',
        seatNumbers: b.seatNos ?? [],
        price: b.totalPrice ?? 0,
        status: b.status,
        destination: route?.destination ?? '-',
        dateOfJourney: route?.departureTime ?? '-',
        user: user
          ? { _id: String(user._id), name: user.name, email: user.email }
          : { _id: String(b.userId) },
      };
    });

    // 7) Combine & sort newest first
    return [...ticketResults, ...bookingResults].sort((a, b) =>
      b._id.localeCompare(a._id),
    );
  }

  /* ===================== UPDATE BOOKING STATUS ===================== */
  async updateBookingStatus(id: string, status: BookingStatus) {
    // bookingModel is Model<any> so typings can be weird; force to single doc safely
    const updatedAny = await this.bookingModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .lean()
      .exec();

    const updated = Array.isArray(updatedAny) ? updatedAny[0] : updatedAny;

    if (!updated) throw new NotFoundException('Booking not found');

    return {
      _id: String(updated._id),
      status: updated.status,
    };
  }
}
