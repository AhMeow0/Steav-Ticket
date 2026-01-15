import {
  Body,
  Controller,
  UseGuards,
  Post,
  Put,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Roles } from '../auth/roles.decorator';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }
  @Get()
  async findAll() {
    return this.scheduleService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateScheduleDto) {
    return this.scheduleService.update(id, UpdateScheduleDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
