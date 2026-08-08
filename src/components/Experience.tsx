'use client'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { experience, achievements, certifications } from '@/data/resume'

// --- The Gamified Scratch-to-Reveal Component ---
const ScratchCard = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Setup canvas dimensions to match the container exactly
    const rect = canvas.parentElement!.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Draw the "Classified" Cover Layer
    ctx.fillStyle = '#0a0a0a' // Dark cyberpunk gray
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add Retro Scanlines to the cover
    for (let i = 0; i < canvas.width; i += 8) {
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      ctx.fillRect(i, 0, 2, canvas.height)
    }

    // Add Hacking Text on the cover
    ctx.fillStyle = '#22D3EE' // Cyan accent color
    ctx.font = 'bold 14px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('CLASSIFIED // SCRATCH TO DECRYPT', canvas.width / 2, canvas.height / 2)
  }, [])

  // Mouse / Touch Event Handlers for erasing pixels
  const handleDown = (e: any) => {
    setIsDrawing(true)
    const rect = canvasRef.current!.getBoundingClientRect()
    const x = (e.clientX || e.touches[0].clientX) - rect.left
    const y = (e.clientY || e.touches[0].clientY) - rect.top
    setLastPos({ x, y })
  }

  const handleMove = (e: any) => {
    if (!isDrawing || !lastPos) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top

    // 'destination-out' makes new drawings ERASE existing pixels
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = 45 // Size of the scratch brush
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(x, y)
    ctx.stroke()

    setLastPos({ x, y })
  }

  const handleUp = () => {
    setIsDrawing(false)
    setLastPos(null)
  }

  return (
    <div className="relative w-full h-[100px] border border-white/10 group">
      {/* The Actual Content (Hidden underneath) */}
      <div className="absolute inset-0 w-full h-full p-4 bg-black/40 backdrop-blur-sm font-mono text-sm text-gray-300 flex items-center shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
        <span className="text-accent mr-2">{'>'}</span> {children}
      </div>
      
      {/* The Scratchable Canvas Layer (On top) */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair z-10 transition-opacity duration-1000"
      />
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 lg:px-24 relative z-10 bg-transparent">
      <div className="max-w-4xl mx-auto">
        
        {/* --- 1. EXPERIENCE SECTION (TOP) --- */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-black mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Player Stats & Lore
            </h2>
            <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">Work Experience</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md p-8 border border-white/5 relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
            {experience.map((exp, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative pl-6 border-l-2 border-primary mb-10 last:mb-0"
               >
                 <div className="absolute w-3 h-3 bg-accent -left-[7px] top-1 rounded-full shadow-[0_0_10px_#22D3EE]" />
                 <span className="text-accent font-mono text-sm block mb-1">{exp.period}</span>
                 <h4 className="text-2xl font-bold uppercase tracking-wide text-white">{exp.role}</h4>
                 <h5 className="text-gray-400 font-mono text-sm mb-6">{exp.org}</h5>
                 <ul className="space-y-3 font-mono">
                    {exp.points.map((pt, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-3">
                          <span className="text-primary mt-1">▹</span> {pt}
                        </li>
                    ))}
                 </ul>
               </motion.div>
            ))}
          </div>
        </div>

        {/* --- 2. ACHIEVEMENTS SECTION (MIDDLE) --- */}
        <div className="mb-20">
          <h3 className="text-2xl font-black uppercase mb-8 text-accent flex items-center gap-3">
            <span className="w-8 h-1 bg-accent"></span> Hidden Achievements
          </h3>
          <div className="flex flex-col gap-4">
              {achievements.map((ach, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <ScratchCard>{ach}</ScratchCard>
                  </motion.div>
              ))}
          </div>
        </div>

        {/* --- 3. CERTIFICATIONS SECTION (BOTTOM) --- */}
        <div>
          <h3 className="text-2xl font-black uppercase mb-8 text-primary flex items-center gap-3">
             <span className="w-8 h-1 bg-primary"></span> Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-black/30 backdrop-blur-md p-6 border border-primary/30 font-mono text-sm text-white flex items-center gap-6 group hover:border-accent transition-colors"
                  >
                     <div className="w-12 h-12 flex-shrink-0 bg-primary/20 border border-primary text-primary group-hover:bg-accent/20 group-hover:border-accent group-hover:text-accent flex items-center justify-center font-bold transition-colors">
                       AWS
                     </div>
                     <p className="text-gray-300 group-hover:text-white transition-colors">{cert}</p>
                  </motion.div>
              ))}
          </div>
        </div>

      </div>
    </section>
  )
}