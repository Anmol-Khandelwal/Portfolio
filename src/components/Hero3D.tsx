'use client'
import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile } from '@/data/resume'
import Image from 'next/image'

// --- The Interactive 3D Hologram Card Component ---
function InteractiveAvatar() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Springs for smooth, physics-based movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  // Map mouse position to 3D rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective-1000 hidden lg:flex w-1/2 justify-center items-center">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className="relative w-80 h-[450px] rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(124,58,237,0.2)] flex items-end justify-center cursor-crosshair group"
      >
        {/* Holographic Inner Frame (Floats behind the image) */}
        <div 
          className="absolute inset-4 border border-white/5 rounded-lg pointer-events-none transition-colors duration-500 group-hover:border-accent/30" 
          style={{ transform: "translateZ(20px)" }}
        />
        
        {/* Hacking/Scanning Line */}
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_#22D3EE] hidden group-hover:block animate-scan z-20" 
          style={{ transform: "translateZ(40px)" }} 
        />

        {/* The Avatar Image (Floats above the background) */}
        <div className="relative w-full h-full" style={{ transform: "translateZ(50px)" }}>
           <Image 
             src="/avatar.png" 
             alt="Player Avatar"
             fill
             className="object-contain object-bottom drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-transform duration-500 group-hover:scale-105"
             priority
           />
        </div>
        
        {/* Player Name Plate (Floats above everything) */}
        <div 
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black px-6 py-2 border-2 border-primary text-white font-mono text-xs tracking-widest whitespace-nowrap uppercase z-30 shadow-[0_0_15px_rgba(124,58,237,0.5)]" 
          style={{ transform: "translateZ(70px)" }}
        >
          [ PLAYER 1 ONLINE ]
        </div>
      </motion.div>
    </div>
  )
}

// --- The Main Hero Section ---
export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex items-center justify-between px-6 lg:px-24 pt-20 bg-transparent">
      
      {/* Left Column: Gamified Text */}
      <motion.div 
        className="w-full lg:w-1/2 z-10 relative pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-sm border border-accent/50 bg-accent/10 text-xs text-accent tracking-[0.3em] uppercase font-bold shadow-[0_0_10px_#22D3EE]">
          System Boot Sequence
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
    {"> INITIALIZING SYSTEM..."}
    <br />
    {"> 300+ DSA PROBLEMS SOLVED..."}
    <br />
    {"> SYSTEM ARCHITECTURE ONLINE..."}
</p>

        {/* Action Button */}
        <div className="pointer-events-auto">
          <a href="#projects" className="inline-block px-8 py-4 bg-primary/20 text-white border border-primary hover:bg-primary hover:shadow-[0_0_20px_#7C3AED] font-mono text-sm uppercase tracking-widest transition-all duration-300">
            ENTER DIGITAL REALM
          </a>
        </div>
      </motion.div>

      {/* Right Column: 3D Interactive Avatar */}
      <InteractiveAvatar />
      
    </section>
  )
}
