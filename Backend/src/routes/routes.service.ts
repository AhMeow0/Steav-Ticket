import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route, type RouteDocument } from './schema/route.schema';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route.name)
    private routeModel: Model<RouteDocument>,
  ) {}

  // 1. Create a new Route (Admin)
  async create(createRouteDto: CreateRouteDto): Promise<RouteDocument> {
    const routeNumber =
      createRouteDto.routeNumber?.trim() ||
      `R-${Date.now().toString().slice(-6)}`;

    const newRoute = new this.routeModel({
      ...createRouteDto,
      routeNumber,
    });
    return newRoute.save();
  }

  // 2. Get All Routes (For User to search)
  async findAll(): Promise<RouteDocument[]> {
    return this.routeModel.find().exec();
  }

  // 3. Find one specific route by ID (When booking)
  async findOne(id: string): Promise<RouteDocument | null> {
    return this.routeModel.findById(id).exec();
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
    return this.routeModel
      .findByIdAndUpdate(id, normalized, { new: true, runValidators: true })
      .exec();
  }
}
