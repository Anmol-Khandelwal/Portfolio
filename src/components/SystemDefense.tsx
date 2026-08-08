'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bug, ShieldAlert, ShieldCheck } from 'lucide-react'

export default function SystemDefense() {
  const [score, setScore] = useState(0)
  const [bugs, setBugs] = useState<{ id: number; left: number; top: number }[]>([])
  const [isSecured, setIsSecured] = useState(false)

  // Spawn random bugs
  useEffect(() => {
    if (isSecured) return
    
    const interval = setInterval(() => {
      setBugs((currentBugs) => {
        if (currentBugs.length >= 6) return currentBugs // Max 6 bugs on screen
        
        return [...currentBugs, {
          id: Date.now(),
          left: Math.random() * 80 + 10, // Random X position (10% to 90%)
          top: Math.random() * 70 + 15,  // Random Y position (15% to 85%)
        }]
      })
    }, 1200) // Spawns a bug every 1.2 seconds

    return () => clearInterval(interval)
  }, [isSecured])

  const eliminateBug = (id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id))
    setScore((prev) => {
      const newScore = prev + 1
      if (newScore >= 10) {
        setIsSecured(true)
        setBugs([]) // Clear remaining bugs
      }
      return newScore
    })
  }

  return (
    <section className="py-24 px-6 lg:px-24 relative z-10 bg-[#050505] border-t border-white/5">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 flex items-center gap-3">
            {isSecured ? <ShieldCheck className="text-green-500" /> : <ShieldAlert className="text-red-500 animate-pulse" />}
            {isSecured ? 'System Secured' : 'System Defense'}
          </h2>
          <p className="text-gray-500 font-mono tracking-widest text-xs uppercase">
            {isSecured ? 'All threats eliminated.' : 'Eliminate bugs before leaving.'}
          </p>
        </div>
        
        <div className="text-right font-mono">
          <p className="text-xs text-gray-500 uppercase mb-1">Score</p>
          <p className={`text-3xl font-black ${isSecured ? 'text-green-500' : 'text-accent'}`}>
            {score} / 10
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div 
        className={`relative w-full h-[400px] bg-[#0a0a0a] border-2 overflow-hidden transition-colors duration-500 ${
          isSecured ? 'border-green-500/30' : 'border-red-500/30 cursor-crosshair'
        }`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,#fff_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,#fff_20px)]" />

        {isSecured ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-green-500"
          >
            <h3 className="text-4xl font-black uppercase tracking-widest mb-2 shadow-green-500/50 drop-shadow-lg">Clear</h3>
            <p className="font-mono text-sm">Portfolio Integrity Restored</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {bugs.map((bug) => (
              <motion.button
                key={bug.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  // Adds a floating movement effect
                  y: [0, -10, 0, 10, 0], 
                  x: [0, 10, 0, -10, 0] 
                }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ 
                  duration: 0.3,
                  y: { duration: 2, repeat: Infinity, ease: "linear" },
                  x: { duration: 3, repeat: Infinity, ease: "linear" }
                }}
                onClick={() => eliminateBug(bug.id)}
                className="absolute text-red-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/20 rounded-full"
                style={{ left: `${bug.left}%`, top: `${bug.top}%` }}
              >
                <Bug size={32} />
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}