import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Cpu, Shield, Zap, Database } from 'lucide-react';

/* ========================================================================
  🎨 1. GLOBAL STYLES & LIQUID GLASS CSS
  Premium underground core lab aesthetic. Black, graphite, gold, and deep silver.
  ========================================================================
*/
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,700&family=JetBrains+Mono:wght@400;700&family=Satoshi:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
    
    :root {
      --gold-primary: #D4AF37;
      --gold-light: #F3E5AB;
      --graphite: #1A1A1A;
      --silver-deep: #8A8A8A;
      --accent-glow: rgba(212, 175, 55, 0.4);
      --glass-border: rgba(212, 175, 55, 0.25);
    }

    body {
      background-color: #030303;
      color: #E0E0E0;
      font-family: 'Satoshi', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, .font-cinematic {
      font-family: 'Cormorant Garamond', serif;
    }

    .font-promise {
      font-family: 'Playfair Display', serif;
    }

    .font-terminal {
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.05em;
    }

    /* Cinematic Liquid Glass Effect */
    .inject-card {
      background: linear-gradient(180deg, rgba(20,20,20,0.7) 0%, rgba(10,10,10,0.95) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .inject-card:hover {
      border-color: var(--glass-border);
      box-shadow: 0 15px 50px -10px var(--accent-glow), inset 0 1px 1px rgba(212, 175, 55, 0.3);
      transform: translateY(-4px);
    }

    /* Terminal Hover Effects */
    .terminal-overlay {
      background: rgba(3, 3, 3, 0.85);
      backdrop-filter: blur(8px);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .inject-card:hover .terminal-overlay {
      opacity: 1;
    }

    /* Button Glows */
    .get-code-btn {
      position: relative;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    .get-code-btn:hover {
      background: rgba(212, 175, 55, 0.1);
      border-color: var(--gold-primary);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
    }

    .grain-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 100;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    }

    /* Hide scrollbar for filter tabs */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Sphere Logo Shading */
    .sphere-logo {
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 
        inset -6px -6px 12px rgba(0,0,0,0.6), 
        inset 4px 4px 10px rgba(255,255,255,0.9), 
        0 0 18px rgba(212,175,55,0.5);
      background-size: 85%;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(212,175,55,0.3);
    }
    .sphere-logo::after {
      content: '';
      position: absolute;
      top: 5%;
      left: 10%;
      width: 45%;
      height: 45%;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%);
      pointer-events: none;
    }
  `}} />
);

/* ========================================================================
  ⚙️ 2. CANDYBYTE LOGIC & DATABASE
  ========================================================================
*/
const getCandyByteTier = (cb) => {
  if (cb <= 50) return 'Nano Bytes';
  if (cb <= 150) return 'Light Bytes';
  if (cb <= 300) return 'Heavy Bytes';
  if (cb <= 500) return 'Titan Bytes';
  return 'Omega Injects';
};

const FILTERS = [
  'Popular Injects', 'Low CandyBytes', 'High CandyBytes', 'Elite Runtime', 
  'Fresh Drops', 'Precision Injects', 'Experimental', 'Black Market', 
  'Neural Boosts', 'Runtime Monsters'
];

const INJECTS_DATABASE = [
  {
    id: 'inj_001',
    title: 'VisionForge Runtime Enhancer',
    cb: 248,
    price: 149,
    runtimeClass: 'Precision Runtime',
    coreWeight: 'Heavy',
    build: 'v4.2.1',
    deployments: 1204,
    tags: ['Popular Injects', 'Precision Injects', 'Elite Runtime'],
    description: 'Enhances cinematic scene consistency, optimizes runtime precision, and improves AI behavioral stability.',
    effects: ['Improved cinematic consistency', 'Faster scene understanding', 'Reduced runtime instability', 'Better AI behavioral precision'],
    density: 84,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    badge: 'ELITE RUNTIME'
  },
  {
    id: 'inj_002',
    title: 'Neural Overclock Module',
    cb: 580,
    price: 499,
    runtimeClass: 'Performance Runtime',
    coreWeight: 'Omega-Tier',
    build: 'v1.0.0-exp',
    deployments: 42,
    tags: ['Runtime Monsters', 'Experimental', 'High CandyBytes', 'Black Market'],
    description: 'Bypasses default latency limits. Highly dangerous experimental logic modification for instant token generation.',
    effects: ['Zero-latency streaming', 'Uncapped token generation', 'Requires external cooling protocols'],
    density: 98,
    image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2121&auto=format&fit=crop',
    badge: 'EXPERIMENTAL'
  },
  {
    id: 'inj_003',
    title: 'Cognitive Anchor Pack',
    cb: 45,
    price: 29,
    runtimeClass: 'Memory Runtime',
    coreWeight: 'Light',
    build: 'v8.1.4',
    deployments: 8403,
    tags: ['Low CandyBytes', 'Popular Injects'],
    description: 'Lightweight core injection to prevent context dropping during extended inference windows.',
    effects: ['Context persistence', 'Reduced hallucination drift'],
    density: 32,
    image: 'https://i.pinimg.com/1200x/85/cb/9d/85cb9ddbb7ae3c28ec21e392548e0911.jpg',
    badge: ''
  },
  {
    id: 'inj_004',
    title: 'Cinematic Depth Injector',
    cb: 310,
    price: 210,
    runtimeClass: 'Visual Runtime',
    coreWeight: 'Titan',
    build: 'v2.2.0',
    deployments: 512,
    tags: ['Fresh Drops', 'Neural Boosts'],
    description: 'Forces diffusion models to respect z-depth mapping accurately, creating authentic cinematic depth-of-field.',
    effects: ['Z-depth mapping', 'Authentic bokeh generation', 'Focal precision'],
    density: 89,
    image: 'https://i.pinimg.com/1200x/f7/9c/98/f79c9896fefea84a466b79484c42a422.jpg',
    badge: 'HIGH DENSITY'
  }
];

/* ========================================================================
  📝 3. ELITE CHECKOUT MODAL (FORMSPREE INTEGRATION)
  ========================================================================
*/
const CheckoutModal = ({ inject, onClose }) => {
  if (!inject) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
          className="inject-card relative w-full max-w-lg rounded-2xl p-8 border border-[var(--gold-primary)]/20"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-[var(--gold-primary)] transition-colors">
            <X size={20} />
          </button>

          <div className="mb-8">
            <div className="font-terminal text-[10px] text-[var(--gold-primary)] mb-3 tracking-widest flex items-center gap-2">
              <Terminal size={12} /> SECURE INJECTION ACQUISITION
            </div>
            <h2 className="text-3xl font-cinematic text-white italic">{inject.title}</h2>
            <p className="text-sm text-[var(--silver-deep)] mt-2 font-light">Acquiring {inject.cb} CB of runtime modification.</p>
          </div>

          <form action="https://formspree.io/f/xzdoyypp" method="POST" className="space-y-5">
            <input type="hidden" name="Injection_Requested" value={inject.title} />
            <input type="hidden" name="CandyBytes" value={inject.cb} />
            <input type="hidden" name="Price" value={`$${inject.price}`} />
            
            <div>
              <label className="block font-terminal text-[10px] text-white/50 mb-2 uppercase tracking-wider">Operator ID (Email)</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="sysadmin@neural.net"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--gold-primary)] transition-colors font-terminal"
              />
            </div>

            <div>
              <label className="block font-terminal text-[10px] text-white/50 mb-2 uppercase tracking-wider">Deployment Environment (Use Case)</label>
              <textarea 
                name="use_case" 
                required 
                rows="3"
                placeholder="Describe intended runtime parameters..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--gold-primary)] transition-colors resize-none font-terminal"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)] text-[var(--gold-light)] font-medium rounded-lg px-6 py-4 flex items-center justify-center gap-2 hover:bg-[var(--gold-primary)] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <Database size={16} />
              <span>Initialize Download Sequence</span>
            </button>
            <div className="flex justify-between items-center mt-4 px-1">
               <p className="text-[9px] font-terminal text-white/30 uppercase tracking-widest">End-to-End Encrypted</p>
               <p className="text-[9px] font-terminal text-[var(--gold-primary)]/70 uppercase tracking-widest">Cost: ${inject.price} USD</p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ========================================================================
  🎬 4. MAIN ECOSYSTEM DASHBOARD
  ========================================================================
*/
export default function App() {
  const [activeFilter, setActiveFilter] = useState('Popular Injects');
  const [selectedInject, setSelectedInject] = useState(null);

  // Filtering & Sorting Logic
  const filteredInjects = useMemo(() => {
    let result = [...INJECTS_DATABASE];
    
    if (activeFilter === 'Low CandyBytes') {
      result.sort((a, b) => a.cb - b.cb);
    } else if (activeFilter === 'High CandyBytes') {
      result.sort((a, b) => b.cb - a.cb);
    } else {
      result = result.filter(inj => inj.tags.includes(activeFilter) || inj.runtimeClass.includes(activeFilter));
      // Fallback if tag doesn't match perfectly, just show all sorted by relevance
      if (result.length === 0) return INJECTS_DATABASE; 
    }
    return result;
  }, [activeFilter]);

  // Dynamic visual meter generator based on density %
  const renderDensityMeter = (density) => {
    const totalBlocks = 15;
    const filledBlocks = Math.round((density / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)} ${density}%`;
  };

  return (
    <div className="relative min-h-screen selection:bg-[var(--gold-primary)] selection:text-black font-light">
      <GlobalStyles />
      <div className="grain-overlay" />

      {/* GLOBAL CINEMATIC BACKGROUND (Thick & Clear) */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <img 
          src="https://i.pinimg.com/1200x/2d/f7/90/2df7907ef115b37d1e6fb6fab2ee1a77.jpg" 
          alt="Global Architecture" 
          className="w-full h-full object-cover opacity-80 contrast-[1.15] saturate-[1.2]"
        />
      </div>
      {/* Global shadow wash to ensure terminal text legibility everywhere */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black/30 via-black/60 to-black/90 pointer-events-none" />

      {/* HEADER NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Sphere Logo using the provided image link */}
          <div 
            className="w-12 h-12 flex-shrink-0 sphere-logo" 
            style={{ 
              backgroundImage: 'url("https://i.ibb.co/spxLGRFT/Radiance-Logo.jpg")'
            }} 
            title="Radiance Core"
          />
          <div className="font-cinematic text-4xl md:text-5xl tracking-widest text-[var(--gold-light)] italic font-black" style={{ textShadow: '0 0 2px var(--gold-light), 0 0 15px rgba(212,175,55,0.4)' }}>
            RADIANCE.1N
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-terminal tracking-widest text-white/50 uppercase">
          <a href="#market" className="hover:text-[var(--gold-primary)] transition-colors">Runtime Market</a>
          <a href="#lab" className="hover:text-[var(--gold-primary)] transition-colors">The Lab</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 min-h-[90vh] flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--gold-primary)]/10 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl w-full"
        >
          <div className="font-terminal text-[10px] text-[var(--gold-primary)] mb-6 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[var(--gold-primary)]/50"></span>
            System Architecture
            <span className="w-8 h-px bg-[var(--gold-primary)]/50"></span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-cinematic mb-6 leading-[1.1] tracking-tight text-white">
            Inject Intelligence <br/>
            <span className="italic text-[var(--gold-light)]">Into Your AI</span>
          </h1>
          
          <p className="text-lg md:text-xl font-light text-[var(--silver-deep)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Core-powered runtime enhancements measured in <strong className="text-white font-medium">CandyBytes</strong>. Built for builders pushing AI beyond default limits.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('market').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-14 py-4 rounded-full font-bold text-lg tracking-widest uppercase hover:bg-[var(--gold-light)] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105"
            >
              Explore Injects
            </button>
          </div>

          {/* Enhanced Radiance Promise */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 max-w-2xl mx-auto text-center bg-black/60 p-6 md:p-8 rounded-2xl border border-[var(--gold-primary)]/40 backdrop-blur-xl shadow-[0_8px_30px_-5px_rgba(212,175,55,0.3)]"
          >
             <h3 className="text-[var(--gold-light)] font-terminal text-lg md:text-2xl uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-3 font-bold drop-shadow-[0_0_15px_rgba(212,175,55,1)]">
               <Shield size={24} className="text-[var(--gold-primary)]" /> The Radiance Promise
             </h3>
             <p className="text-white/95 text-base md:text-xl font-promise italic font-medium leading-[1.6]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
               "The injections are used to make AI work better. They will give your AI true personality and enhance it profoundly, elevating image generation, content writing, and much more. These injections make the free versions of AI fully compatible and even better than the premium ones."
             </p>
          </motion.div>
        </motion.div>
      </section>

      {/* MARKETPLACE SECTION */}
      <section id="market" className="relative z-10 py-24 max-w-7xl mx-auto">
        {/* Marketplace Header */}
        <div className="px-6 md:px-12 mb-12">
          <h2 className="text-3xl font-cinematic italic mb-2 text-white">Browse Runtime Injects</h2>
          <p className="text-sm font-light text-[var(--silver-deep)]">Discover Core-level AI enhancements ranked by CandyBytes.</p>
        </div>

        {/* Horizontal Premium Tabs */}
        <div className="px-6 md:px-12 mb-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 pb-4">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === filter 
                    ? 'bg-[var(--gold-primary)]/10 text-[var(--gold-light)] border border-[var(--gold-primary)]/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'bg-white/5 text-white/50 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredInjects.map((inject, index) => (
            <motion.div 
              key={inject.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="inject-card rounded-2xl p-6 flex flex-col group cursor-crosshair"
            >
              {/* Animated Terminal Hover Effect */}
              <div className="terminal-overlay absolute inset-0 z-20 p-8 flex flex-col justify-center pointer-events-none">
                <div className="font-terminal text-[11px] text-[var(--gold-primary)] leading-relaxed">
                  <p className="mb-2 text-white/50">&gt; Analyzing injection package...</p>
                  <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.1}}>+ Core Density Increased</motion.p>
                  <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.2}}>+ Runtime Stability: HIGH</motion.p>
                  <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.3}}>+ Neural Precision: {inject.density}%</motion.p>
                  <p className="mt-4 text-xs text-white uppercase tracking-widest animate-pulse">&gt; Ready for deployment</p>
                </div>
              </div>

              {/* Card Top: Class & CandyBytes */}
              <div className="inject-top flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="font-terminal text-[9px] uppercase tracking-widest text-[var(--gold-primary)] bg-[var(--gold-primary)]/10 px-2 py-1 rounded-sm border border-[var(--gold-primary)]/20">
                    {inject.runtimeClass}
                  </span>
                  {inject.badge && (
                    <span className="font-terminal text-[9px] uppercase tracking-widest text-red-400 border border-red-500/30 px-2 py-1 rounded-sm">
                      {inject.badge}
                    </span>
                  )}
                </div>
                <div className="candybyte-count font-terminal text-xs text-white/80 font-bold flex items-center gap-1.5">
                  <Zap size={12} className="text-[var(--gold-primary)]" />
                  {inject.cb} CandyBytes
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 flex-grow">
                <h3 className="inject-title text-2xl font-cinematic mb-3 text-white leading-snug">{inject.title}</h3>
                <p className="inject-description text-sm text-[var(--silver-deep)] font-light leading-relaxed mb-6">
                  {inject.description}
                </p>

                {/* Metadata Row */}
                <div className="inject-meta grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5 font-terminal text-[10px] text-white/40 uppercase tracking-wider">
                  <div>
                    <span className="block text-[8px] text-white/20 mb-1">Core Weight</span>
                    <span className="text-[var(--gold-light)]">{inject.coreWeight}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-white/20 mb-1">Injection Build</span>
                    <span className="text-white/80">{inject.build}</span>
                  </div>
                </div>

                {/* Visual Density Meter */}
                <div className="mb-8 font-terminal text-[10px] text-[var(--gold-primary)] opacity-70">
                  <div className="mb-1 text-white/30 tracking-widest">RUNTIME DENSITY</div>
                  <div className="tracking-widest">{renderDensityMeter(inject.density)}</div>
                </div>
              </div>

              {/* Card Footer: Price & Action */}
              <div className="inject-footer flex items-center justify-between mt-auto pt-5 border-t border-white/5 relative z-10">
                <div className="price-wrapper flex flex-col">
                  <span className="price text-xl font-medium text-white flex items-baseline gap-1">
                    ${inject.price} <span className="text-[10px] text-white/30 font-terminal uppercase tracking-widest font-normal">USD</span>
                  </span>
                  <span className="byte-tier font-terminal text-[9px] text-[var(--gold-primary)] uppercase tracking-widest mt-0.5">
                    {getCandyByteTier(inject.cb)}
                  </span>
                </div>

                <button 
                  onClick={() => setSelectedInject(inject)}
                  className="get-code-btn px-5 py-3 rounded-md flex items-center gap-3 relative z-30 pointer-events-auto"
                >
                  <span className="text-sm font-medium text-white tracking-wide">Get Code</span>
                  <span className="btn-bytes font-terminal text-[10px] bg-[var(--gold-primary)] text-black px-1.5 py-0.5 rounded-sm font-bold">
                    {inject.cb} CandyBytes
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE LAB: CANDYBYTE MANIFESTO SECTION */}
      <section id="lab" className="relative z-10 py-32 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* Left: Philosophy */}
            <div className="flex-1">
              <div className="font-terminal text-[10px] text-[var(--gold-primary)] mb-4 uppercase tracking-[0.3em] flex items-center gap-3">
                <Terminal size={12} /> System Manifesto
              </div>
              <h2 className="text-4xl md:text-5xl font-cinematic italic mb-6 text-white leading-tight">
                The CandyByte <br/> Power Scale
              </h2>
              <div className="text-[var(--silver-deep)] font-light space-y-5 text-sm leading-relaxed">
                <p>
                  <strong className="text-white font-medium">CandyBytes</strong> are the proprietary computational units used to measure the power, depth, and sophistication of neural AI injections inside the Radiance ecosystem.
                </p>
                <p>
                  They are <span className="text-[var(--gold-primary)]">not storage units</span> and do not represent file size. They represent the overall intelligence density, runtime optimization depth, and behavioral enhancement capability of a core-level injection.
                </p>
                <p>
                  Instead of categorizing code using traditional software labels like "basic" or "premium," injections are categorized by their CandyByte density. The higher the CandyBytes, the more advanced and capable the injection becomes—turning every code package into a scalable intelligence unit.
                </p>
              </div>
            </div>

            {/* Right: The Tier Scale */}
            <div className="flex-1 w-full">
              <div className="inject-card rounded-2xl p-8 border border-white/5">
                <h3 className="font-terminal text-[10px] text-white/50 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Zap size={12} /> Runtime Classification Tiers
                </h3>
                <div className="space-y-5">
                  {[
                    { tier: "Nano Bytes", desc: "Minimal lightweight injections" },
                    { tier: "Light Bytes", desc: "Affordable optimized injections" },
                    { tier: "Heavy Bytes", desc: "Advanced runtime enhancement" },
                    { tier: "Titan Bytes", desc: "Elite-grade core manipulation" },
                    { tier: "Omega Injects", desc: "Maximum computational sophistication", isGold: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className={`font-terminal text-xs uppercase tracking-widest whitespace-nowrap ${item.isGold ? 'text-[var(--gold-primary)] animate-pulse' : 'text-white'}`}>
                        {item.tier}
                      </div>
                      <div className="text-[10px] font-light text-[var(--silver-deep)] uppercase tracking-wider flex-1 text-right">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-black/60 backdrop-blur-xl pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <div className="font-cinematic text-4xl italic mb-3 text-[var(--gold-light)] font-black">Radiance.1n</div>
              <p className="text-[var(--silver-deep)] font-light max-w-sm mb-6 text-sm">
                Underground runtime enhancements for developers pushing AI beyond default parameters.
              </p>
              <div className="font-terminal text-base text-[var(--gold-primary)] uppercase tracking-widest mt-4">
                System Architect: <a href="https://instagram.com/si0ic" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl font-bold ml-1">@si0ic</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 md:text-right font-terminal">
              <span className="text-white/20 text-[10px] tracking-widest uppercase mb-1">Encrypted Comms</span>
              <a href="mailto:radiance1nr@gmail.com" className="text-sm text-white/60 hover:text-[var(--gold-primary)] transition-colors">
                radiance1nr@gmail.com
              </a>
            </div>
          </div>

          <div className="h-px w-full bg-white/5 mb-12" />

          {/* PRIVACY POLICY */}
          <div className="inject-card rounded-xl p-8 mb-12 max-w-4xl mx-auto border-none bg-white/[0.02]">
            <h3 className="text-white font-cinematic text-4xl mb-6 italic">Privacy Protocol</h3>
            <p className="mb-2 font-terminal text-[10px] text-[var(--gold-primary)] uppercase tracking-widest">Last Compilation: May 11, 2026</p>
            <div className="text-sm text-[var(--silver-deep)] font-light space-y-3 leading-relaxed">
              <p>Welcome to <strong>Radiance.1n</strong>. Your execution privacy matters to our network.</p>
              <p>This protocol explains how we process, shield, and route your acquisition data when you interface with our runtime marketplace. By initiating a download sequence, you agree to the practices described. All transactions and operator IDs are securely routed through external encrypted gateways, and injections are strictly compiled and distributed upon verification.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-terminal text-white/30 uppercase tracking-widest gap-4">
            <p>© {new Date().getFullYear()} Radiance.1n Network. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Runtime Terms</a>
              <a href="#" className="hover:text-white transition-colors">Abort Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* RENDER MODAL */}
      {selectedInject && (
        <CheckoutModal 
          inject={selectedInject} 
          onClose={() => setSelectedInject(null)} 
        />
      )}
    </div>
  );
}
