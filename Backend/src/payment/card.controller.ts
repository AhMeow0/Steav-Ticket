@Post('stripe/webhook')
@HttpCode(200)
public async handleStripeWebhook(@Req() req: RawBodyRequest<Request>) {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = this.stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    throw new BadRequestException(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;

    await this.notificationsService.create({
      userId: intent.metadata.userId,
      message: `Payment successful — Booking ID: ${intent.id}`,
    });
  }

  return { received: true };
}
