import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const sections = [
  { 
    id: 'hero', 
    label: 'Home',
    color: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    id: 'services', 
    label: 'Services',
    color: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    id: 'portfolio', 
    label: 'Portfolio',
    color: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    id: 'testimonials', 
    label: 'Testimonials',
    color: 'from-orange-500 to-red-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  { 
    id: 'contact', 
    label: 'Contact',
    color: 'from-violet-500 to-purple-500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

const TopNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 100], [0, -10]);
  const navOpacity = useTransform(scrollY, [0, 50, 100], [1, 0.8, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => {
        const element = document.getElementById(section.id);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        return {
          id: section.id,
          progress: Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight)))
        };
      }).filter(Boolean);

      const mostVisible = sectionElements.reduce((prev, current) => {
        return current.progress > prev.progress ? current : prev;
      }, sectionElements[0]);

      if (mostVisible && mostVisible.progress > 0.3) {
        setActiveSection(mostVisible.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;

    const easeInOutQuart = (t) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    };

    const animation = (currentTime) => {
      if (!start) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo({
        top: startPosition + distance * easeInOutQuart(progress),
        behavior: 'auto'
      });

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="w-full bg-black/90 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mr-3">
                KD
                {/* Online status indicator */}
                <div className="absolute -top-1 right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Kayode Daniel</h1>
              <p className="text-cyan-400 text-sm">Digital Craftsman</p>
            </div>
          </div>

          {/* Navigation */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <div key={section.id} className="relative">
                      <motion.button
                        onClick={() => smoothScrollTo(section.id)}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                          isActive 
                            ? 'text-white' 
                            : 'text-white/60 hover:text-white/80'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeBackground"
                            className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-full shadow-lg`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          {section.icon}
                          <span className="hidden sm:inline">{section.label}</span>
                        </span>
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopNav; 