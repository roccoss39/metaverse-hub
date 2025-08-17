import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ✅ BEZPIECZNE - klucze tylko na serwerze
const P24_CONFIG = {
  merchantId: process.env.P24_MERCHANT_ID || '64195',
  posId: process.env.P24_POS_ID || '64195',
  apiKey: process.env.P24_API_KEY || 'sandbox_api_key',
  crc: process.env.P24_CRC || 'sandbox_crc',
  testMode: process.env.P24_TEST_MODE === 'true',
  apiUrl: process.env.P24_TEST_MODE === 'true' 
    ? 'https://sandbox.przelewy24.pl/api/v1'
    : 'https://secure.przelewy24.pl/api/v1'
};

// ✅ BEZPIECZNE - prawdziwy SHA384
function calculateCRC(sessionId: string, merchantId: string, amount: number, currency: string, crc: string): string {
  const data = `${sessionId}|${merchantId}|${amount}|${currency}|${crc}`;
  return crypto.createHash('sha384').update(data).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // ✅ Walidacja danych
    const { sessionId, amount, currency, description, email } = body;
    
    if (!sessionId || !amount || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Bezpieczna kalkulacja CRC
    const sign = calculateCRC(sessionId, P24_CONFIG.merchantId, amount, currency, P24_CONFIG.crc);

    const payload = {
      merchantId: parseInt(P24_CONFIG.merchantId),
      posId: parseInt(P24_CONFIG.posId),
      sessionId,
      amount,
      currency,
      description,
      email,
      country: 'PL',
      language: 'pl',
      urlReturn: `${process.env.NEXT_PUBLIC_APP_URL}/shop/payment-success`,
      urlStatus: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/status`,
      sign
    };

    // ✅ Bezpieczne wywołanie API
    const response = await fetch(`${P24_CONFIG.apiUrl}/transaction/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${P24_CONFIG.posId}:${P24_CONFIG.apiKey}`).toString('base64')}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    // ✅ Nie zwracamy wrażliwych danych
    return NextResponse.json({
      success: true,
      token: data.data?.token,
      // Nie zwracamy: API keys, CRC, itp.
    });

  } catch (error) {
    console.error('Payment registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}