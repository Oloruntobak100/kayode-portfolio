import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import TopNav from './components/TopNav'

// Page transition component
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 0.8,
    }}
  >
    {children}
  </motion.div>
);

// Reusable section wrapper with scroll animations
const AnimatedSection = ({ children, id }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 50,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-5 h-5 rounded-full bg-cyan-500"
              animate={{
                y: [-20, 0, -20],
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0,
              }}
            />
            <motion.div
              className="w-5 h-5 rounded-full bg-purple-500"
              animate={{
                y: [-20, 0, -20],
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-5 h-5 rounded-full bg-blue-500"
              animate={{
                y: [-20, 0, -20],
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.4,
              }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black min-h-screen"
        >
          <TopNav />
          <PageTransition>
            <main className="relative">
              <AnimatedSection id="hero">
                <Hero />
              </AnimatedSection>

              <AnimatedSection id="services">
                <Services />
              </AnimatedSection>

              <AnimatedSection id="portfolio">
                <Portfolio />
              </AnimatedSection>

              <AnimatedSection id="testimonials">
                <Testimonials />
              </AnimatedSection>

              <AnimatedSection id="contact">
                <CallToAction />
              </AnimatedSection>

              <Footer />
            </main>
          </PageTransition>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
