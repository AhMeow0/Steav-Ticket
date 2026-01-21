import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { RoutesModule } from './routes/routes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BusModule } from './buses/buses.module';
import { PromotionModule } from './promotions/promotions.modules';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost:27017/bus-ticket',
    ),
    TicketsModule,
    RoutesModule,
    UsersModule,
    AuthModule,
    BusModule,
    PromotionModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
