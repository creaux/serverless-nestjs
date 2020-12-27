import { Module } from '@nestjs/common';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
import { NestStripeModule } from '@pyxismedia/lib-nest-stripe';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [NestStripeModule, InvoiceModule],
})
export class StripeModule {}
