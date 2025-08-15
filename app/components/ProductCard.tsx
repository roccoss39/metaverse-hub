"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  delay?: number;
}

export default function ProductCard({ product, onAddToCart, delay = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
  };

  const getColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case 'black': return 'bg-black';
      case 'navy': return 'bg-blue-900';
      case 'cyber blue': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-morphism rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 group"
    >
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
        <div className="relative w-32 h-32 group-hover:animate-float">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            SALE
          </div>
        )}
        <div className="absolute top-4 right-4 flex items-center bg-black/50 rounded-full px-2 py-1">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-white text-sm">{product.rating}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">Size:</label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">Color:</label>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color ? 'border-cyan-400' : 'border-gray-600'
                } ${getColorClass(color)}`}
                title={color}
              >
                {selectedColor === color && (
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>
          <span className="text-gray-300 text-sm mt-1">{selectedColor}</span>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">Quantity:</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white transition-colors"
            >
              -
            </button>
            <span className="w-12 text-center text-white font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Features Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyan-400 text-sm mb-4 hover:text-cyan-300 transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} Features
        </button>

        {/* Features List */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <ul className="text-gray-300 text-sm space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-3 h-3 text-green-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            product.inStock
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 animate-glow'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>

        {/* Reviews */}
        <div className="mt-3 text-center">
          <span className="text-gray-400 text-sm">
            {product.reviews} reviews • {product.rating}/5 stars
          </span>
        </div>
      </div>
    </motion.div>
  );
}