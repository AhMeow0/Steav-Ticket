import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SeatsService } from './seats.service';

@Injectable()
export class SeatsCron {
  private readonly logger = new Logger(SeatsCron.name);

  constructor(private readonly seatsService: SeatsService) {}

  @Cron('*/60 * * * * *') // every 60 seconds
  async handleReleaseExpired() {
    const res = await this.seatsService.releaseExpiredHolds();
    if (res.modifiedCount > 0) {
      this.logger.log(`Released ${res.modifiedCount} expired held seats`);
    }
  }
}
