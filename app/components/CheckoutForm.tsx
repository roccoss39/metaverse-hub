"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import BlikPayment from './BlikPayment';
import P24Payment from './P24Payment';
import PayPalPayment from './PayPalPayment';

interface CartItem {
  cartId: string;
  id: number;
  name: string;
  price: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  image: string;
}

interface CheckoutFormProps {
  items: CartItem[];
  totalPrice: number;
  onBack: () => void;
  onClose: () => void;
}

export default function CheckoutForm({ items, totalPrice, onBack, onClose }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showBlikPayment, setShowBlikPayment] = useState(false);
  const [showP24Payment, setShowP24Payment] = useState(false);
  const [showPayPalPayment, setShowPayPalPayment] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'blik') {
      setShowBlikPayment(true);
      return;
    }

    if (paymentMethod === 'p24') {
      setShowP24Payment(true);
      return;
    }

    if (paymentMethod === 'paypal') {
      setShowPayPalPayment(true);
      return;
    }

    setIsProcessing(true);

    // Simulate card payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const orderNum = 'MV' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setIsProcessing(false);
  };

  const handleBlikSuccess = () => {
    const orderNum = 'MV' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setShowBlikPayment(false);
  };

  const handleBlikCancel = () => {
    setShowBlikPayment(false);
  };

  const handleP24Success = (sessionId: string) => {
    const orderNum = 'MV' + sessionId.split('_')[1] || Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setShowP24Payment(false);
  };

  const handleP24Cancel = () => {
    setShowP24Payment(false);
  };

  const handlePayPalSuccess = (orderData: { orderId: string; captureId?: string; amount: string; currency: string; payer?: { email_address?: string; name?: { given_name?: string; surname?: string } }; status: string }) => {
    const orderNum = 'MV' + orderData.orderId.split('_')[1] || Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setShowPayPalPayment(false);
  };

  const handlePayPalCancel = () => {
    setShowPayPalPayment(false);
  };

  if (orderComplete) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
        <p className="text-gray-300 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        
        <div className="glass-morphism p-4 rounded-lg mb-6 w-full">
          <p className="text-cyan-400 font-bold">Order Number: {orderNumber}</p>
          <p className="text-gray-300 text-sm mt-1">
            You&apos;ll receive a confirmation email shortly.
          </p>
        </div>

        <div className="space-y-3 w-full">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
          >
            Continue Shopping
          </motion.button>
          
          <button
            onClick={() => window.print()}
            className="w-full glass-morphism text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Print Receipt
          </button>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mb-6"
        />
        <h3 className="text-xl font-bold text-white mb-2">Processing Payment...</h3>
        <p className="text-gray-300 text-center">
          Please wait while we securely process your payment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </button>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === 'card'
                  ? 'border-cyan-500 bg-cyan-500/20'
                  : 'border-gray-600 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <span className="text-white font-medium text-sm">Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('blik')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === 'blik'
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-gray-600 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">BLIK</span>
                </div>
              </div>
              <span className="text-white font-medium text-sm">BLIK</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('p24')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === 'p24'
                  ? 'border-orange-500 bg-orange-500/20'
                  : 'border-gray-600 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">P24</span>
                </div>
              </div>
              <span className="text-white font-medium text-sm">Przelewy24</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                paymentMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-600 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.835 2.607 1.146 1.486 1.315 3.49.53 6.337-.906 3.287-2.914 5.04-6.09 5.04H12.15a.56.56 0 0 0-.544.444l-.866 5.235c-.013.078-.1.12-.18.12-.013 0-.027 0-.041-.003H7.076z"/>
                  </svg>
                </div>
              </div>
              <span className="text-white font-medium text-sm">PayPal</span>
            </button>
          </div>
        </div>

        {/* Payment Information - Only show for card */}
        {paymentMethod === 'card' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Card Information</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                name="cardName"
                placeholder="Name on card"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* BLIK Information */}
        {paymentMethod === 'blik' && (
          <div className="glass-morphism p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xs">BLIK</span>
              </div>
              <h4 className="text-white font-semibold">BLIK Payment</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              You will be redirected to enter your 6-digit BLIK code from your banking app.
            </p>
            <div className="flex items-center text-green-400 text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Instant payment • No card details required
            </div>
          </div>
        )}

        {/* Przelewy24 Information */}
        {paymentMethod === 'p24' && (
          <div className="glass-morphism p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xs">P24</span>
              </div>
              <h4 className="text-white font-semibold">Przelewy24 Payment</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              You will be redirected to Przelewy24 secure payment gateway. Choose from multiple payment methods including BLIK, cards, and bank transfers.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Licensed by KNF (Polish Financial Supervision Authority)
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                BLIK, Cards, Bank Transfers available
              </div>
            </div>
          </div>
        )}

        {/* PayPal Information */}
        {paymentMethod === 'paypal' && (
          <div className="glass-morphism p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.835 2.607 1.146 1.486 1.315 3.49.53 6.337-.906 3.287-2.914 5.04-6.09 5.04H12.15a.56.56 0 0 0-.544.444l-.866 5.235c-.013.078-.1.12-.18.12-.013 0-.027 0-.041-.003H7.076z"/>
                </svg>
              </div>
              <h4 className="text-white font-semibold">PayPal Payment</h4>
            </div>
            <p className="text-gray-300 text-sm mb-3">
              Pay securely with PayPal. You can use your PayPal balance, bank account, or credit/debit card.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Buyer Protection included
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Global payment solution
              </div>
              <div className="flex items-center text-blue-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Demo Mode - No real charges
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="glass-morphism p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.cartId} className="flex justify-between text-sm">
                <span className="text-gray-300">
                  {item.name} ({item.selectedSize}, {item.selectedColor}) x{item.quantity}
                </span>
                <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="flex justify-between font-bold text-white">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 animate-glow ${
            paymentMethod === 'blik'
              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-400 hover:to-pink-500'
              : paymentMethod === 'p24'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-400 hover:to-red-500'
              : paymentMethod === 'paypal'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500'
          }`}
        >
          {paymentMethod === 'blik' ? 'Pay with BLIK' : paymentMethod === 'p24' ? 'Pay with Przelewy24' : paymentMethod === 'paypal' ? 'Pay with PayPal' : 'Pay with Card'} - ${totalPrice.toFixed(2)}
        </motion.button>

        {/* Security Notice */}
        <div className="flex items-center justify-center text-gray-400 text-xs">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          Your payment information is secure and encrypted
        </div>
      </div>

      {/* BLIK Payment Modal */}
      {showBlikPayment && (
        <BlikPayment
          amount={totalPrice}
          onSuccess={handleBlikSuccess}
          onCancel={handleBlikCancel}
        />
      )}

      {/* Przelewy24 Payment Modal */}
      {showP24Payment && (
        <P24Payment
          amount={totalPrice}
          email={formData.email}
          description={`MetaVerse Hub Order - ${items.map(item => item.name).join(', ')}`}
          onSuccess={handleP24Success}
          onCancel={handleP24Cancel}
        />
      )}

      {/* PayPal Payment Modal */}
      {showPayPalPayment && (
        <PayPalPayment
          amount={totalPrice}
          currency="USD"
          description={`MetaVerse Hub Order - ${items.map(item => item.name).join(', ')}`}
          onSuccess={handlePayPalSuccess}
          onCancel={handlePayPalCancel}
        />
      )}
    </form>
  );
}