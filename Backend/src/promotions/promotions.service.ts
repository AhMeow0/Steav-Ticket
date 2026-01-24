import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion } from './schema/promotion.schema';
import { CreatePromotionDto } from './dto/create-promotion.dto';
<<<<<<< HEAD
=======
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { error } from 'console';
>>>>>>> main

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: Model<Promotion>,
  ) {}

<<<<<<< HEAD
  create(dto: CreatePromotionDto) {
    const promotion = new this.promotionModel(dto);
    return promotion.save();
=======
  async create(dto: CreatePromotionDto): Promise<Promotion> {
    if(dto.startDate > dto.endDate){
      throw new NotFoundException('error');
    }
    return this.promotionModel.create(dto);
>>>>>>> main
  }

  findAll() {
    return this.promotionModel.find().exec();
  }

  findOne(id: string) {
    return this.promotionModel.findById(id).exec();
  }
<<<<<<< HEAD

  delete(id: string) {
    return this.promotionModel.findByIdAndDelete(id).exec();
=======
    return updated;
  }


  async delete(id: string): Promise<void> {
    const deleted = await this.promotionModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
>>>>>>> main
  }
}
