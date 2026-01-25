import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NotificationsService } from './noti.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notifService: NotificationsService) {}

  @Get(':userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notifService.getForUser(userId);
  }

  @Post('read')
  markAllRead(@Body('userId') userId: string) {
    return this.notifService.markAllRead(userId);
  }
}
