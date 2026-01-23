import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import {schedule} from "./schema/schedule.schema"
import { InjectModel } from "@nestjs/mongoose";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService{
   constructor(@InjectModel(schedule.name) private scheduleModel: Model<schedule>) {}

   async create(dto: CreateScheduleDto): Promise<schedule>{
      const newSchedule = new this.scheduleModel()
      return newSchedule.save();
   }

   async findAll(): Promise<schedule[]>{
      return this.scheduleModel.find().lean();
   }

   async findOne(id: string): Promise<schedule>{
      const schedule = await this.scheduleModel.findById(id).lean();
      if(!schedule){
         throw new Error ('Schedule is not found');
      }
      return schedule;
   }

   async update(id:string, dto: UpdateScheduleDto): Promise<schedule>{
      const update = await this.scheduleModel.findByIdAndUpdate(
         id, dto, {new: true}
      );
      if(!update){
         throw new Error('schema is not found');
      }
      return update;
   }

   async remove(id: string): Promise<void>{
      const deleted = await this.scheduleModel.findByIdAndDelete(id)
      if(!deleted){
         throw new Error('schedule is not found');
      }
   }
   
}