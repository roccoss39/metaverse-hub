"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

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

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  totalPrice: number;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  totalPrice
}: ShoppingCartProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  const shipping = totalPrice > 25 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900/95 backdrop-blur-lg border-l border-cyan-500/20 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
                <h2 className="text-xl font-bold text-white">
                  {showCheckout ? 'Checkout' : 'Shopping Cart'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {showCheckout ? (
                <CheckoutForm
                  items={items}
                  totalPrice={finalTotal}
                  onBack={handleBackToCart}
                  onClose={onClose}
                />
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                      <div className="text-center text-gray-400 mt-20">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <motion.div
                            key={item.cartId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="glass-morphism p-4 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                                <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                              </div>
                              
                              <div className="flex-1">
                                <h3 className="text-white font-medium text-sm">{item.name}</h3>
                                <p className="text-gray-400 text-xs">
                                  {item.selectedSize} • {item.selectedColor}
                                </p>
                                <p className="text-cyan-400 font-bold">${item.price}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                                  className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                                  className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.cartId)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cart Summary */}
                  {items.length > 0 && (
                    <div className="border-t border-cyan-500/20 p-6">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-gray-300">
                          <span>Subtotal:</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Shipping:</span>
                          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Tax:</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-cyan-500/20 pt-2">
                          <div className="flex justify-between text-white font-bold text-lg">
                            <span>Total:</span>
                            <span>${finalTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {totalPrice < 25 && (
                        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-4">
                          <p className="text-yellow-300 text-sm">
                            Add ${(25 - totalPrice).toFixed(2)} more for free shipping!
                          </p>
                        </div>
                      )}

                      <motion.button
                        onClick={handleCheckout}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 animate-glow"
                      >
                        Proceed to Checkout
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}