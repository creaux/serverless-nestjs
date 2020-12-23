import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [InvoiceModule, StripeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
