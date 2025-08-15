"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  cartId: string;
}

const products = [
  {
    id: 1,
    name: "MetaVerse Hub T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    description: "Premium quality cotton t-shirt with holographic MetaVerse Hub logo. Perfect for digital pioneers and tech enthusiasts.",
    image: "/tshirt-mockup.svg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Cyber Blue"],
    features: [
      "100% Premium Cotton",
      "Holographic Logo Print",
      "Comfortable Fit",
      "Machine Washable",
      "Limited Edition"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 127
  }
];

export default function Shop() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity: number) => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
      cartId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`
    };
    setCartItems(prev => [...prev, cartItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="cyber-text">MetaVerse Store</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exclusive merchandise for digital pioneers. Wear the future.
          </p>
        </motion.div>

        {/* Cart Button */}
        <motion.button
          onClick={() => setIsCartOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-20 right-4 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </motion.button>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why Choose <span className="cyber-text">MetaVerse Store</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-300 text-sm">High-quality materials and cutting-edge printing technology</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-300 text-sm">Free worldwide shipping on all orders over $25</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Limited Edition</h3>
              <p className="text-gray-300 text-sm">Exclusive designs available only for a limited time</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-300 text-sm">SSL encrypted checkout with multiple payment options</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
}