"use client";
import { motion } from "framer-motion";
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-20">
        {/* Features Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore <span className="cyber-text">Infinite Possibilities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover cutting-edge technologies that power the next generation of digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            <FeatureCard
              title="Virtual Reality"
              description="Immerse yourself in photorealistic 3D environments with haptic feedback and spatial audio"
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              }
              delay={0.1}
              gradient="from-blue-500 to-cyan-500"
            />
            
            <FeatureCard
              title="AI Agents"
              description="Intelligent virtual beings that learn, adapt, and interact naturally in digital spaces"
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.49 1.64-4.83L9 11.5v.5c0 .83.67 1.5 1.5 1.5S12 12.83 12 12V9.5c0-.83-.67-1.5-1.5-1.5S9 8.67 9 9.5v.5l-3.36-4.33C7.01 4.62 8.82 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              }
              delay={0.2}
              gradient="from-purple-500 to-pink-500"
            />
            
            <FeatureCard
              title="Digital Assets"
              description="Own, trade, and create unique digital items with blockchain-verified authenticity"
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              }
              delay={0.3}
              gradient="from-green-500 to-emerald-500"
            />
            
            <FeatureCard
              title="Social Spaces"
              description="Connect with people worldwide in shared virtual environments and experiences"
              icon={
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v-5l1.5-2L16 18h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z"/>
                </svg>
              }
              delay={0.4}
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </section>

        {/* Latest News Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-12">
            Latest <span className="cyber-text">Innovations</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-cyan-400 group-hover:animate-float" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="text-cyan-300 text-sm font-medium">December 2024</span>
              <h3 className="text-white font-bold text-xl mt-2 mb-3">Neural Interface Integration</h3>
              <p className="text-gray-300">Revolutionary brain-computer interfaces enable direct thought control in virtual environments.</p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-400 group-hover:animate-float" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.49 1.64-4.83L9 11.5v.5c0 .83.67 1.5 1.5 1.5S12 12.83 12 12V9.5c0-.83-.67-1.5-1.5-1.5S9 8.67 9 9.5v.5l-3.36-4.33C7.01 4.62 8.82 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </div>
              <span className="text-purple-300 text-sm font-medium">November 2024</span>
              <h3 className="text-white font-bold text-xl mt-2 mb-3">AI Consciousness Breakthrough</h3>
              <p className="text-gray-300">Advanced AI entities demonstrate self-awareness and emotional intelligence in virtual spaces.</p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-full h-48 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-green-400 group-hover:animate-float" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-green-300 text-sm font-medium">October 2024</span>
              <h3 className="text-white font-bold text-xl mt-2 mb-3">Quantum Computing Integration</h3>
              <p className="text-gray-300">Quantum processors enable real-time physics simulation for unlimited virtual worlds.</p>
            </div>
          </div>
        </motion.section>

        {/* Experience Gallery */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-12">
            Experience <span className="cyber-text">Virtual Worlds</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative h-80 group overflow-hidden rounded-xl glass-morphism"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex flex-col items-center justify-center p-6">
                <svg className="w-16 h-16 text-cyan-400 mb-4 group-hover:animate-float" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <h3 className="text-white font-bold text-xl mb-2">Cosmic Realms</h3>
                <p className="text-gray-300 text-center">Explore infinite galaxies and discover alien civilizations</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative h-80 group overflow-hidden rounded-xl glass-morphism"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex flex-col items-center justify-center p-6">
                <svg className="w-16 h-16 text-purple-400 mb-4 group-hover:animate-float" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h3 className="text-white font-bold text-xl mb-2">Digital Art Studios</h3>
                <p className="text-gray-300 text-center">Create and showcase immersive 3D masterpieces</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative h-80 group overflow-hidden rounded-xl glass-morphism"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex flex-col items-center justify-center p-6">
                <svg className="w-16 h-16 text-green-400 mb-4 group-hover:animate-float" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v-5l1.5-2L16 18h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z"/>
                </svg>
                <h3 className="text-white font-bold text-xl mb-2">Social Hubs</h3>
                <p className="text-gray-300 text-center">Connect with friends in vibrant virtual communities</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-blue-300 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white/10 p-4 rounded-lg">
              <summary className="text-white font-semibold cursor-pointer">What equipment do I need for Metaverse?</summary>
              <p className="mt-2 text-white/80">To fully experience the Metaverse, you&apos;ll need a VR headset, a high-speed internet connection, and a compatible device or computer.</p>
            </details>
            <details className="bg-white/10 p-4 rounded-lg">
              <summary className="text-white font-semibold cursor-pointer">Is Metaverse safe?</summary>
              <p className="mt-2 text-white/80">The Metaverse implements various security measures and protocols to ensure user safety and data protection.</p>
            </details>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white/10 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-300">500M+</div>
            <div className="text-white/80 text-sm">Active Users</div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-300">1000+</div>
            <div className="text-white/80 text-sm">Virtual Worlds</div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-300">24/7</div>
            <div className="text-white/80 text-sm">Availability</div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-300">100+</div>
            <div className="text-white/80 text-sm">Partners</div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 p-8 rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold text-blue-300 mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-4">Subscribe to our newsletter for latest Metaverse updates</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded bg-white/5 border border-blue-500/20 text-white"
            />
            <button className="bg-blue-600 px-6 py-2 rounded text-white hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </form>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto py-8"
        >
          <div className="absolute left-1/2 h-full w-px bg-blue-500/20"></div>
          <div className="space-y-8">
            <div className="relative pl-8 ml-1/2">
              <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2"></div>
              <h3 className="text-white font-bold">2024 Q2</h3>
              <p className="text-white/80">Launch of new virtual spaces and enhanced user interactions</p>
            </div>
            <div className="relative pl-8 ml-1/2">
              <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2"></div>
              <h3 className="text-white font-bold">2024 Q3</h3>
              <p className="text-white/80">Integration of AI-powered virtual assistants</p>
            </div>
            <div className="relative pl-8 ml-1/2">
              <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2"></div>
              <h3 className="text-white font-bold">2024 Q4</h3>
              <p className="text-white/80">Global marketplace launch and cross-platform support</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-8"
        >
          <h2 className="text-2xl font-bold text-blue-300 text-center mb-6">Powered By</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* TechVR */}
            <div className="w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center p-4 hover:bg-white/20 transition-all group">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300 group-hover:scale-110 transition-transform">
                  TechVR
                </div>
                <div className="text-xs text-blue-200/60">Virtual Reality</div>
              </div>
            </div>
            
            {/* MetaNet */}
            <div className="w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center p-4 hover:bg-white/20 transition-all group">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300 group-hover:scale-110 transition-transform">
                  MetaNet
                </div>
                <div className="text-xs text-purple-200/60">Network</div>
              </div>
            </div>
            
            {/* AiCore */}
            <div className="w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center p-4 hover:bg-white/20 transition-all group">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 group-hover:scale-110 transition-transform">
                  AiCore
                </div>
                <div className="text-xs text-cyan-200/60">AI Systems</div>
              </div>
            </div>
            
            {/* QuantumX */}
            <div className="w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center p-4 hover:bg-white/20 transition-all group">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300 group-hover:scale-110 transition-transform">
                  QuantumX
                </div>
                <div className="text-xs text-green-200/60">Computing</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Shop Preview */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-12">
            <span className="cyber-text">MetaVerse Store</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Exclusive MetaVerse Merchandise</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Wear the future with our premium MetaVerse Hub t-shirt. Featuring holographic logo print 
                and made from 100% premium cotton. Perfect for digital pioneers and tech enthusiasts.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Premium 100% Cotton
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Holographic Logo Print
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Free Worldwide Shipping
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Limited Edition
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-cyan-400">$0.99</span>
                <span className="text-xl text-gray-400 line-through">$39.99</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">99% OFF</span>
              </div>
              <motion.a
                href="/shop"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 animate-glow"
              >
                Shop Now
              </motion.a>
            </div>
            
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass-morphism p-8 rounded-xl"
              >
                <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg width="200" height="200" viewBox="0 0 400 400" className="animate-hologram">
                    <path d="M100 120 L100 100 Q100 80 120 80 L140 80 Q160 60 240 60 Q320 60 340 80 L360 80 Q380 80 380 100 L380 120 L360 140 L360 380 Q360 390 350 390 L50 390 Q40 390 40 380 L40 140 Z" fill="#1a1a1a" stroke="#00ffff" strokeWidth="2"/>
                    <rect x="120" y="140" width="160" height="80" fill="#00ffff" opacity="0.2" rx="10"/>
                    <text x="200" y="170" textAnchor="middle" fill="#00ffff" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold">METAVERSE</text>
                    <text x="200" y="195" textAnchor="middle" fill="#00ffff" fontFamily="Arial, sans-serif" fontSize="14">HUB</text>
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="text-white font-bold text-lg mb-2">MetaVerse Hub T-Shirt</h4>
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm">(127 reviews)</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-morphism p-12 rounded-xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Enter the <span className="cyber-text">Metaverse</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of users exploring infinite possibilities in our revolutionary digital universe. 
            Your journey into the future starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 animate-glow"
            >
              Start Your Journey
            </motion.button>
            <motion.a
              href="/agents"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-morphism text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-cyan-500/50"
            >
              Meet Our AI Agents
            </motion.a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
