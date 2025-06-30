import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Award, Users, Clock, Sparkles, TrendingUp, Zap } from 'lucide-react';

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

export default function EnhancedTestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-xl rounded-full px-8 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90 font-semibold tracking-wide">Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-white/80 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </span>
          </h2>

          <p className="text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of visionaries who've revolutionized their business with our cutting-edge solutions
          </p>
        </div>

        {/* Enhanced Testimonial Slider */}
        <div 
          className="relative mb-16 mx-auto max-w-[1000px] min-h-[400px]"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between z-30">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="relative -left-6 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-xl rounded-full p-3 border border-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="relative -right-6 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-xl rounded-full p-3 border border-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (currentIndex + 1) % testimonials.length;
              
              let position = "opacity-0 translate-x-full";
              if (isActive) position = "opacity-100 translate-x-0";
              else if (isPrev) position = "opacity-0 -translate-x-full";
              else if (isNext) position = "opacity-0 translate-x-full";

              return (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 w-full transition-all duration-500 ease-out ${position}`}
                  style={{ 
                    zIndex: isActive ? 20 : 10
                  }}
                >
                  <div className="bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl">
                    {/* Industry Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-slate-700/50 rounded-full px-4 py-2 text-sm text-white/90 font-medium border border-white/10">
                        {testimonial.industry}
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="inline-flex p-3 rounded-xl bg-slate-700/50">
                        <Quote className="w-6 h-6 text-white/80" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <p className="text-white/90 text-sm md:text-base leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>

                    {/* Author Section */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-white font-bold text-base mb-0.5">
                          {testimonial.name}
                        </h4>
                        <p className="text-slate-300 text-sm mb-0.5">
                          {testimonial.position}
                        </p>
                        <p className="text-slate-400 text-sm font-medium">
                          {testimonial.company}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="ml-auto flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
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
}