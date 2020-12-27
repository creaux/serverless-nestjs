import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  ValidationPipeOptions,
  UseGuards,
} from '@nestjs/common';
import {
  StripePaymentIntentSucceedGuard,
  StripeEventDto,
} from '@pyxismedia/lib-nest-stripe';
import { Builder } from '../../builder';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post()
  @UseGuards(StripePaymentIntentSucceedGuard)
  paymentIntent(
    @Body(
      new ValidationPipe(
        Builder<ValidationPipeOptions>()
          .transform(true)
          .expectedType(StripeEventDto)
          .build(),
      ),
      // FIXME: Is not transformed see stripe-event-data.dto
      // StripeChargeFromEventPipe,
    )
    body: StripeEventDto,
  ) {
    return this.stripeService.createInvoice(body.data.object);
  }
}
