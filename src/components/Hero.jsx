import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import EmailModal from './EmailModal'
import profileImage from '../assets/profile.jpg'

const TypewriterText = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [particles, setParticles] = useState([])
  const containerRef = useRef(null)

  // Define an array of gradient combinations with more vibrant colors
  const gradients = [
    'from-blue-400 to-cyan-400',
    'from-emerald-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-amber-400 to-red-500',
    'from-cyan-400 to-indigo-500'
  ]

  // Generate random particles
  useEffect(() => {
    if (containerRef.current) {
      const newParticles = Array.from({ length: 15 }, () => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 8 + 3,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.1
      }))
      setParticles(newParticles)
    }
  }, [currentWordIndex])

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80
    const deletingSpeed = 30
    const wordChangeDelay = 2000

    const type = () => {
      const currentWord = words[currentWordIndex]
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      } else {
        setCurrentText(currentWord.slice(0, currentText.length + 1))
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), wordChangeDelay)
        }
      }
    }

    const timer = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, words])

  // Spring animation for text scaling
  const scale = useSpring(1, {
    stiffness: 300,
    damping: 10
  })

  useEffect(() => {
    // Subtle pop effect when word changes
    if (currentText === '') {
      scale.set(1.05)
      setTimeout(() => scale.set(1), 200)
    }
  }, [currentWordIndex, scale])

  return (
    <div className="relative" ref={containerRef}>
      <motion.div
        style={{ scale }}
        className="relative inline-block"
      >
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradients[currentWordIndex % gradients.length]} relative`}>
          {currentText}
          <AnimatePresence>
            <motion.span
              key={`cursor-${currentWordIndex}`}
              initial={{ opacity: 1, height: '1.2em' }}
              animate={{ 
                opacity: [1, 0.5, 1],
                scaleY: [1, 1.1, 1]
              }}
              transition={{ 
                opacity: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
                scaleY: { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
              }}
              className="ml-1 inline-block w-[3px] bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"
              style={{ marginBottom: '-4px' }}
            >
              &nbsp;
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>
      
      {/* Floating particles around text */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 20 - 10)}%`],
            y: [`${particle.y}%`, `${particle.y - 20}%`],
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          className="absolute rounded-full"
          style={{ 
            width: particle.size,
            height: particle.size,
            background: `linear-gradient(to right, ${currentWordIndex % 2 === 0 ? '#60a5fa' : '#34d399'}, ${currentWordIndex % 2 === 0 ? '#34d399' : '#f472b6'})`,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  )
}

