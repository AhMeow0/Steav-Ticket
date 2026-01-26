import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seat, SeatDocument, SeatStatus } from './schemas/seat.schema';

@Injectable()
export class SeatsService {
  constructor(@InjectModel(Seat.name) private seatModel: Model<SeatDocument>) {}

  async upsertTripSeats(tripId: string, seatNos: string[]) {
    const uniqueSeatNos = Array.from(new Set(seatNos.filter(Boolean)));
    if (uniqueSeatNos.length === 0) return;

    try {
      await this.seatModel.bulkWrite(
        uniqueSeatNos.map((seatNo) => ({
          updateOne: {
            filter: { tripId, seatNo },
            update: {
              $setOnInsert: {
                tripId,
                seatNo,
                status: SeatStatus.AVAILABLE,
                holdByUserId: null,
                holdUntil: null,
              },
            },
            upsert: true,
          },
        })),
        { ordered: false },
      );
    } catch (e: any) {
      // Ignore duplicate key errors from races.
      const msg = typeof e?.message === 'string' ? e.message : '';
      if (!msg.includes('E11000')) throw e;
    }
  }

  async forceMarkSeatsSold(tripId: string, seatNos: string[]) {
    const uniqueSeatNos = Array.from(new Set(seatNos.filter(Boolean)));
    if (uniqueSeatNos.length === 0) return;

    await this.seatModel.updateMany(
      { tripId, seatNo: { $in: uniqueSeatNos } },
      {
        $set: {
          status: SeatStatus.SOLD,
          holdByUserId: null,
          holdUntil: null,
        },
      },
    );
  }

  async getSeatsByTrip(tripId: string) {
    return this.seatModel.find({ tripId }).sort({ seatNo: 1 }).lean();
  }

  async holdSeats(params: {
    tripId: string;
    seatNos: string[];
    userId: string;
    minutes?: number;
  }) {
    const { tripId, seatNos, userId } = params;
    const holdMinutes = params.minutes ?? 10;
    const holdUntil = new Date(Date.now() + holdMinutes * 60 * 1000);
    const now = new Date();

    // Ensure requested seats exist in DB (first-time trips / legacy data).
    await this.upsertTripSeats(tripId, seatNos);

    // Only hold seats that are AVAILABLE
    const res = await this.seatModel.updateMany(
      {
        tripId,
        seatNo: { $in: seatNos },
        $or: [
          { status: SeatStatus.AVAILABLE },
          {
            status: SeatStatus.HELD,
            holdByUserId: userId,
            holdUntil: { $gt: now },
          },
        ],
      },
      {
        $set: { status: SeatStatus.HELD, holdByUserId: userId, holdUntil },
      },
    );

    if (res.modifiedCount !== seatNos.length) {
      // rollback any partial holds you made in this request
      await this.seatModel.updateMany(
        {
          tripId,
          seatNo: { $in: seatNos },
          holdByUserId: userId,
          status: SeatStatus.HELD,
        },
        {
          $set: {
            status: SeatStatus.AVAILABLE,
            holdByUserId: null,
            holdUntil: null,
          },
        },
      );
      throw new BadRequestException('Some seats are not available.');
    }

    return { tripId, seatNos, holdUntil };
  }

  async releaseHeldSeats(tripId: string, seatNos: string[], userId: string) {
    await this.seatModel.updateMany(
      {
        tripId,
        seatNo: { $in: seatNos },
        status: SeatStatus.HELD,
        holdByUserId: userId,
      },
      {
        $set: {
          status: SeatStatus.AVAILABLE,
          holdByUserId: null,
          holdUntil: null,
        },
      },
    );
  }

  async markSeatsSold(tripId: string, seatNos: string[], userId: string) {
    const now = new Date();

    // Only allow if still held by this user and not expired
    const res = await this.seatModel.updateMany(
      {
        tripId,
        seatNo: { $in: seatNos },
        status: SeatStatus.HELD,
        holdByUserId: userId,
        holdUntil: { $gt: now },
      },
      {
        $set: {
          status: SeatStatus.SOLD,
          holdByUserId: null,
          holdUntil: null,
        },
      },
    );

    if (res.modifiedCount !== seatNos.length) {
      throw new BadRequestException('Seat hold expired or invalid.');
    }
  }

  async releaseExpiredHolds() {
    const now = new Date();
    return this.seatModel.updateMany(
      { status: SeatStatus.HELD, holdUntil: { $lte: now } },
      {
        $set: {
          status: SeatStatus.AVAILABLE,
          holdByUserId: null,
          holdUntil: null,
        },
      },
    );
  }
}
