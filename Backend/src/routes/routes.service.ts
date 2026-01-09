import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from './schema/route.schema.js';
import { CreateRouteDto } from './dto/create-route.dto.js';
import { UpdateRouteDto } from './dto/update-route.dto.js';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<Route>) {}

  // 1. Create a new Route (Admin)
  async create(dto: CreateRouteDto): Promise<Route> {
    const exists = await this.routeModel.exists({
      origin: dto.origin,
      destination: dto.destination,
    });
    if(exists){
      throw new Error('Route already exists');
    }
    const newRoute = new this.routeModel(dto);
    return newRoute.save();
  }

  // 2. Get All Routes (For User to search)
  async findAll(): Promise<Route[]> {
    return this.routeModel.find().lean();
  }

  // 3. Find one specific route by ID (When booking)
  async findOne(id: string): Promise<Route> {
    const route = await this.routeModel.findById(id).lean();
    if(!route){
      throw new Error('Route not found');
    }
    return route;
  }
  async update(id : string, dto:UpdateRouteDto): Promise<Route> {
    const update = await this.routeModel.findByIdAndUpdate(
      id,
      dto,
      {new: true}
    );
    if(!update){
      throw new Error('Route not found');
    }
    return update;
  } 
  async remove(id: string): Promise<void>{

    const deleted = await this.routeModel.findByIdAndDelete(id);

    if(!deleted){
      throw new Error('Route not found');
    }
  }
}
