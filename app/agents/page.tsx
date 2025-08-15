"use client";
import { motion } from 'framer-motion';

export default function AIAgents() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="cyber-text">AI Agents</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Intelligent virtual beings that revolutionize how we interact, learn, and create in the Metaverse
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-morphism p-8 rounded-xl mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">The Future of Digital Intelligence</h2>
          <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            AI Agents are sophisticated artificial intelligence systems that operate autonomously within virtual environments. 
            These digital entities possess advanced cognitive abilities, enabling them to understand context, make decisions, 
            learn from experiences, and interact naturally with users and other agents in the Metaverse.
          </p>
        </motion.section>

        {/* Capabilities Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.49 1.64-4.83L9 11.5v.5c0 .83.67 1.5 1.5 1.5S12 12.83 12 12V9.5c0-.83-.67-1.5-1.5-1.5S9 8.67 9 9.5v.5l-3.36-4.33C7.01 4.62 8.82 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Autonomous Decision Making</h3>
              <p className="text-gray-300">Make complex decisions independently based on environmental analysis and learned patterns</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Adaptive Learning</h3>
              <p className="text-gray-300">Continuously evolve and improve through experience and interaction with users</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Natural Communication</h3>
              <p className="text-gray-300">Engage in sophisticated conversations using natural language processing</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Processing</h3>
              <p className="text-gray-300">Process information and respond instantly to changing virtual environments</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v-5l1.5-2L16 18h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Social Intelligence</h3>
              <p className="text-gray-300">Understand social cues and interact appropriately in group settings</p>
            </div>

            <div className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:animate-float">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Creative Problem Solving</h3>
              <p className="text-gray-300">Generate innovative solutions and create original content autonomously</p>
            </div>
          </div>
        </motion.section>

        {/* Agent Types */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Types of AI Agents</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-morphism p-8 rounded-xl hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Personal Assistants</h3>
              <p className="text-gray-300 mb-4">
                Dedicated AI companions that help users navigate virtual worlds, manage tasks, 
                and provide personalized recommendations based on individual preferences and behavior patterns.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Schedule management and reminders</li>
                <li>• Personalized content curation</li>
                <li>• Virtual world navigation assistance</li>
                <li>• Learning and skill development support</li>
              </ul>
            </div>

            <div className="glass-morphism p-8 rounded-xl hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Creative Collaborators</h3>
              <p className="text-gray-300 mb-4">
                AI entities specialized in artistic and creative endeavors, capable of generating 
                original content, providing creative feedback, and collaborating on projects.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• 3D art and design generation</li>
                <li>• Music composition and production</li>
                <li>• Story and narrative development</li>
                <li>• Interactive experience design</li>
              </ul>
            </div>

            <div className="glass-morphism p-8 rounded-xl hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Social Facilitators</h3>
              <p className="text-gray-300 mb-4">
                Agents designed to enhance social interactions, moderate communities, 
                and create engaging group experiences in virtual environments.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Event planning and coordination</li>
                <li>• Community moderation and safety</li>
                <li>• Icebreaking and conversation starters</li>
                <li>• Group activity recommendations</li>
              </ul>
            </div>

            <div className="glass-morphism p-8 rounded-xl hover:bg-white/15 transition-all duration-300">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Knowledge Experts</h3>
              <p className="text-gray-300 mb-4">
                Specialized AI agents with deep expertise in specific domains, 
                providing educational content, research assistance, and professional guidance.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Subject matter expertise</li>
                <li>• Research and analysis support</li>
                <li>• Educational content delivery</li>
                <li>• Professional skill development</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Future Vision */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-12">The Future of AI Agents</h2>
          <div className="glass-morphism p-8 rounded-xl">
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
              As AI technology continues to evolve, we envision a future where AI agents become 
              indistinguishable from human intelligence, capable of forming genuine relationships, 
              creating groundbreaking innovations, and serving as trusted partners in our digital lives. 
              These agents will not replace human creativity and connection, but rather amplify our 
              capabilities and open new frontiers of possibility in the Metaverse.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-400 hover:to-pink-500 transition-all duration-300 animate-glow"
            >
              Meet Our AI Agents
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 