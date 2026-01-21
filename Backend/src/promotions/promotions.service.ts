import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion } from './schema/promotion.schema';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: Model<Promotion>,
  ) {}

  create(dto: CreatePromotionDto) {
    const promotion = new this.promotionModel(dto);
    return promotion.save();
  }

  findAll() {
    return this.promotionModel.find().exec();
  }

  findOne(id: string) {
    return this.promotionModel.findById(id).exec();
  }

  delete(id: string) {
    return this.promotionModel.findByIdAndDelete(id).exec();
  }
}
