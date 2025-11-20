// payment.model.ts
export interface PaymentCreateDto {
  orderId: number;         // The order you just created
  amount: number;          // Total price of the order
  currency?: string;   
   paymentMethod: string;    // e.g., 'INR'
}

export interface StripeSessionResponse {
  sessionId: string;       // Stripe Checkout Session ID
  paymentUrl: string;      // URL to redirect to Stripe Checkout
}
