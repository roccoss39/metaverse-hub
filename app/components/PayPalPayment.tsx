"use client";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CONFIG, createPayPalOrder, capturePayPalPayment } from '../lib/paypal';

interface PayPalPaymentProps {
  amount: number;
  currency: string;
  description: string;
  onSuccess: (orderData: { orderId: string; captureId?: string; amount: string; currency: string; payer?: { email_address?: string; name?: { given_name?: string; surname?: string } }; status: string }) => void;
  onCancel: () => void;
  onError?: (error: Error | unknown) => void;
}

export default function PayPalPayment({ 
  amount, 
  currency, 
  description, 
  onSuccess, 
  onCancel, 
  onError 
}: PayPalPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // For demo purposes, assume amount is already in USD
  // In real app, implement proper currency conversion
  const usdAmount = amount.toFixed(2);

  const initialOptions = {
    clientId: PAYPAL_CONFIG.clientId,
    currency: 'USD',
    intent: 'capture',
    components: 'buttons',
    'enable-funding': 'venmo,paylater',
    'disable-funding': '',
    'data-sdk-integration-source': 'integrationbuilder_sc',
  };

  // Check if we have a real PayPal Client ID
  const hasRealClientId = PAYPAL_CONFIG.clientId && 
    PAYPAL_CONFIG.clientId !== 'demo_paypal_client_id' && 
    PAYPAL_CONFIG.clientId.length > 20; // Real PayPal Client IDs are long

  console.log('🔍 PayPal Client ID check:', {
    clientId: PAYPAL_CONFIG.clientId?.substring(0, 20) + '...',
    length: PAYPAL_CONFIG.clientId?.length,
    hasRealClientId,
    isDemoKey: PAYPAL_CONFIG.clientId === 'demo_paypal_client_id'
  });

  const createOrder = async (data: any, actions: any) => {
    console.log('🔥 REAL: Creating PayPal order with SDK...');
    
    // Use PayPal SDK actions to create order
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: usdAmount,
          },
          description: description,
        },
      ],
      intent: 'CAPTURE',
    });
  };

  const onApprove = async (data: { orderID: string }, actions: any) => {
    console.log('🔥 REAL: PayPal payment approved:', data.orderID);
    
    // Check if component is still mounted
    if (!isMountedRef.current) {
      console.log('🔄 Component unmounted, skipping PayPal processing');
      return;
    }
    
    setIsProcessing(true);
    setError(''); // Clear any previous errors

    try {
      // Check if actions and order are available
      if (!actions || !actions.order) {
        throw new Error('PayPal actions not available');
      }

      // Use PayPal SDK to capture the payment
      const details = await actions.order.capture();
      console.log('✅ REAL: PayPal payment captured via SDK:', details);
      
      // Check again if component is still mounted before updating state
      if (!isMountedRef.current) {
        console.log('🔄 Component unmounted during PayPal processing (likely Fast Refresh in dev mode)');
        return;
      }
      
      // Validate response structure
      if (!details || !details.purchase_units || !details.purchase_units[0]) {
        throw new Error('Invalid PayPal response structure');
      }

      setIsProcessing(false);
      onSuccess({
        orderId: data.orderID,
        captureId: details.purchase_units[0].payments?.captures?.[0]?.id || 'SANDBOX_CAPTURE',
        amount: usdAmount,
        currency: 'USD',
        payer: details.payer || { email_address: 'sandbox@paypal.com' },
        status: 'COMPLETED'
      });
    } catch (err) {
      console.error('❌ REAL: PayPal capture failed:', err);
      
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Payment capture failed';
        setError(errorMessage);
        setIsProcessing(false);
        
        // Don't call onError for window closed errors - it's normal user behavior
        if (!errorMessage.includes('Window closed') && !errorMessage.includes('popup_closed')) {
          if (onError) onError(err);
        }
      }
    }
  };

  const onPayPalError = (err: Error | unknown) => {
    console.error('❌ PayPal error:', err);
    
    // Only update state if component is still mounted
    if (!isMountedRef.current) {
      console.log('🔄 Component unmounted, ignoring PayPal error');
      return;
    }
    
    const errorMessage = err instanceof Error ? err.message : 'PayPal payment failed';
    
    // Handle common PayPal errors gracefully
    if (errorMessage.includes('Window closed') || errorMessage.includes('popup_closed')) {
      console.log('🔄 PayPal window closed by user - this is normal');
      setError('Payment cancelled - PayPal window was closed');
      setIsProcessing(false);
      return; // Don't call onError for user cancellation
    }
    
    if (errorMessage.includes('popup_blocked')) {
      setError('Please allow popups for PayPal payments');
    } else {
      setError('PayPal payment failed. Please try again.');
    }
    
    setIsProcessing(false);
    if (onError) onError(err);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-slate-900/95 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.835 2.607 1.146 1.486 1.315 3.49.53 6.337-.906 3.287-2.914 5.04-6.09 5.04H12.15a.56.56 0 0 0-.544.444l-.866 5.235c-.013.078-.1.12-.18.12-.013 0-.027 0-.041-.003H7.076zm2.146-7.255a.877.877 0 0 0-.8.503l-.85 5.089c-.006.034.016.065.051.065h2.466a.877.877 0 0 0 .8-.503l.85-5.089c.006-.034-.016-.065-.051-.065H9.222z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">PayPal Payment</h3>
              <p className="text-gray-400 text-sm">${usdAmount} USD</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isProcessing ? (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-bold text-white mb-2">Processing Payment...</h4>
            <p className="text-gray-300">Please wait while we process your PayPal payment</p>
          </div>
        ) : (
          <div>
            {/* Payment Info */}
            <div className="glass-morphism p-4 rounded-lg mb-6">
              <h4 className="text-white font-semibold mb-3">Payment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Amount:</span>
                  <span className="text-white font-medium">${usdAmount} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Original:</span>
                  <span className="text-white">{amount.toFixed(2)} {currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Method:</span>
                  <span className="text-blue-400 font-medium">PayPal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Description:</span>
                  <span className="text-white text-right">{description}</span>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 mb-6">
              <div className="flex items-center text-blue-300 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>DEMO MODE - No real money will be charged</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4"
              >
                <p className="text-red-300 text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* PayPal Buttons */}
            <div className="mb-4">
              {hasRealClientId ? (
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'paypal'
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onPayPalError}
                    onCancel={() => {
                      console.log('🔥 REAL: PayPal payment cancelled by user');
                      // Only update state if component is still mounted
                      if (isMountedRef.current) {
                        setError(''); // Clear any errors
                        setIsProcessing(false);
                      }
                      onCancel();
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="bg-gray-600/50 p-4 rounded-lg text-center">
                  <p className="text-gray-300 text-sm mb-3">
                    🎭 Demo Mode - PayPal buttons disabled
                  </p>
                  <p className="text-gray-400 text-xs">
                    Add real PayPal Client ID to enable PayPal buttons
                  </p>
                </div>
              )}
            </div>

            {/* Alternative: Demo Button for testing */}
            <div className="border-t border-gray-600 pt-4">
              <p className="text-gray-400 text-xs text-center mb-3">
                Demo Mode: Click below to simulate successful payment
              </p>
              <motion.button
                onClick={async () => {
                  setIsProcessing(true);
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  onSuccess({
                    orderId: `DEMO_${Date.now()}`,
                    captureId: `CAPTURE_${Date.now()}`,
                    amount: usdAmount,
                    currency: 'USD',
                    payer: {
                      email_address: 'demo@paypal.com',
                      name: { given_name: 'Demo', surname: 'User' }
                    },
                    status: 'COMPLETED'
                  });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 text-sm"
              >
                🎭 Simulate Successful Payment
              </motion.button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="w-full glass-morphism text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 mt-3"
            >
              Cancel Payment
            </button>

            {/* Security Info */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center text-gray-400 text-xs mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                Secured by PayPal
              </div>
              <p className="text-gray-500 text-xs">
                Demo environment - No real transactions
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}