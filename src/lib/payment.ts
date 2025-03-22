
interface PaymentInitParams {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  orderId: string;
}

interface PaymentResponse {
  payUrl: string;
  paymentRef: string;
}

export const initKonnectPayment = async (params: PaymentInitParams): Promise<PaymentResponse> => {
  try {
    // This would normally call your backend to initialize a payment
    // For demonstration purposes, we're simulating the response
    
    // In a production environment, you would have a real backend endpoint
    // that initializes the payment with Konnect and returns the payment URL
    
    console.log('Payment params:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate response from Konnect payment service
    const paymentRef = `KCT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    return {
      payUrl: `https://sandbox.konnect.network/gateway/${paymentRef}`,
      paymentRef: paymentRef
    };
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw new Error('Failed to initialize payment');
  }
};
