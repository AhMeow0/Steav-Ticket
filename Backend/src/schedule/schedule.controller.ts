import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';


@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

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

    @Put(':id')
    update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
        return this.scheduleService.update(id, updateScheduleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.scheduleService.remove(id);
    }
}