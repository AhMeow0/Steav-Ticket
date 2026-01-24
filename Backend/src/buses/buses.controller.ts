import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BusService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { Bus } from './schema/bus.schema';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('buses')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createBusDto: CreateBusDto): Promise<Bus> {
    return this.busService.create(createBusDto);
  }

  @Get()
  findAll(): Promise<Bus[]> {
    return this.busService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Bus> {
    return this.busService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.delete(id);
  }
}
