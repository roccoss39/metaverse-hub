"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-morphism"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative animate-float">
              <Image 
                src="/logo.webp"
                alt="MetaVerse Hub Logo"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-full group-hover:animate-glow transition-all duration-300"
              />
            </div>
            <span className="text-white font-bold text-xl tracking-wider animate-neon-pulse">
              METAVERSE HUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="text-white hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                About
              </Link>
              <Link 
                href="/agents" 
                className="text-white hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                AI Agents
              </Link>
              <Link 
                href="/shop" 
                className="text-white hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10"
              >
                Shop
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 animate-glow"
              >
                Enter Metaverse
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-300 focus:outline-none focus:text-cyan-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-morphism"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="text-white hover:text-cyan-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-cyan-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/agents" 
              className="text-white hover:text-cyan-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              AI Agents
            </Link>
            <Link 
              href="/shop" 
              className="text-white hover:text-cyan-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <button className="w-full text-left bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-2 rounded-md text-base font-medium">
              Enter Metaverse
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}