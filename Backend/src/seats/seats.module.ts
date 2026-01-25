import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './schemas/seat.schema';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { SeatsCron } from './seats.cron';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
  ],
  providers: [SeatsService, SeatsCron],
  controllers: [SeatsController],
  exports: [SeatsService],
})
export class SeatsModule {}
