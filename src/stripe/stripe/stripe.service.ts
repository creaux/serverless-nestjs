import { Injectable } from '@nestjs/common';
import {
  StripePaymentIntentDto,
  StripePaymentMethodsMapper,
  StripePaymentMethodModel,
  AddressOneLineExtractor,
} from '@pyxismedia/lib-nest-stripe';
import { InvoiceService } from '../../invoice/invoice/invoice.service';
import { Builder } from '../../builder';
import { InvoiceModel } from '../../models/invoice.model';

@Injectable()
export class StripeService {
  constructor(
    private readonly stripePaymentMethodsMapper: StripePaymentMethodsMapper,
    private readonly invoiceService: InvoiceService,
    private readonly AddressOneLineExtractor: AddressOneLineExtractor,
  ) {}
  async createInvoice(stripePaymentIntent: StripePaymentIntentDto) {
    const paymentMethod = await this.getPaymentMethod(
      stripePaymentIntent.payment_method,
    );
    const extractor = new this.AddressOneLineExtractor(
      paymentMethod.billing_details.line1,
    );
    const invoice = Builder(InvoiceModel)
      .name(paymentMethod.billing_details.name)
      .company()
      .vat()
      .phone(paymentMethod.billing_details.phone)
      .address()
      .build();
  }

  private getPaymentMethod(id: string): Promise<StripePaymentMethodModel> {
    return this.stripePaymentMethodsMapper.getPaymentMethod(id);
  }
}
