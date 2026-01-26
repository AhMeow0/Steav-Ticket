
import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async dashboard(@Query('period') period?: string) {
    return this.adminService.getDashboard(period);
  }

  @Get('bookings')
  async listBookings(
    @Query('destination') destination?: string,
    @Query('date') date?: string,
    @Query('departureTime') departureTime?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.listBookings({
      destination,
      date,
      departureTime,
      status,
    });
  }

  @Patch('bookings/:id')
  async updateBookingStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.adminService.updateBookingStatus(id, dto.status);
  }
}
