import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  // mock payment: 90% success, 10% fail
  mockPay(amount: number) {
    const ok = Math.random() < 0.9;
    return {
      success: ok,
      transactionId: ok ? `TX-${Date.now()}` : null,
      message: ok ? 'Payment success' : 'Payment failed',
      amount,
    };
  }
}
