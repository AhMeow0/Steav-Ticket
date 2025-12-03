import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from './schema/route.schema.js';
import { CreateRouteDto } from './dto/create-route.dto.js';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

  // 1. Create a new Route (Admin)
  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const newRoute = new this.routeModel(createRouteDto);
    return newRoute.save();
  }

  // 2. Get All Routes (For User to search)
  async findAll(): Promise<Route[]> {
    return this.routeModel.find().exec();
  }

  // 3. Find one specific route by ID (When booking)
  async findOne(id: string): Promise<Route | null> {
    return this.routeModel.findById(id).exec();
  }
}
