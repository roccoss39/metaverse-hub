// PayPal configuration - SANDBOX mode
export const PAYPAL_CONFIG = {
  // ✅ BEZPIECZNE - publiczne sandbox client ID
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'demo_paypal_client_id',
  currency: 'USD',
  intent: 'capture',
  sandbox: true,
  
  // Sandbox URLs
  apiUrl: 'https://api-m.sandbox.paypal.com',
  webUrl: 'https://www.sandbox.paypal.com'
};

export interface PayPalOrderData {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description: string;
  }>;
  payer?: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
}

export interface PayPalCreateOrderData {
  amount: number;
  currency: string;
  description: string;
  reference_id?: string;
}

// Create PayPal order - REAL SANDBOX VERSION
export const createPayPalOrder = async (orderData: PayPalCreateOrderData) => {
  console.log('🔥 REAL: Creating PayPal order via API');
  console.log('💰 Amount:', orderData.amount, orderData.currency);
  console.log('📝 Description:', orderData.description);

  try {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        description: orderData.description,
        reference_id: orderData.reference_id
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ REAL: PayPal order created:', data.id);
    
    return data;
  } catch (error) {
    console.error('❌ REAL: PayPal order creation failed:', error);
    
    // Fallback to demo if API fails
    console.log('🎭 Falling back to DEMO mode');
    const mockOrderId = `DEMO_ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: mockOrderId,
      status: 'CREATED',
      links: [
        {
          href: `https://www.sandbox.paypal.com/checkoutnow?token=${mockOrderId}`,
          rel: 'approve',
          method: 'GET'
        }
      ]
    };
  }
};

// Capture PayPal payment - DEMO VERSION
export const capturePayPalPayment = async (orderId: string) => {
  console.log('🎭 DEMO: Capturing PayPal payment for order:', orderId);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate random success/failure
  const isSuccess = Math.random() > 0.05; // 95% success rate

  if (isSuccess) {
    const mockCaptureId = `DEMO_CAPTURE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('✅ DEMO: PayPal payment captured:', mockCaptureId);
    
    return {
      id: orderId,
      status: 'COMPLETED',
      purchase_units: [
        {
          payments: {
            captures: [
              {
                id: mockCaptureId,
                status: 'COMPLETED',
                amount: {
                  currency_code: 'USD',
                  value: '29.99'
                }
              }
            ]
          }
        }
      ],
      payer: {
        email_address: 'demo@paypal.com',
        name: {
          given_name: 'Demo',
          surname: 'User'
        }
      }
    };
  } else {
    console.log('❌ DEMO: PayPal payment capture failed');
    throw new Error('Demo PayPal payment capture failed');
  }
};

// Get PayPal order details - DEMO VERSION
export const getPayPalOrderDetails = async (orderId: string) => {
  console.log('🎭 DEMO: Getting PayPal order details for:', orderId);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    id: orderId,
    status: 'APPROVED',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '29.99'
        },
        description: 'MetaVerse Hub T-Shirt'
      }
    ],
    payer: {
      email_address: 'demo@paypal.com',
      name: {
        given_name: 'Demo',
        surname: 'User'
      }
    }
  };
};