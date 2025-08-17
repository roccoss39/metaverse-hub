"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { generateSessionId, registerTransaction } from '../lib/przelewy24';

interface P24PaymentProps {
  amount: number;
  email: string;
  description: string;
  onSuccess: (sessionId: string) => void;
  onCancel: () => void;
}

export default function P24Payment({ amount, email, description, onSuccess, onCancel }: P24PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'blik' | 'transfer'>('blik');
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const sessionId = generateSessionId();
      const amountInGrosze = Math.round(amount * 100); // Convert to grosze

      console.log('🎭 DEMO: Rozpoczęcie płatności P24');
      console.log(`💰 Kwota: ${amount} PLN (${amountInGrosze} grosze)`);
      console.log(`📧 Email: ${email}`);
      console.log(`💳 Metoda: ${paymentMethod}`);

      const transaction = {
        sessionId,
        amount: amountInGrosze,
        currency: 'PLN',
        description,
        email,
        country: 'PL',
        language: 'pl',
        urlReturn: `${window.location.origin}/shop/payment-success`,
        urlStatus: `${window.location.origin}/api/payment-status`,
        ...(paymentMethod === 'blik' && {
          channel: 64, // BLIK channel
          method: 154, // BLIK method
          timeLimit: 15, // 15 minutes for BLIK
          waitForResult: true
        })
      };

      // Symulacja rejestracji transakcji
      const response = await registerTransaction(transaction);

      if (response.error || !response.data.token) {
        throw new Error(response.error || 'Demo payment registration failed');
      }

      console.log('✅ DEMO: Token otrzymany:', response.data.token);
      console.log('🎭 DEMO: Symulacja przekierowania do P24...');

      // Symulacja przekierowania (w prawdziwej implementacji byłoby window.location.href)
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('🎉 DEMO: Symulacja udanej płatności');
      onSuccess(sessionId);

    } catch (err) {
      console.error('❌ DEMO: Błąd płatności:', err);
      setError(err instanceof Error ? err.message : 'Demo payment failed');
      setIsProcessing(false);
    }
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
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">P24</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Przelewy24</h3>
              <p className="text-gray-400 text-sm">{amount.toFixed(2)} PLN</p>
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
              className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-bold text-white mb-2">Redirecting to Przelewy24...</h4>
            <p className="text-gray-300">Please wait while we prepare your payment</p>
          </div>
        ) : (
          <div>
            {/* Payment Method Selection */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4">Choose Payment Method:</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('blik')}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center ${
                    paymentMethod === 'blik'
                      ? 'border-red-500 bg-red-500/20'
                      : 'border-gray-600 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">BLIK</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">BLIK</div>
                    <div className="text-gray-400 text-sm">Pay with your mobile banking app</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-600 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Credit/Debit Card</div>
                    <div className="text-gray-400 text-sm">Visa, Mastercard, Maestro</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center ${
                    paymentMethod === 'transfer'
                      ? 'border-green-500 bg-green-500/20'
                      : 'border-gray-600 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">Bank Transfer</div>
                    <div className="text-gray-400 text-sm">Online banking transfer</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Info */}
            <div className="glass-morphism p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Amount:</span>
                <span className="text-white font-bold">{amount.toFixed(2)} PLN</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Method:</span>
                <span className="text-white capitalize">{paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Provider:</span>
                <span className="text-orange-400 font-semibold">Przelewy24</span>
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

            {/* Payment Button */}
            <motion.button
              onClick={handlePayment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-orange-400 hover:to-red-500 transition-all duration-300 animate-glow mb-3"
            >
              Pay {amount.toFixed(2)} PLN with Przelewy24
            </motion.button>

            <button
              onClick={onCancel}
              className="w-full glass-morphism text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Cancel Payment
            </button>

            {/* Security Info */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center text-gray-400 text-xs mb-2">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                Secured by Przelewy24
              </div>
              <p className="text-gray-500 text-xs">
                Licensed payment institution supervised by KNF
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}