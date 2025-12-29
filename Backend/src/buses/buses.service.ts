import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bus, RouteDocument } from './schema/bus.schema';
import { CreateBusDto } from './dto/create-bus.dto';

@Injectable()
export class BusService {
  constructor(
    @InjectModel(bus.name)
    private busModel: Model<RouteDocument>,
  ) {}

  async create(createBusDto: CreateBusDto): Promise<bus> {
    const newBus = new this.busModel(createBusDto);
    return newBus.save();
  }

  async findAll(): Promise<bus[]> {
    return this.busModel.find().exec();
  }

  async findOne(id: string): Promise<bus> {
    const foundBus = await this.busModel.findById(id).exec();

    if (!foundBus) {
      throw new NotFoundException(`Bus with id ${id} not found`);
    }

    return foundBus;
  }

  async delete(id: string): Promise<bus> {
    const deletedBus = await this.busModel.findByIdAndDelete(id).exec();

    if (!deletedBus) {
      throw new NotFoundException(`Bus with id ${id} not found`);
    }

    return deletedBus;
  }
}
