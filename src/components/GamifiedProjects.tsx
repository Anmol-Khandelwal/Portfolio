'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/resume'
import { ExternalLink, Github, Lock, Unlock, Terminal } from 'lucide-react'

// Individual Project Card with the Hacking Game Logic
function ProjectCard({ project, index }: { project: any, index: number }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isHacking, setIsHacking] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleHack = () => {
    setIsHacking(true)
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 10
      if (currentProgress >= 100) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setIsHacking(false)
          setIsUnlocked(true)
        }, 500)
      } else {
        setProgress(currentProgress)
      }
    }, 150)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
      className="group relative bg-[#0a0a0a] border-2 border-white/10 p-6 flex flex-col h-full"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-accent opacity-50 shadow-[0_0_15px_#22D3EE] hidden group-hover:block animate-scan" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-primary font-bold font-mono tracking-widest block">
            [ ID: {project.id.toUpperCase()} ]
          </span>
          {isUnlocked ? <Unlock size={16} className="text-accent" /> : <Lock size={16} className="text-red-500" />}
        </div>

        <h3 className="text-2xl font-black uppercase text-white mb-2">{project.name}</h3>
        
        {!isUnlocked ? (
          <div className="flex-grow flex flex-col items-center justify-center py-10 bg-black/50 border border-white/5 mb-6">
            {isHacking ? (
              <div className="w-full px-6">
                <p className="text-accent font-mono text-xs mb-2 flex items-center gap-2 animate-pulse">
                  <Terminal size={14} /> BRUTE FORCING ENCRYPTION...
                </p>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-150" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-right text-xs font-mono text-gray-500 mt-1">{progress}%</p>
              </div>
            ) : (
              <button 
                onClick={handleHack}
                className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <Lock size={14} /> Hack to Reveal
              </button>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col">
            <p className="text-gray-400 text-sm font-mono mb-6 flex-grow">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech: string) => (
                <span key={tech} className="px-2 py-1 text-[10px] uppercase font-bold bg-white/5 border border-white/20 text-accent">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
              <button className="flex items-center gap-2 text-xs font-mono font-bold uppercase hover:text-accent transition-colors">
                <Github size={14} /> Source
              </button>
              <button className="flex items-center gap-2 text-xs font-mono font-bold uppercase hover:text-accent transition-colors">
                <ExternalLink size={14} /> Deploy
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function GamifiedProjects() {
  return (
    <section id="projects" className="py-32 px-6 lg:px-24 relative z-10 bg-transparent">
      <div className="mb-16">
        <h2 className="text-4xl lg:text-5xl font-black mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Active Quests
        </h2>
        <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">Mission Logs & Artifacts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}