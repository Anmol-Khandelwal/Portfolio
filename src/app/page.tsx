import GlobalParticles from '@/components/GlobalParticles'
import Hero3D from '@/components/Hero3D'
import Skills from '@/components/Skills'
import GamifiedProjects from '@/components/GamifiedProjects'
import Experience from '@/components/Experience'
import SystemDefense from '@/components/SystemDefense'

export const metadata = {
  title: 'Anmol Khandelwal | Gamified Portfolio',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* The 3D Background sits at the very back */}
      <GlobalParticles />
      
      {/* The content sits above it */}
      <div className="relative z-10">
        <Hero3D />
        <Skills />
        <GamifiedProjects />
        <Experience />
        <SystemDefense />
      </div>
      
      <footer className="relative z-10 py-10 text-center font-mono text-xs tracking-widest text-gray-600 bg-[#050505] border-t border-white/5">
        <p>SYSTEM TERMINATED // © {new Date().getFullYear()} ANMOL KHANDELWAL.</p>
      </footer>
    </div>
  )
}