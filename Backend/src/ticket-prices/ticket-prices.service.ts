import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketPrice, TicketPriceDocument } from './schema/ticket-price.schema';
import { UpsertTicketPriceDto } from './dto/upsert-ticket-price.dto';

@Injectable()
export class TicketPricesService {
  constructor(
    @InjectModel(TicketPrice.name)
    private ticketPriceModel: Model<TicketPriceDocument>,
  ) {}

  findAll(): Promise<TicketPriceDocument[]> {
    return this.ticketPriceModel
      .find()
      .sort({ origin: 1, destination: 1 })
      .exec();
  }

  upsert(dto: UpsertTicketPriceDto): Promise<TicketPriceDocument> {
    return this.ticketPriceModel
      .findOneAndUpdate(
        { origin: dto.origin, destination: dto.destination },
        { $set: { price: Number(dto.price) } },
        { upsert: true, new: true, runValidators: true },
      )
      .exec();
  }

  async remove(id: string): Promise<TicketPriceDocument | null> {
    return this.ticketPriceModel.findByIdAndDelete(id).exec();
  }
}
