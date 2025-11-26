import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

@Module({
  imports: [],
  controllers: [AppController],
  // providers: [AppService],
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async () => {
        await client.connect();
        return client.db('bus-ticket');
      },
    },
  ],
  exports: ['DATABASE'],
})
export class AppModule {}
