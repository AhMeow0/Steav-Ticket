import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route, RouteSchema } from './schema/route.schema';
import { Bus, BusSchema } from '../buses/schema/bus.schema';
import { TicketPricesModule } from '../ticket-prices/ticket-prices.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Route.name, schema: RouteSchema },
      { name: Bus.name, schema: BusSchema },
    ]),
    TicketPricesModule,
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService],
})
export class RoutesModule {}
