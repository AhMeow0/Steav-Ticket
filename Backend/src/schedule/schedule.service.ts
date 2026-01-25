import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule, type ScheduleDocument } from './schema/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(dto: CreateScheduleDto): Promise<ScheduleDocument> {
    const schedule = new this.scheduleModel({
      ...dto,
      departureDate: new Date(dto.departureDate),
    });
    return schedule.save();
  }

  async findAll(): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find().exec();
  }

  async findOne(id: string): Promise<ScheduleDocument | null> {
    return this.scheduleModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateScheduleDto): Promise<ScheduleDocument | null> {
    const normalized: Record<string, unknown> = { ...dto };
    if (typeof dto.departureDate === 'string') {
      normalized.departureDate = new Date(dto.departureDate);
    }
    return this.scheduleModel
      .findByIdAndUpdate(id, normalized, { new: true, runValidators: true })
      .exec();
  }

  async remove(id: string): Promise<ScheduleDocument | null> {
    return this.scheduleModel.findByIdAndDelete(id).exec();
  }
}
