'use client'
import { motion } from 'framer-motion'
import { profile } from '@/data/resume'

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-between px-6 lg:px-24 pt-20 bg-transparent">
      <motion.div 
        className="w-full lg:w-1/2 z-10 relative pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-sm border border-accent/50 bg-accent/10 text-xs text-accent tracking-[0.3em] uppercase font-bold shadow-[0_0_10px_#22D3EE]">
          Player 1 Ready
        </div>
        
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-4 text-white uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
          {profile.name.split(' ')[0]} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-white animate-pulse">
            {profile.name.split(' ')[1] || ''}
          </span>
        </h1>
        
        <h2 className="text-xl lg:text-2xl text-accent font-mono mb-8 border-l-4 border-primary pl-4">
          LVL 20 • {profile.role}
        </h2>
        
        <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed font-mono">
          <div>
  <p>{"> INITIALIZING SYSTEM..."}</p>
  <p>{"> 300+ DSA PROBLEMS SOLVED..."}</p>
  <p>{"> SYSTEM ARCHITECTURE ONLINE..."}</p>
</div>
        </p>
      </motion.div>
    </section>
  )
}
