import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
// import { AuthGuard } from '../auth/auth.guard.js';
// import { Roles } from '../auth/roles.decorator.js';
// import { RolesGuard } from '../auth/roles.guard.js';
import { UpdateRouteDto } from './dto/update-route.dto';
import { BulkUpdatePriceDto } from './dto/bulk-update-price.dto';
import type { BulkPriceUpdateResult } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  //@UseGuards(AuthGuard, RolesGuard)
  //@Roles('admin')
  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  async findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  //@UseGuards(AuthGuard, RolesGuard)
  //@Roles('admin')
  @Patch('bulk/price')
  bulkUpdatePrice(
    @Body() dto: BulkUpdatePriceDto,
  ): Promise<BulkPriceUpdateResult> {
    const bulkUpdatePrice = this.routesService.bulkUpdatePrice as (
      body: BulkUpdatePriceDto,
    ) => Promise<BulkPriceUpdateResult>;
    return bulkUpdatePrice(dto);
  }

  //@UseGuards(AuthGuard, RolesGuard)
  //@Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(id, updateRouteDto);
  }

  //@UseGuards(AuthGuard, RolesGuard)
  //@Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(id);
  }
}
