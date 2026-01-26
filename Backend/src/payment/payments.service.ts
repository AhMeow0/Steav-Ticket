import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  // mock payment: 90% success, 10% fail
  mockPay(amount: number) {
    const ok = true; // 💯 Always succeed
    return {
      success: ok,
      transactionId: ok ? `TX-${Date.now()}` : null,
      message: ok ? 'Payment success' : 'Payment failed',
      amount,
    };
  }

}
