import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service.js';
import { CreateRouteDto } from './dto/create-route.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
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
}
