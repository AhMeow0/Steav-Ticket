import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route, type RouteDocument } from './schema/route.schema';
import { Bus, type BusDocument } from '../buses/schema/bus.schema';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import {
  TicketPrice,
  type TicketPriceDocument,
} from '../ticket-prices/schema/ticket-price.schema';

export type BulkPriceUpdateResult = {
  matched: number;
  modified: number;
  origin: string;
  destination: string;
  price: number;
};

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route.name)
    private routeModel: Model<RouteDocument>,

    @InjectModel(Bus.name)
    private busModel: Model<BusDocument>,

    @InjectModel(TicketPrice.name)
    private ticketPriceModel: Model<TicketPriceDocument>,
  ) {}

  // 1. Create a new Route (Admin)
  async create(createRouteDto: CreateRouteDto): Promise<RouteDocument> {
    const bus = createRouteDto.busId
      ? await this.busModel.findById(createRouteDto.busId).exec()
      : null;

    const routeNumber = bus?.busPlate
      ? String(bus.busPlate)
      : createRouteDto.routeNumber?.trim() ||
        `R-${Date.now().toString().slice(-6)}`;

    const company = bus?.companyName
      ? String(bus.companyName)
      : createRouteDto.company;

    const totalSeats =
      createRouteDto.totalSeats ??
      (bus?.capacity ? Number(bus.capacity) : undefined);

    let price: number;
    if (createRouteDto.price !== undefined) {
      price = Number(createRouteDto.price);
    } else {
      // First: inherit from manually configured base ticket price.
      const base = await this.ticketPriceModel
        .findOne({
          origin: createRouteDto.origin,
          destination: createRouteDto.destination,
        })
        .exec();
      if (base && Number(base.price) > 0) {
        price = Number(base.price);
      } else {
        // Fallback: inherit from any existing route that already has a price.
        const existing = await this.routeModel
          .findOne({
            origin: createRouteDto.origin,
            destination: createRouteDto.destination,
            price: { $gt: 0 },
          })
          .sort({ _id: -1 })
          .exec();
        price = existing?.price ? Number(existing.price) : 0;
      }
    }

    const newRoute = new this.routeModel({
      ...createRouteDto,
      company,
      routeNumber,
      price,
      totalSeats,
    });
    return newRoute.save();
  }

  async bulkUpdatePrice(dto: {
    origin: string;
    destination: string;
    price: number;
  }): Promise<BulkPriceUpdateResult> {
    const normalizedOrigin = String(dto.origin);
    const normalizedDestination = String(dto.destination);
    const normalizedPrice = Number(dto.price);

    const result = await this.routeModel.updateMany(
      { origin: normalizedOrigin, destination: normalizedDestination },
      { $set: { price: normalizedPrice } },
    );

    // Persist a base price so future schedules inherit it even if no routes exist yet.
    await this.ticketPriceModel
      .findOneAndUpdate(
        { origin: normalizedOrigin, destination: normalizedDestination },
        { $set: { price: normalizedPrice } },
        { upsert: true, new: true, runValidators: true },
      )
      .exec();

    return {
      matched: result.matchedCount ?? 0,
      modified: result.modifiedCount ?? 0,
      origin: normalizedOrigin,
      destination: normalizedDestination,
      price: normalizedPrice,
    };
  }

  // 2. Get All Routes (For User to search)
  async findAll(): Promise<RouteDocument[]> {
    return this.routeModel
      .find()
      .populate({
        path: 'busId',
        select: 'companyName busPlate busType capacity',
      })
      .exec();
  }

  // 3. Find one specific route by ID (When booking)
  async findOne(id: string): Promise<RouteDocument | null> {
    return this.routeModel
      .findById(id)
      .populate({
        path: 'busId',
        select: 'companyName busPlate busType capacity',
      })
      .exec();
  }

  // 4. Delete a Route (Admin)
  async remove(id: string): Promise<RouteDocument | null> {
    return this.routeModel.findByIdAndDelete(id).exec();
  }

  // 5. Update a Route/Schedule (Admin)
  async update(id: string, dto: UpdateRouteDto): Promise<RouteDocument | null> {
    // If routeNumber is passed as empty string, ignore it.
    const normalized: UpdateRouteDto = { ...dto };
    if (
      typeof normalized.routeNumber === 'string' &&
      !normalized.routeNumber.trim()
    ) {
      normalized.routeNumber = undefined;
    }

    if (normalized.busId) {
      const bus = await this.busModel.findById(normalized.busId).exec();
      if (bus?.companyName) {
        normalized.company = String(bus.companyName);
      }
      if (bus?.busPlate) {
        normalized.routeNumber = String(bus.busPlate);
      }
      if (normalized.totalSeats === undefined && bus?.capacity !== undefined) {
        normalized.totalSeats = Number(bus.capacity);
      }
    }

    return this.routeModel
      .findByIdAndUpdate(id, normalized, { new: true, runValidators: true })
      .populate({
        path: 'busId',
        select: 'companyName busPlate busType capacity',
      })
      .exec();
  }
}
