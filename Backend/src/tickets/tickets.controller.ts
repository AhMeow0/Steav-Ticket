import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthGuard } from '../auth/auth.guard'; 

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async protectedCreate(
    @Body() createTicketDto: CreateTicketDto,
    @Req() req,
  ) {
    // This line would CRASH if AuthGuard was off
    const userId = req.user.sub; 
    return this.ticketsService.create(createTicketDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('my-tickets')
  async findMyTickets(@Req() req) {
    const userId = req.user.sub;
    return this.ticketsService.findMyTickets(userId);
  }

  @Get()
  async findAll() {
    return this.ticketsService.findAll();
  }
}