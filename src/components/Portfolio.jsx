import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Code, Palette, Mail, ArrowRight, Star, Calendar, Users, Zap, Eye, ChevronRight } from 'lucide-react';

// Placeholder images - replace with your actual images
const automationIcon = 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop';

// Sample data - replace with your actual data
const categories = [
  {
    id: 'automation',
    title: 'Automation & Apps Integration',
    description: 'Custom automation workflows and seamless integration solutions for business efficiency.',
    icon: automationIcon,
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    glowColor: 'shadow-cyan-500/30',
    projects: [
      {
        id: 1,
        title: 'Zoom call summary report generation',
        description: 'Used n8n to automate Zoom call reporting by connecting Zoom and Fathom. After a Zoom meeting ends, Fathom generates a summary, which n8n formats and sends as an email attachment to selected recipients.',
        longDescription: 'This comprehensive automation solution eliminates manual data entry and ensures consistency across all your customer touchpoints. Built with enterprise-grade security and scalability in mind.',
        technologies: ['n8n', 'Fathom', 'Zoom', 'Email'],
        features: [
          'Real-time bi-directional sync',
          'Custom field mapping',
          'Error handling and retry mechanisms',
          'Detailed sync logs',
          'Multi-tenant architecture',
          'Advanced security protocols'
        ],
        image: automationIcon,
        demoUrl: 'https://www.awesomescreenshot.com/video/41328729?key=1a2f0fd2d533af5d4b6805e02a494abd',
        githubUrl: 'https://www.awesomescreenshot.com/video/41328729?key=1a2f0fd2d533af5d4b6805e02a494abd',
        status: 'Completed',
        duration: '3 days',
        teamSize: '1 developer'
      },
      {
        id: 2,
        title: 'Automated QuickBooks Report Generation',
        description: 'This automation generates a QuickBooks report based on the selected date range and sends it as an email attachment.',
        longDescription: 'A robust API gateway solution that handles millions of requests daily, providing seamless integration between various e-commerce services while maintaining optimal performance.',
        technologies: ['QuickBooks', 'Google Sheets', 'Make.com'],
        features: [
          'Rate limiting and throttling',
          'Request/response transformation',
          'Real-time analytics',
          'Auto-scaling capabilities',
          'Security middleware',
          'API versioning'
        ],
        image: automationIcon,
        demoUrl: 'https://www.awesomescreenshot.com/video/41414527?key=7ac359df50446c67677d833986ddcb03',
        githubUrl: 'https://www.awesomescreenshot.com/video/41414527?key=7ac359df50446c67677d833986ddcb03',
        status: 'Completed',
        duration: '2 days',
        teamSize: '1 developer'
      },
      {
        id: 3,
        title: 'Automated ID Request via Email & update Spreadsheet',
        description: 'Triggers when the status in Google Sheets is updated. Sends an ID request email, then captures the response and auto-updates the sheet using n8n.',
        longDescription: 'A robust API gateway solution that handles millions of requests daily, providing seamless integration between various e-commerce services while maintaining optimal performance.',
        technologies: ['n8n', 'Google Sheets', 'Gmail'],
        features: [
          'Rate limiting and throttling',
          'Request/response transformation',
          'Real-time analytics',
          'Auto-scaling capabilities',
          'Security middleware',
          'API versioning'
        ],
        image: automationIcon,
        demoUrl: 'https://www.awesomescreenshot.com/video/41329639?key=aacaaad3f47cef612e09c60b6752f61b',
        githubUrl: 'https://www.awesomescreenshot.com/video/41329639?key=aacaaad3f47cef612e09c60b6752f61b',
        status: 'Completed',
        duration: '2 days',
        teamSize: '1 developer'
      },
      {
        id: 4,
        title: 'Business WhatsApp Assistant Chatbot',
        description: 'An automated chatbot that manages customer interactions and support on WhatsApp.',
        longDescription: 'A robust API gateway solution that handles millions of requests daily, providing seamless integration between various e-commerce services while maintaining optimal performance.',
        technologies: ['n8n', 'Google Sheets', 'WhatsApp', 'Gmail', 'Google calendar'],
        features: [
          'Rate limiting and throttling',
          'Request/response transformation',
          'Real-time analytics',
          'Auto-scaling capabilities',
          'Security middleware',
          'API versioning'
        ],
        image: automationIcon,
        demoUrl: 'https://www.awesomescreenshot.com/video/41332014?key=df11935bf9bf739d4c798568dd52efd7',
        githubUrl: 'https://www.awesomescreenshot.com/video/41332014?key=df11935bf9bf739d4c798568dd52efd7',
        status: 'Completed',
        duration: '2 days',
        teamSize: '1 developer'
      },
      {
        id: 5,
        title: 'Social Media Content Scheduler',
        description: 'An automated chatbot that manages customer interactions and support on WhatsApp.',
        longDescription: 'A robust API gateway solution that handles millions of requests daily, providing seamless integration between various e-commerce services while maintaining optimal performance.',
        technologies: ['n8n', 'Google Sheets', 'WhatsApp', 'Gmail', 'Google calendar'],
        features: [
          'Rate limiting and throttling',
          'Request/response transformation',
          'Real-time analytics',
          'Auto-scaling capabilities',
          'Security middleware',
          'API versioning'
        ],
        image: automationIcon,
        demoUrl: 'https://www.awesomescreenshot.com/video/41616864?key=5cba0dc4ae00810876d7a44facbede99',
        githubUrl: 'https://www.awesomescreenshot.com/video/41616864?key=5cba0dc4ae00810876d7a44facbede99',
        status: 'Completed',
        duration: '2 days',
        teamSize: '1 developer'
      },
      {
        id: 6,
        title: 'Social Media Auto Posting',
        description: ' it automatically writes articles, creates images, and posts to LinkedIn and Facebook.',
        longDescription: 'A robust API gateway solution that handles millions of requests daily, providing seamless integration between various e-commerce services while maintaining optimal performance.',
        technologies: ['n8n', 'Google Sheets', 'Facebook', 'LinkedIn'],
        features: [
          'Rate limiting and throttling',
          'Request/response transformation',
          'Real-time analytics',
          'Auto-scaling capabilities',
          'Security middleware',
          'API versioning'
        ],
        image: automationIcon,
        demoUrl: 'https://www.awesomescreenshot.com/video/41618891?key=18778ddbf800b686c00f14b4cf967e4d',
        githubUrl: 'https://www.awesomescreenshot.com/video/41618891?key=18778ddbf800b686c00f14b4cf967e4d',
        status: 'Completed',
        duration: '2 days',
        teamSize: '1 developer'
      }
    ]
  }
];

