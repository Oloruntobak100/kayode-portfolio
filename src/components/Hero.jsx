import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import EmailModal from './EmailModal'
import profileImage from '../assets/profile.jpg'

const TypewriterText = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Define an array of gradient combinations
  const gradients = [
    'from-primary-400 to-primary-600',
    'from-emerald-400 to-blue-600',
    'from-purple-400 to-pink-600',
    'from-amber-400 to-red-600',
    'from-cyan-400 to-indigo-600'
  ]

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100
    const deletingSpeed = 50
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

  return (
    <div className="relative">
      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradients[currentWordIndex % gradients.length]} relative`}>
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="ml-1 inline-block"
        >
          |
        </motion.span>
      </span>
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

  useEffect(() => {
    // Generate random nodes
    const newNodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 1
    }))
    setNodes(newNodes)

    // Generate connections between nearby nodes
    const newConnections = []
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const dx = newNodes[i].x - newNodes[j].x
        const dy = newNodes[i].y - newNodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          newConnections.push({ from: i, to: j })
        }
      }
    }
    setConnections(newConnections)
  }, [])

  const handleMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 via-primary-800/10 to-primary-700/20" />
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, i) => {
          const from = nodes[connection.from]
          const to = nodes[connection.to]
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="0.5"
            />
          )
        })}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.radius}
            fill="rgba(99, 102, 241, 0.5)"
            initial={false}
            animate={{
              x: mouseX.get() ? (node.x - mouseX.get()) * 0.05 : 0,
              y: mouseY.get() ? (node.y - mouseY.get()) * 0.05 : 0
            }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          />
        ))}
      </svg>
    </div>
  )
}

const Hero = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const typingWords = [
    "Automation",
    "Landing Page Design",
    "Web Development",
    "Email Marketing"
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
                  Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary-400 to-purple-400">Kayode Daniel</span> an expert in
                </h1>
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
                As a versatile developer and designer, I bring ideas to life through clean code and stunning visuals. With expertise in automation and web development, I create seamless digital experiences that drive results. My passion lies in crafting efficient solutions that help businesses thrive in the digital landscape.
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full filter blur-3xl animate-pulse"></div>
              </div>

              {/* Profile Image Container */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[450px] h-[450px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
              >
                <img
                  src={profileImage}
                  alt="Kayode Daniel - Professional Profile"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    console.error('Error loading profile image')
                    e.target.src = 'https://via.placeholder.com/450x450'
                  }}
                />
                
                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 mix-blend-overlay"></div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute w-full h-full">
                <div className="absolute top-10 right-10 w-20 h-20 bg-primary-400/20 rounded-full animate-float"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary-400/20 rounded-full animate-float-delay"></div>
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