// Lean types for admin aggregation (for listBookings)
type TicketLean = {
  _id: string;
  userId: string;
  passengerName?: string;
  seats?: string[];
  seatNumber?: string;
  price?: number;
  status: string;
  createdAt?: string | Date;
};
type BookingLean = {
  _id: string;
  userId: string;
  tripId?: string;
  seatNos?: string[];
  totalPrice?: number;
  status: string;
  createdAt?: string | Date;
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Ticket } from '../tickets/schemas/ticket.schema';
import { BookingStatus } from '../booking/schemas/booking.schema';
import { Route } from '../routes/schema/route.schema';
import { User } from '../users/entities/user.entity';
// import { BookingStatus } from './dto/update-booking-status.dto';

type Period = 'daily' | 'weekly' | 'all';


type UserLean = {
  _id: unknown;
  name?: string;
  email?: string;
};

type EarnAggRow = { _id: null; totalEarn: number };

type SeriesRow = {
  _id: string;
  bookings: number;
  earn: number;
};

type DashboardSeriesPoint = {
  key: string;
  label: string;
  bookings: number;
  earn: number;
};

type StatusAggRow = {
  _id: string;
  count: number;
};

function utcStartOfHour(d: Date): Date {
  return new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
    ),
  );
}

function utcStartOfDay(d: Date): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}

function seriesRange(period: Period): {
  startIso: string;
  endIso: string;
  bucket: 'hour' | 'day';
  points: number;
} {
  const now = new Date();

  if (period === 'daily') {
    const end = utcStartOfHour(now);
    const start = new Date(end);
    start.setUTCHours(start.getUTCHours() - 23);
    return {
      startIso: start.toISOString(),
      endIso: new Date(end.getTime() + 60 * 60 * 1000).toISOString(),
      bucket: 'hour',
      points: 24,
    };
  }

  const endDay = utcStartOfDay(now);
  const end = new Date(endDay);
  end.setUTCDate(end.getUTCDate() + 1); // inclusive end boundary (tomorrow 00:00Z)

  const points = period === 'weekly' ? 7 : 30;
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (points - 1));

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    bucket: 'day',
    points,
  };
}

