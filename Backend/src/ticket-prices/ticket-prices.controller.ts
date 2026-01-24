import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { TicketPricesService } from './ticket-prices.service';
import { UpsertTicketPriceDto } from './dto/upsert-ticket-price.dto';

@Controller('ticket-prices')
export class TicketPricesController {
  constructor(private readonly ticketPricesService: TicketPricesService) {}

  @Get()
  findAll() {
    return this.ticketPricesService.findAll();
  }

  @Put()
  upsert(@Body() dto: UpsertTicketPriceDto) {
    return this.ticketPricesService.upsert(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketPricesService.remove(id);
  }
}
