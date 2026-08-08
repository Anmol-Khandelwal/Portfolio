'use client'
import { motion } from 'framer-motion'
import { skillGroups } from '@/data/resume'

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 lg:px-24 relative z-10 bg-transparent">
      <div className="mb-16">
        <h2 className="text-4xl lg:text-5xl font-black mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Technical Arsenal
        </h2>
        <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">Unlocked Skill Trees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] border border-white/10 p-6 relative overflow-hidden group"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
          >
            {/* Cyberpunk corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent opacity-50 group-hover:opacity-100 transition-opacity" />

            <h3 className="text-xl font-bold mb-4 uppercase text-primary tracking-wider flex items-center gap-2">
              <span className="text-accent text-sm font-mono opacity-70">[{group.label.substring(0,3).toUpperCase()}]</span>
              {group.label}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-mono font-bold uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-accent hover:border-accent hover:bg-accent/10 transition-colors cursor-crosshair"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}