function buildSeriesKeys(period: Period): { key: string; label: string }[] {
  const { startIso, bucket, points } = seriesRange(period);
  const start = new Date(startIso);
  const keys: { key: string; label: string }[] = [];

  for (let i = 0; i < points; i += 1) {
    const d = new Date(start);
    if (bucket === 'hour') {
      d.setUTCHours(d.getUTCHours() + i);
      const key = d.toISOString().slice(0, 13); // YYYY-MM-DDTHH
      const label = `${d.toISOString().slice(11, 13)}:00`;
      keys.push({ key, label });
    } else {
      d.setUTCDate(d.getUTCDate() + i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const label = key;
      keys.push({ key, label });
    }
  }

  return keys;
}

function periodRange(period: Period): { startIso?: string; endIso?: string } {
  if (period === 'all') return {};

  const now = new Date();
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const end = new Date(start);

  if (period === 'daily') {
    end.setUTCDate(end.getUTCDate() + 1);
  } else {
    end.setUTCDate(end.getUTCDate() + 7);
  }

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

  async getDashboard(periodRaw?: string) {
    const period: Period =
      periodRaw === 'daily' || periodRaw === 'weekly' || periodRaw === 'all'
        ? (periodRaw as Period)
        : 'all';

    const { startIso, endIso } = periodRange(period);

    const departureTimeFilter =
      startIso && endIso
        ? { departureTime: { $gte: startIso, $lt: endIso } }
        : {};

    // Get all tickets in the period
    const [totalTrips, tickets, earnAgg, statusAgg] = await Promise.all([
      this.routeModel.countDocuments(departureTimeFilter).exec(),
      this.ticketModel.find(departureTimeFilter).lean().exec(),
      this.ticketModel
        .aggregate<EarnAggRow>([
          { $match: departureTimeFilter },
          { $group: { _id: null, totalEarn: { $sum: '$price' } } },
        ])
        .exec(),
      this.ticketModel
        .aggregate<StatusAggRow>([
          { $match: departureTimeFilter },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ])
        .exec(),
    ]);

    // Sum all seats from tickets (seats array or seatNumber fallback)
    let totalBookSeat = 0;
    for (const t of tickets) {
      if (Array.isArray(t.seats)) {
        totalBookSeat += t.seats.length;
     } else if (Array.isArray((t as any).seats) && (t as any).seats.length > 0) {
      const seats = (t as any).seats as string[];
      // use seats here
    }

    }

    const totalEarn = earnAgg.length > 0 ? earnAgg[0].totalEarn : 0;

    const {
      startIso: seriesStartIso,
      endIso: seriesEndIso,
      bucket,
    } = seriesRange(period);
    const seriesKeys = buildSeriesKeys(period);

    const seriesMatch = {
      $and: [
        { departureTime: { $gte: seriesStartIso, $lt: seriesEndIso } },
        { departureTime: { $regex: '^\\d{4}-\\d{2}-\\d{2}T' } },
      ],
    };

    const keyExpr =
      bucket === 'hour'
        ? { $substrBytes: ['$departureTime', 0, 13] }
        : { $substrBytes: ['$departureTime', 0, 10] };

    const seriesAgg = await this.ticketModel
      .aggregate<SeriesRow>([
        { $match: seriesMatch },
        {
          $group: {
            _id: keyExpr,
            bookings: { $sum: 1 },
            earn: { $sum: '$price' },
          },
        },
      ])
      .exec();

    const byKey = new Map<string, SeriesRow>();
    for (const row of seriesAgg) byKey.set(row._id, row);

    const series: DashboardSeriesPoint[] = seriesKeys.map(({ key, label }) => {
      const row = byKey.get(key);
      return {
        key,
        label,
        bookings: row?.bookings ?? 0,
        earn: row?.earn ?? 0,
      };
    });

    const allowed = new Set(['BOOKED', 'CONFIRMED', 'CANCELLED']);
    const statusCounts = new Map<string, number>([
      ['BOOKED', 0],
      ['CONFIRMED', 0],
      ['CANCELLED', 0],
      ['OTHER', 0],
    ]);
    for (const row of statusAgg) {
      const key = allowed.has(row._id) ? row._id : 'OTHER';
      statusCounts.set(key, (statusCounts.get(key) ?? 0) + row.count);
    }

    const statusBreakdown = Array.from(statusCounts.entries())
      .filter(([, count]) => count > 0)
      .map(([status, count]) => ({ status, count }));

    return {
      period,
      totalTrips,
      totalBookSeat,
      totalEarn,
      series,
      statusBreakdown,
    };
  }

  async listBookings(params: {
    destination?: string;
    date?: string;
    departureTime?: string;
    status?: string;
  }) {
    // Build filters for both collections
    const ticketFilter: Record<string, unknown> = {};
    const bookingFilter: Record<string, unknown> = {};
    if (params.destination) ticketFilter.destination = params.destination;
    if (params.status) ticketFilter.status = params.status;
    if (params.departureTime) ticketFilter.departureTime = params.departureTime;
    if (params.date) ticketFilter.departureTime = { $regex: `^${params.date}` };
    if (params.status) bookingFilter.status = params.status;
    if (params.date) bookingFilter.createdAt = { $regex: `^${params.date}` };

    // Fetch tickets (confirmed bookings)
    const tickets = await this.ticketModel.find(ticketFilter).lean<TicketLean[]>().exec();
    // Fetch bookings (pending/unpaid bookings)
    const bookings = await this.bookingModel.find(bookingFilter).lean<BookingLean[]>().exec();

    // Collect all userIds
    const userIds = Array.from(new Set([
      ...tickets.map((t) => t.userId),
      ...bookings.map((b) => b.userId),
    ].filter((id) => id && id !== 'undefined' && isValidObjectId(id))));

    const users = await this.userModel
      .find({ _id: { $in: userIds } })
      .select({ name: 1, email: 1 })
      .lean<UserLean[]>()
      .exec();
    const userById = new Map<string, UserLean>(users.map((u) => [String(u._id), u]));

    // Normalize tickets
    const ticketResults = tickets.map((t) => {
      const user = userById.get(String(t.userId));
      return {
        _id: String(t._id),
        type: 'TICKET',
        passengerName: t.passengerName || '-',
        seatNumbers: t.seats || (t.seatNumber ? [t.seatNumber] : []),
        price: t.price ?? 0,
        status: t.status,
        bookingDate: t.createdAt ? new Date(t.createdAt).toISOString() : '-',
        user: user
          ? { _id: String(user._id), name: user.name, email: user.email }
          : { _id: String(t.userId) },
      };
    });

    // Normalize bookings (only those not PAID, to avoid duplication)
    const bookingResults = bookings
      .filter((b: BookingLean) => b.status !== 'CANCELLED')
      .map((b: BookingLean) => {
        const user = userById.get(String(b.userId));
        return {
          _id: String(b._id),
          type: 'BOOKING',
          passengerName: user?.name || user?.email || '-',
          seatNumbers: b.seatNos || [],
          price: b.totalPrice ?? 0,
          status: b.status === 'PAID' ? 'CONFIRMED' : b.status,
          bookingDate: b.createdAt ? new Date(b.createdAt).toISOString() : '-',
          user: user
            ? { _id: String(user._id), name: user.name, email: user.email }
            : { _id: String(b.userId) },
        };
      });

    // Combine and sort by creation (descending)
    const allResults = [...ticketResults, ...bookingResults].sort((a, b) => {
      // Use bookingDate for sorting if available, else fallback to _id
      const dateA = a.bookingDate || a._id;
      const dateB = b.bookingDate || b._id;
      return dateB.localeCompare(dateA);
    });
    return allResults;
  }

  async updateBookingStatus(id: string, status: BookingStatus) {
    const updated = await this.ticketModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .lean<TicketLean | null>()
      .exec();

    if (!updated) throw new NotFoundException('Booking not found');

    return {
      _id: String(updated._id),
      status: updated.status,
    };
  }
}
