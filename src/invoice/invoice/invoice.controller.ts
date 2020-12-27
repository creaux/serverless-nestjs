import { Controller, Get, Render } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  @Render('index')
  invoice() {
    return { message: 'Hello world!' };
  }
}
