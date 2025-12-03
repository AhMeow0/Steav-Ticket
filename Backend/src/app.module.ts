import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bus-ticket'),
    TicketsModule,
    RoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
