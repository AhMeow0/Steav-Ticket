import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PromotionService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './schema/promotion.schema';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  create(@Body() dto: CreatePromotionDto): Promise<Promotion>{
    return this.promotionService.create(dto);
  }

  @Get()
  findAll(): Promise<Promotion[]>{
    return this.promotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Promotion> {
    return this.promotionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id : string, @Body() update: UpdatePromotionDto): Promise<Promotion>{
    return this.promotionService.update(id, update);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.promotionService.delete(id);
  }
}
