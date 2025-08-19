import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'demo_secret';
const PAYPAL_BASE_URL = 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, description, reference_id } = await request.json();

    console.log('🔥 API: Creating PayPal order');
    console.log('💰 Amount:', amount, currency);

    // For demo purposes, we'll simulate the PayPal API response
    // In real implementation, you'd need PayPal Client Secret
    if (!PAYPAL_CLIENT_SECRET || PAYPAL_CLIENT_SECRET === 'demo_secret') {
      console.log('🎭 API: Using demo mode (no client secret)');
      
      const mockOrderId = `SANDBOX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return NextResponse.json({
        id: mockOrderId,
        status: 'CREATED',
        links: [
          {
            href: `https://www.sandbox.paypal.com/checkoutnow?token=${mockOrderId}`,
            rel: 'approve',
            method: 'GET'
          }
        ]
      });
    }

    // Real PayPal API call (requires client secret)
    const accessToken = await getPayPalAccessToken();

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: reference_id,
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: description,
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/payment-cancel`,
        brand_name: 'MetaVerse Hub',
        user_action: 'PAY_NOW',
      },
    };

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();
    console.log('✅ API: PayPal order created:', order.id);

    return NextResponse.json(order);
  } catch (error) {
    console.error('❌ API: PayPal order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}