const FloatingSVG = () => (
  <motion.div
    animate={{
      y: [0, -30, 0],
      x: [0, 25, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
    className="w-full h-full scale-150"
  >
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M39,-65.2C46.9,-55.9,47.1,-39.2,51.7,-25.8C56.3,-12.4,65.3,-2.2,67.6,9.5C69.9,21.2,65.5,34.4,57.1,44.7C48.7,55,36.3,62.3,23.1,65.9C9.9,69.5,-4.2,69.3,-19.9,67.7C-35.6,66.2,-52.9,63.3,-63.5,53.2C-74.1,43.1,-78,25.8,-77.8,9.3C-77.6,-7.2,-73.3,-22.9,-65.6,-36.4C-57.9,-49.9,-46.8,-61.2,-34,-67.1C-21.2,-73,-10.6,-73.5,2.3,-77.3C15.2,-81.1,30.4,-88.2,39,-65.2Z"
        transform="translate(250 250) scale(3.5)"
        fill="url(#gradient)"
        filter="url(#glow)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="250 250; 252 248; 250 250"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </motion.div>
)

const NetworkBackground = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const ref = useRef(null)
  const [nodes, setNodes] = useState([])
  const [connections, setConnections] = useState([])
  const [activeNode, setActiveNode] = useState(null)
  const springConfig = { stiffness: 100, damping: 30 }
  
  // Create smooth motion values
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Generate random nodes with more variety
    const newNodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? 
        'rgba(56, 189, 248, 0.7)' : 
        Math.random() > 0.5 ? 
          'rgba(99, 102, 241, 0.5)' : 
          'rgba(139, 92, 246, 0.5)'
    }))
    setNodes(newNodes)

    // Generate connections between nearby nodes
    const newConnections = []
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const dx = newNodes[i].x - newNodes[j].x
        const dy = newNodes[i].y - newNodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150) {
          newConnections.push({ 
            from: i, 
            to: j,
            distance,
            active: false,
            opacity: Math.max(0.05, 1 - distance / 150)
          })
        }
      }
    }
    setConnections(newConnections)

    // Animation loop for subtle node movement
    let animationFrameId;
    const animate = () => {
      setNodes(prevNodes => 
        prevNodes.map(node => {
          // Move nodes in a circular pattern
          const newAngle = node.angle + 0.002 * node.speed
          const radius = 1; // Small movement radius
          const dx = Math.cos(newAngle) * radius
          const dy = Math.sin(newAngle) * radius
          
          return {
            ...node,
            x: node.x + dx,
            y: node.y + dy,
            angle: newAngle
          }
        })
      )
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const handleMouseMove = (event) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    
    // Find active node based on mouse proximity
    const mouseRadius = 150
    let closestNode = null
    let minDistance = mouseRadius
    
    nodes.forEach((node, index) => {
      const dx = node.x - x
      const dy = node.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < minDistance) {
        minDistance = distance
        closestNode = index
      }
    })
    
    setActiveNode(closestNode)
  }

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 via-primary-800/20 to-primary-700/30" />
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </radialGradient>
        </defs>
        
        {connections.map((connection, i) => {
          const from = nodes[connection.from]
          const to = nodes[connection.to]
          const isActive = activeNode === connection.from || activeNode === connection.to
          
          return (
            <motion.line
              key={i}
              x1={from?.x}
              y1={from?.y}
              x2={to?.x}
              y2={to?.y}
              stroke={isActive ? "rgba(56, 189, 248, 0.4)" : `rgba(99, 102, 241, ${connection.opacity})`}
              strokeWidth={isActive ? "1" : "0.5"}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive ? 0.8 : connection.opacity,
                strokeWidth: isActive ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
        
        {nodes.map((node, i) => {
          const isActive = i === activeNode
          const distToMouse = mouseX.get() && mouseY.get() ? 
            Math.sqrt(
              Math.pow(node.x - mouseX.get(), 2) + 
              Math.pow(node.y - mouseY.get(), 2)
            ) : Infinity
          
          const influence = Math.max(0, 1 - distToMouse / 200) * 0.3
          
          return (
            <motion.circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={isActive ? node.radius * 2 : node.radius}
              fill={isActive ? "rgba(56, 189, 248, 0.8)" : node.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                scale: isActive ? 1.5 : 1,
                x: smoothMouseX.get() ? (node.x - smoothMouseX.get()) * influence : 0,
                y: smoothMouseY.get() ? (node.y - smoothMouseY.get()) * influence : 0
              }}
              transition={{ 
                type: "spring", 
                stiffness: isActive ? 100 : 50, 
                damping: isActive ? 5 : 10,
                opacity: { duration: 0.3 }
              }}
            />
          )
        })}
        
        {/* Mouse glow effect */}
        {mouseX.get() && mouseY.get() && (
          <motion.circle
            cx={smoothMouseX}
            cy={smoothMouseY}
            r={100}
            fill="url(#nodeGradient)"
            opacity={0.15}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </svg>
    </div>
  )
}

const Hero = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const typingWords = [
    "Automate with n8n",
    "Build flows in Make & Zapier",
    "Design with React & Tailwind",
    "Craft high-converting landing pages",
    "Run smarter email campaigns",
    "Deliver clean, modern UI/UX"
  ]

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-900/20 to-neutral-900">
        {/* Interactive Network Background */}
        <NetworkBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                  Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">Kayode Daniel</span>
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">
                  I automate your business & build beautiful web experiences.
                </h2>
                <div className="text-3xl lg:text-4xl font-bold relative">
                  <TypewriterText words={typingWords} />
                </div>
              </motion.div>

              {/* About Me */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-white/90 leading-relaxed"
              >
                Expert in no-code automation with n8n, Make, Zapier — plus sleek websites using React, Tailwind, and modern email marketing.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
                >
                  Contact Me
                  <motion.svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </motion.svg>
                </button>
                <a
                  href="#portfolio"
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-primary-200 flex items-center justify-center group"
                  onClick={(e) => {
                    e.preventDefault();
                    const portfolioSection = document.querySelector('#portfolio');
                    if (portfolioSection) {
                      portfolioSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Projects
                  <motion.svg
                    className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </motion.svg>
                </a>
              </motion.div>
            </div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full h-[600px] flex items-center justify-center"
            >
              {/* Animated Background Shape */}
              <div className="absolute w-[120%] h-[120%] animate-blob-spin">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/30 via-blue-500/20 to-secondary-400/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
              </div>

              {/* Profile Image Container */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-[450px] h-[450px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl group"
              >
                {/* Orbital rings */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-[-10px] border-2 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute inset-[-20px] border-2 border-cyan-400/10 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-[-30px] border-2 border-indigo-400/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
                </div>
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 animate-spin opacity-30" style={{ animationDuration: '8s' }}></div>
                
                <img
                  src={profileImage}
                  alt="Kayode Daniel - Professional Profile"
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Error loading profile image')
                    e.target.src = 'https://via.placeholder.com/450x450'
                  }}
                />
                
                {/* Glowing Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-blue-500/20 to-secondary-500/20 mix-blend-overlay"
                  animate={{
                    background: [
                      'linear-gradient(to top right, rgba(14, 165, 233, 0.2), rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))',
                      'linear-gradient(to top right, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2), rgba(14, 165, 233, 0.2))',
                      'linear-gradient(to top right, rgba(139, 92, 246, 0.2), rgba(14, 165, 233, 0.2), rgba(56, 189, 248, 0.2))'
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 opacity-30 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer"
                ></motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute w-full h-full">
                {/* Floating orbs */}
                <motion.div 
                  className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-md"
                  animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-md"
                  animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-40 right-20 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-md"
                  animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                ></motion.div>
                
                {/* Glowing dots */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-glow"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{ 
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </>
  )
}

export default Hero