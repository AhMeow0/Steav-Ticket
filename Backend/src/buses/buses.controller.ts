import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BusService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { bus } from './schema/bus.schema';

@Controller('buses')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post()
  create(@Body() createBusDto: CreateBusDto): Promise<bus> {
    return this.busService.create(createBusDto);
  }

  @Get()
  findAll(): Promise<bus[]> {
    return this.busService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<bus> {
    return this.busService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.delete(id);
  }
}
