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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    console.log('🔥 API: Capturing PayPal payment:', orderId);

    // For demo purposes, simulate capture
    if (!PAYPAL_CLIENT_SECRET || PAYPAL_CLIENT_SECRET === 'demo_secret') {
      console.log('🎭 API: Using demo capture mode');
      
      return NextResponse.json({
        id: orderId,
        status: 'COMPLETED',
        purchase_units: [
          {
            payments: {
              captures: [
                {
                  id: `CAPTURE_${Date.now()}`,
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
          email_address: 'demo@sandbox.paypal.com',
          name: {
            given_name: 'Demo',
            surname: 'User'
          }
        }
      });
    }

    // Real PayPal API call
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const captureData = await response.json();
    console.log('✅ API: PayPal payment captured:', captureData);

    return NextResponse.json(captureData);
  } catch (error) {
    console.error('❌ API: PayPal capture failed:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal payment' },
      { status: 500 }
    );
  }
}