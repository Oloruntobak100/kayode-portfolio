import React, { useState, useEffect } from 'react';
import { Bot, Globe, Database, Rocket, Mail, Zap, ArrowRight, Sparkles, Code, Target } from 'lucide-react';
import EmailModal from './EmailModal';

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Automation with n8n",
      description: "Transform your workflow with intelligent automation. Connect apps, sync data, and eliminate repetitive tasks with custom n8n workflows.",
      icon: Bot,
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      glowColor: "shadow-violet-500/25",
      ctaText: "Automate Now",
      features: []
    },
    {
      id: 2,
      title: "Landing Page Design",
      description: "High-converting landing pages that captivate visitors and drive results. Modern design meets conversion optimization.",
      icon: Globe,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      glowColor: "shadow-emerald-500/25",
      ctaText: "Get Design",
      features: []
    },
    {
      id: 3,
      title: "Web Scraping",
      description: "Extract valuable data from any website with precision. Scalable scraping solutions for business intelligence and research.",
      icon: Database,
      gradient: "from-orange-500 via-red-500 to-pink-500",
      glowColor: "shadow-orange-500/25",
      ctaText: "Start Scraping",
      features: []
    },
    {
      id: 4,
      title: "Full SAAS Development",
      description: "Complete SAAS applications with n8n as backend. From concept to deployment, build scalable cloud solutions.",
      icon: Rocket,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      glowColor: "shadow-blue-500/25",
      ctaText: "Build SAAS",
      features: []
    },
    {
      id: 5,
      title: "Email Marketing & Campaigns",
      description: "Powerful email marketing automation using n8n. Create, send, and track campaigns that convert prospects into customers.",
      icon: Mail,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      glowColor: "shadow-pink-500/25",
      ctaText: "Launch Campaign",
      features: []
    },
    {
      id: 6,
      title: "Apps Integration",
      description: "Seamlessly connect your favorite tools and platforms. Create unified workflows that sync data across all your applications.",
      icon: Zap,
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      glowColor: "shadow-amber-500/25",
      ctaText: "Integrate Apps",
      features: []
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-4000"></div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Premium Services</span>
          </div>
          
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Empowering Your</span>{' '}
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">Digital Solutions</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge solutions that propel your business forward with innovative automation, 
            stunning design, and powerful integrations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;
            
            return (
              <div
                key={service.id}
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <div className={`
                  relative h-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10
                  transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
                  ${isHovered ? `shadow-2xl ${service.glowColor}` : 'shadow-lg'}
                  group-hover:bg-white/10
                `}>
                  {/* Gradient Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}></div>
                  
                  {/* Icon */}
                  <div className={`relative mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-3 shadow-lg ${service.glowColor}`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={() => setIsEmailModalOpen(true)}
                      className={`
                      relative w-full px-6 py-3 rounded-xl font-semibold text-white
                      bg-gradient-to-r ${service.gradient}
                      transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                      ${service.glowColor}
                      group-hover:shadow-xl
                      overflow-hidden
                    `}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {service.ctaText}
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                      </span>
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>

                  {/* Floating elements */}
                  <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r ${service.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 animate-pulse`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-gray-300 mb-8 text-lg">
            Ready to elevate your business with premium solutions?
          </p>
          <button 
            onClick={() => setIsEmailModalOpen(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-bold text-white text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <Target className="w-5 h-5" />
              Let's Build Something Amazing
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </section>
  );
};

export default ServicesSection;