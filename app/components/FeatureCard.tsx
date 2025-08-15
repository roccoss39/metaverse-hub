"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  gradient?: string;
}

export default function FeatureCard({ title, description, icon, delay = 0, gradient = "from-cyan-500 to-blue-500" }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2)"
      }}
      className="glass-morphism p-6 rounded-xl hover:bg-white/15 transition-all duration-300 group"
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-4 group-hover:animate-float`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
        {description}
      </p>
      
      <div className="mt-4 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}