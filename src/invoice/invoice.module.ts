import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
