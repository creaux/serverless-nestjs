import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { StripeModule } from './stripe/stripe.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [InvoiceModule, StripeModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
