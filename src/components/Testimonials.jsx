import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Award, Users, Clock, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO at TechFlow",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "This platform transformed our entire workflow. The intuitive design and powerful features helped us increase productivity by 300%. It's simply revolutionary.",
    rating: 5,
    company: "TechFlow Solutions",
    industry: "Technology",
    accent: "from-cyan-400 to-blue-600",
    bgAccent: "from-cyan-500/10 to-blue-600/5"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager at InnovateLab",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Outstanding service and support. The team went above and beyond to ensure our success. I've never experienced such dedication to customer satisfaction.",
    rating: 5,
    company: "InnovateLab",
    industry: "Innovation",
    accent: "from-emerald-400 to-teal-600",
    bgAccent: "from-emerald-500/10 to-teal-600/5"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director at GrowthCo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The results speak for themselves. Within just 3 months, we saw a 250% increase in conversions. This tool is a game-changer for any serious business.",
    rating: 5,
    company: "GrowthCo Marketing",
    industry: "Marketing",
    accent: "from-purple-400 to-violet-600",
    bgAccent: "from-purple-500/10 to-violet-600/5"
  },
  {
    id: 4,
    name: "David Kim",
    position: "CTO at DataVision",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Exceptional technology with seamless integration. The API documentation is crystal clear, and the performance is unmatched. Highly recommended!",
    rating: 5,
    company: "DataVision Analytics",
    industry: "Data Analytics",
    accent: "from-rose-400 to-pink-600",
    bgAccent: "from-rose-500/10 to-pink-600/5"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Founder at StartupHub",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    content: "From day one, this solution exceeded our expectations. The user experience is flawless, and the customer support team is incredibly responsive and knowledgeable.",
    rating: 5,
    company: "StartupHub Ventures",
    industry: "Startup",
    accent: "from-amber-400 to-orange-600",
    bgAccent: "from-amber-500/10 to-orange-600/5"
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  })
};

const FloatingParticle = ({ delay = 0, color = "slate" }) => {
  const colorClass = {
    slate: "bg-slate-400/20",
    purple: "bg-purple-400/20",
    blue: "bg-blue-400/20",
    emerald: "bg-emerald-400/20"
  }[color];

  return (
    <div
      className={`absolute w-1 h-1 ${colorClass} rounded-full opacity-60`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    />
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlay || isTransitioning) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className={`relative py-12 sm:py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${!isVisible ? 'hidden' : ''}`} 
      id="testimonials"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, rgba(148, 163, 184, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(148, 163, 184, 0.05) 0%, transparent 50%)`,
               backgroundSize: '400px 400px'
             }} />
      </div>

      {/* Gentle Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.5} 
          color={["slate", "purple", "blue", "emerald"][i % 4]}
        />
      ))}

      {/* Soft Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-4 sm:mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Client Testimonials</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">What Clients Say</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what clients have to say about their experiences working with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group hover:transform hover:scale-105">
                    {/* Quote Icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-purple-400 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v8H6v-8h4zm12 0v8h-4v-8h4zm-11 8v6H7c-1.657 0-3-1.343-3-3v-3h4zm12 0v6h-4c-1.657 0-3-1.343-3-3v-3h4z"/>
                  </svg>
                    </div>

                {/* Testimonial Content */}
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                        {testimonial.content}
                      </p>
                
                {/* Client Info */}
                <div className="flex items-center">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                    <div className="absolute inset-0 ring-2 ring-purple-500/20 rounded-full"></div>
                      </div>
                      <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">
                          {testimonial.name}
                        </h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                          {testimonial.position}
                        </p>
                  </div>
                </div>
          </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;