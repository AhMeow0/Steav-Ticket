import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PromotionService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  create(@Body() dto: CreatePromotionDto) {
    return this.promotionService.create(dto);
  }

  @Get()
  findAll() {
    return this.promotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.promotionService.delete(id);
  }
}
