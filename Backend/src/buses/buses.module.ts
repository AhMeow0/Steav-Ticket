import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusController } from './buses.controller';
import { BusService } from './buses.service';
import { Bus, BusSchema } from './schema/bus.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }])],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
