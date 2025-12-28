import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async protectedCreate(
    @Body() createTicketDto: CreateTicketDto,
    @Req() req,
  ) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  async findAll() {
    return this.ticketsService.findAll();
  }
}
