"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BlikPaymentProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BlikPayment({ amount, onSuccess, onCancel }: BlikPaymentProps) {
  const [blikCode, setBlikCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [error, setError] = useState('');

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setError('BLIK code expired. Please generate a new one.');
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBlikCodeChange = (value: string) => {
    // Only allow 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setBlikCode(numericValue);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (blikCode.length !== 6) {
      setError('BLIK code must be 6 digits');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Simulate BLIK payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.2) { // 80% success rate
        onSuccess();
      } else {
        throw new Error('Payment declined by bank');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsProcessing(false);
    }
  };

  const generateNewCode = () => {
    setTimeLeft(120);
    setBlikCode('');
    setError('');
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
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">BLIK Payment</h3>
              <p className="text-gray-400 text-sm">${amount.toFixed(2)}</p>
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
              className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-bold text-white mb-2">Processing Payment...</h4>
            <p className="text-gray-300">Please wait while we process your BLIK payment</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Instructions */}
            <div className="glass-morphism p-4 rounded-lg mb-6">
              <h4 className="text-white font-semibold mb-2">How to pay with BLIK:</h4>
              <ol className="text-gray-300 text-sm space-y-1">
                <li>1. Open your banking app</li>
                <li>2. Go to BLIK section</li>
                <li>3. Generate 6-digit code</li>
                <li>4. Enter the code below</li>
              </ol>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Time remaining:</span>
              <span className={`font-mono text-lg font-bold ${timeLeft < 30 ? 'text-red-400' : 'text-cyan-400'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* BLIK Code Input */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Enter BLIK Code:
              </label>
              <input
                type="text"
                value={blikCode}
                onChange={(e) => handleBlikCodeChange(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                disabled={timeLeft === 0}
              />
              <div className="flex justify-center mt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                      i < blikCode.length ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
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

            {/* Buttons */}
            <div className="space-y-3">
              {timeLeft > 0 ? (
                <motion.button
                  type="submit"
                  disabled={blikCode.length !== 6}
                  whileHover={{ scale: blikCode.length === 6 ? 1.02 : 1 }}
                  whileTap={{ scale: blikCode.length === 6 ? 0.98 : 1 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    blikCode.length === 6
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 animate-glow'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Pay ${amount.toFixed(2)} with BLIK
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={generateNewCode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
                >
                  Generate New BLIK Code
                </motion.button>
              )}

              <button
                type="button"
                onClick={onCancel}
                className="w-full glass-morphism text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Cancel Payment
              </button>
            </div>

            {/* Security Info */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center text-gray-400 text-xs">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                Secured by Polish Payment Standard
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}