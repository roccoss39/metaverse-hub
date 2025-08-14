"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20">
      <main className="max-w-4xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-center mb-12 tracking-tight">
            Discover the 
            <span className="block mt-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text">
              Metaverse World
            </span>
          </h1>
          
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4">What is Metaverse?</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              The Metaverse is the next evolution of the internet - a three-dimensional, immersive digital 
              environment that combines virtual reality (VR), augmented reality (AR), and the internet into 
              a single, connected digital space.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Key Features of Metaverse</h2>
            <ul className="text-white/90 space-y-3 list-disc pl-6">
              <li>Continuity and persistence - the world exists continuously</li>
              <li>Synchronicity - events happen in real-time</li>
              <li>Unlimited number of users</li>
              <li>Functional economy system</li>
              <li>Bridging virtual and physical worlds</li>
              <li>Full interoperability of data and digital assets</li>
            </ul>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Metaverse Applications</h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/90">
              <div className="p-4 bg-white/5 rounded">
                <h3 className="font-semibold mb-2">Entertainment</h3>
                <p>Games, concerts, social and cultural events in virtual space</p>
              </div>
              <div className="p-4 bg-white/5 rounded">
                <h3 className="font-semibold mb-2">Education</h3>
                <p>Interactive classes, virtual laboratories, and simulations</p>
              </div>
              <div className="p-4 bg-white/5 rounded">
                <h3 className="font-semibold mb-2">Business</h3>
                <p>Virtual meetings, conferences, and coworking spaces</p>
              </div>
              <div className="p-4 bg-white/5 rounded">
                <h3 className="font-semibold mb-2">Commerce</h3>
                <p>Virtual stores and galleries with digital goods</p>
              </div>
            </div>
          </motion.section>
        </motion.div>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-blue-300 mb-4">Latest News</h2>
          <div className="grid gap-4">
            <div className="border border-blue-500/20 p-4 rounded">
              <span className="text-blue-300 text-sm">March 15, 2024</span>
              <h3 className="text-white font-semibold mt-1">New Virtual Reality Breakthrough</h3>
              <p className="text-white/70">Latest developments in VR technology promise more immersive experiences.</p>
            </div>
            <div className="border border-blue-500/20 p-4 rounded">
              <span className="text-blue-300 text-sm">March 10, 2024</span>
              <h3 className="text-white font-semibold mt-1">Metaverse Education Platform Launch</h3>
              <p className="text-white/70">Revolutionary new platform for virtual learning experiences.</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="relative h-64 group overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center">
              <p className="text-white font-semibold">Virtual Worlds</p>
            </div>
          </div>
          <div className="relative h-64 group overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
              <p className="text-white font-semibold">Digital Art</p>
            </div>
          </div>
          <div className="relative h-64 group overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-blue-800/50 flex items-center justify-center">
              <p className="text-white font-semibold">Social Spaces</p>
            </div>
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
              <p className="mt-2 text-white/80">To fully experience the Metaverse, you'll need a VR headset, a high-speed internet connection, and a compatible device or computer.</p>
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

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a 
            href="/agents" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Learn More About AI Agents in Metaverse
          </a>
        </motion.div>
      </main>
    </div>
  );
}
