import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion } from './schema/promotion.schema';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: Model<Promotion>
  ) {}

  async create(dto: CreatePromotionDto): Promise<Promotion> {
    return this.promotionModel.create(dto);
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionModel.find().exec();
  }

  async findOne(id: string): Promise<Promotion> {
    const promotion = await this.promotionModel.findById(id).exec();
    if (!promotion) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
    return promotion;
  }
  async update(id: string, dto: UpdatePromotionDto) {
  const updated = await this.promotionModel
    .findByIdAndUpdate(
      id,
      {
        code: dto.code,
        discountType: dto.discountType,
        discountValue: dto.discountValue,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
      { new: true, runValidators: true }
    )
    .exec();

  if (!updated) {
    throw new NotFoundException(`Promotion with id ${id} not found`);
  }

    return updated;
  }


  async delete(id: string): Promise<void> {
    const deleted = await this.promotionModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Promotion with id ${id} not found`);
    }
  }
}
