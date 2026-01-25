import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { CheckoutTicketsDto } from './dto/checkout-tickets.dto';

type JwtPayload = {
  sub: string;
  email: string;
  role?: string;
};

type AuthenticatedRequest = ExpressRequest & { user: JwtPayload };
type MaybeAuthenticatedRequest = ExpressRequest & { user?: JwtPayload };

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Post('checkout')
  async checkout(
    @Body() dto: CheckoutTicketsDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.ticketsService.checkout(dto, userId);
  }

  //@UseGuards(AuthGuard)
  @Post()
  async protectedCreate(
    @Body() createTicketDto: CreateTicketDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    return this.ticketsService.create(createTicketDto, userId);
  }

  //@UseGuards(AuthGuard)
  @Get('my-tickets')
  @UseGuards(AuthGuard)
  async findMyTickets(@Req() req: MaybeAuthenticatedRequest) {
    const userId = req.user?.sub;
    if (!userId) throw new UnauthorizedException('Missing user');
    return this.ticketsService.findMyTickets(userId);
  }

  @Get()
  async findAll() {
    return this.ticketsService.findAll();
  }
}
