import { useState, useEffect } from 'react';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      id="contact"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: '10%',
            top: '20%',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-emerald-500/15 to-blue-500/15 rounded-full blur-3xl"
          style={{
            right: '15%',
            bottom: '25%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        
        {/* Interactive mouse follower */}
        <div
          className="absolute w-80 h-80 bg-gradient-radial from-white/5 to-transparent rounded-full pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 160,
            top: mousePosition.y - 160,
            opacity: 0.6,
          }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl text-white text-sm font-semibold border border-slate-600/30 shadow-xl">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
              Available for New Projects
            </span>
          </div>

          {/* Main heading with gradient text */}
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            <span className="text-white">Let's Build </span>
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              Something Epic
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your vision into a digital masterpiece with cutting-edge design, 
            seamless functionality, and innovative solutions that drive results.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`transform transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {/* Primary CTA */}
            <a
              href="https://calendly.com/kaytoba49/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center">
                Schedule Discovery Call
                <svg
                  className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span>Usually responds within 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Free initial consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>100% satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;