const iconMap = {
  'automation': Code
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedProject(null);
  };

  const handleLinkClick = (url, e) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden min-h-screen">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <FloatingParticles />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                My
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ml-4 relative">
                Portfolio
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-20 animate-pulse"></div>
              </span>
            </h2>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Dive into a world of innovative solutions and creative excellence. 
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-medium"> Each project tells a story of passion and precision.</span>
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500 animate-pulse"></div>
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.id];
            const isHovered = hoveredCard === category.id;
            
            return (
              <div
                key={category.id}
                className={`group cursor-pointer transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 transition-all duration-500 hover:border-white/40 hover:shadow-2xl ${category.glowColor} group-hover:bg-white/10`}>
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl`}></div>
                  
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={category.icon} 
                      alt={category.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    
                    {/* Animated Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Animated Elements */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
                      <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-cyan-400/80 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-purple-400/80 rounded-full animate-bounce"></div>
                    </div>
                    
                    {/* Floating Icon */}
                    <div className={`absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center transition-all duration-500 border border-white/20 group-hover:scale-110 group-hover:rotate-3 ${isHovered ? 'animate-pulse' : ''}`}>
                      <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>

                    {/* Enhanced Project Count Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-lg rounded-xl px-3 py-1.5 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <span className="text-white text-sm font-bold flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {category.projects.length} Projects
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 mb-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-sm">
                      {category.description}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {category.projects[0].technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 bg-gradient-to-r ${category.gradient} bg-opacity-20 rounded-full text-xs text-white font-medium border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                        >
                          {tech}
                        </span>
                      ))}
                      {category.projects[0].technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70 font-medium border border-white/20">
                          +{category.projects[0].technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between group-hover:transform group-hover:translate-x-2 transition-transform duration-300 mb-[30px] pb-[30px]">
                      <span className={`text-sm font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                        Explore Projects
                      </span>
                      <div className="flex items-center gap-1.5">
                        <ChevronRight className={`w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300`} />
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${category.gradient} rounded-full animate-pulse`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portfolio Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-7xl max-h-[98vh] sm:max-h-[95vh] overflow-y-auto animate-in slide-in-from-bottom-12 duration-700 border border-white/20 shadow-2xl">
            
            {/* Enhanced Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-2xl p-4 sm:p-8 border-b border-white/20 flex items-center justify-between z-10 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex items-center gap-4 sm:gap-8">
                <div className={`w-12 h-12 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${selectedCategory.gradient} flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  {React.createElement(iconMap[selectedCategory.id], { className: "w-6 h-6 sm:w-10 sm:h-10 text-white drop-shadow-lg relative z-10" })}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-sm sm:text-xl text-gray-400 flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
                    {selectedCategory.projects.length} Premium Projects
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-bounce" />
                  </p>
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={closeModal}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group backdrop-blur-sm border border-white/20"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {selectedCategory.projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-3xl overflow-hidden border border-white/20 hover:border-blue-400/50 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transform-gpu backdrop-blur-lg"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div 
                      className="relative h-36 sm:h-48 overflow-hidden"
                      onClick={(e) => handleLinkClick(project.demoUrl, e)}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                        <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold backdrop-blur-lg border ${
                          project.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-300 border-green-400/40' 
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40'
                        } shadow-xl`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{project.title}</h4>
                      <p className="text-sm sm:text-base text-gray-400 mb-4">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs sm:text-sm bg-white/10 rounded-full text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-60 flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-6xl max-h-[98vh] sm:max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-8 duration-500 border border-white/20 shadow-2xl">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-800/98 to-slate-900/98 backdrop-blur-2xl p-4 sm:p-8 border-b border-white/20 flex items-center justify-between rounded-t-2xl sm:rounded-t-3xl">
              <h3 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {selectedProject.title}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group backdrop-blur-sm border border-white/20"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Project Content */}
            <div className="p-4 sm:p-8">
              {/* Project details here */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;