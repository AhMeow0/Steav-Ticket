import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CheckoutTicketsDto } from './dto/checkout-tickets.dto';

@Injectable()
export class TicketsService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  // Create a ticket
  async create(
    createTicketDto: CreateTicketDto,
    userId: string,
  ): Promise<Ticket> {
    const createdTicket = new this.ticketModel({
      ...createTicketDto,
      userId: userId,
    });
    return createdTicket.save();
  }

  async checkout(dto: CheckoutTicketsDto, userId: string): Promise<Ticket[]> {
    const shouldAutoConfirm = dto.paymentMethod !== 'cash';
    const status = shouldAutoConfirm ? 'CONFIRMED' : 'BOOKED';

    const docs = dto.seatNumbers.map((seatNumber) => ({
      userId,
      passengerName: dto.passengerName,
      seatNumber,
      price: dto.price,
      destination: dto.destination,
      departureTime: dto.departureTime,
      paymentMethod: dto.paymentMethod,
      status,
    }));

    return this.ticketModel.insertMany(docs, { ordered: true });
  }

  // Get tickets only for a specific user
  async findMyTickets(userId: string): Promise<Ticket[]> {
    return this.ticketModel.find({ userId: userId }).exec();
  }

  // Get all tickets
  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }
}
