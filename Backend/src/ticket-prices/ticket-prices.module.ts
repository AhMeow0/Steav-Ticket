import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketPricesController } from './ticket-prices.controller';
import { TicketPricesService } from './ticket-prices.service';
import { TicketPrice, TicketPriceSchema } from './schema/ticket-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TicketPrice.name, schema: TicketPriceSchema },
    ]),
  ],
  controllers: [TicketPricesController],
  providers: [TicketPricesService],
  exports: [MongooseModule, TicketPricesService],
})
export class TicketPricesModule {}
