// Przelewy24 configuration
export const P24_CONFIG = {
  // DEMO credentials - symulacja dla celów demonstracyjnych
  merchantId: 64195, // Demo merchant ID
  posId: 64195, // Demo POS ID
  apiKey: 'demo_api_key',
  crc: 'demo_crc',
  testMode: true,
  apiUrl: 'https://sandbox.przelewy24.pl/api/v1',
  gatewayUrl: 'https://sandbox.przelewy24.pl'
};

export interface P24Transaction {
  sessionId: string;
  amount: number; // Amount in grosze (1 PLN = 100 grosze)
  currency: string;
  description: string;
  email: string;
  country: string;
  language: string;
  urlReturn: string;
  urlStatus: string;
  channel?: number; // 64 for BLIK
  method?: number; // 154 for BLIK
  timeLimit?: number; // Time limit in minutes
  waitForResult?: boolean;
}

export interface P24RegisterResponse {
  data: {
    token: string;
  };
  error?: string;
}

export interface P24VerifyResponse {
  data: {
    status: string;
    orderId: number;
  };
  error?: string;
}

// Generate unique session ID
export const generateSessionId = (): string => {
  return `MV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate CRC for transaction
export const calculateCRC = (sessionId: string, merchantId: number, amount: number, currency: string, crc: string): string => {
  const data = `${sessionId}|${merchantId}|${amount}|${currency}|${crc}`;
  // In production, use proper SHA384 hashing
  return btoa(data); // Simplified for demo
};

// Register transaction with P24 - DEMO VERSION
export const registerTransaction = async (transaction: P24Transaction): Promise<P24RegisterResponse> => {
  // ⚠️ DEMO MODE - symulacja odpowiedzi P24
  console.log('🎭 DEMO: Symulacja rejestracji transakcji P24');
  console.log('📊 Transaction data:', {
    sessionId: transaction.sessionId,
    amount: transaction.amount,
    currency: transaction.currency,
    description: transaction.description
  });

  // Symulacja opóźnienia API
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Symulacja losowego sukcesu/błędu
  const isSuccess = Math.random() > 0.2; // 80% szans na sukces

  if (isSuccess) {
    const mockToken = `demo_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('✅ DEMO: Symulacja sukcesu, token:', mockToken);
    
    return {
      data: {
        token: mockToken
      }
    };
  } else {
    console.log('❌ DEMO: Symulacja błędu płatności');
    return {
      data: { token: '' },
      error: 'Demo payment failed - try again'
    };
  }
};

// Verify transaction
export const verifyTransaction = async (sessionId: string, amount: number, currency: string, orderId: number): Promise<P24VerifyResponse> => {
  const crc = calculateCRC(sessionId, P24_CONFIG.merchantId, amount, currency, P24_CONFIG.crc);

  const payload = {
    merchantId: P24_CONFIG.merchantId,
    posId: P24_CONFIG.posId,
    sessionId,
    amount,
    currency,
    orderId,
    sign: crc
  };

  try {
    const response = await fetch(`${P24_CONFIG.apiUrl}/transaction/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${P24_CONFIG.posId}:${P24_CONFIG.apiKey}`)}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('P24 Verification Error:', error);
    return { data: { status: 'error', orderId: 0 }, error: 'Verification failed' };
  }
};

// Get payment URL
export const getPaymentUrl = (token: string): string => {
  return `${P24_CONFIG.gatewayUrl}/trnRequest/${token}`;
};

// Get BLIK payment URL
export const getBlikPaymentUrl = (token: string): string => {
  return `${P24_CONFIG.gatewayUrl}/trnRequest/${token}?channel=64&method=154`;
};