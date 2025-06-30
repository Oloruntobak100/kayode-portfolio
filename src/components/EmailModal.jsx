import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Common country codes
const countryCodes = [
  { code: '+234', country: 'NG' },
  { code: '+1', country: 'US' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  { code: '+27', country: 'SA' },
  { code: '+254', country: 'KE' },
  { code: '+233', country: 'GH' },
  { code: '+251', country: 'ET' },
  { code: '+256', country: 'UG' },
  { code: '+255', country: 'TZ' },
]

const EmailModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+234', // Default to Nigeria
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSuccessClose = () => {
    setStatus('idle')
    setFormData({ name: '', email: '', countryCode: '+234', phone: '', message: '' })
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Format phone number by combining country code (removing '+') with phone number
    const formattedData = {
      ...formData,
      phone: formData.phone ? `${formData.countryCode.replace('+', '')}${formData.phone.replace(/\s+/g, '')}` : ''
    }

    try {
      const response = await fetch('https://sbbsn.app.n8n.cloud/webhook/kayode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) throw new Error('Failed to send')
      
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 sm:px-8 py-6 sm:py-10 text-white text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 tracking-tight">Let's Connect!</h3>
                <p className="text-blue-100 text-base sm:text-lg">Fill in your details and I'll get back to you soon.</p>
              </motion.div>
              
              {/* Floating elements */}
              <div className="absolute top-4 left-4 w-4 sm:w-6 h-4 sm:h-6 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-3 sm:w-4 h-3 sm:h-4 bg-white/30 rounded-full animate-pulse delay-1000"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-all duration-200 hover:scale-110 hover:rotate-90 bg-white/10 rounded-full p-1.5 sm:p-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="relative p-4 sm:p-8 space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                  name="name"
                    required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                  name="email"
                    required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                    />
                  </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                  </label>
                  <textarea
                    id="message"
                  name="message"
                    required
                    rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
              >
                {/* Button gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className={`relative z-10 transition-all duration-200 ${status === 'loading' ? 'opacity-0' : 'opacity-100'}`}>
                  Send Message ✨
                </span>
                
                {/* Loading spinner */}
                {status === 'loading' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </motion.button>

              {/* Error message */}
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs sm:text-sm text-center bg-red-50 py-2 sm:py-3 px-3 sm:px-4 rounded-lg"
                >
                  Oops! Something went wrong. Please try again. 🤔
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
              className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl p-6 sm:p-10 text-center max-w-[95%] sm:max-w-lg mx-auto relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [360, 180, 0],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                />
              </div>

              {/* Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 2) * 20}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={handleSuccessClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Big Cartoon Smiley Face with Thumbs Up */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.1, 1],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  times: [0, 0.6, 1],
                  type: "spring",
                  bounce: 0.6
                }}
                className="mb-8 relative"
              >
                <div className="relative w-40 h-40 mx-auto">
                  {/* Main face */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-2xl border-4 border-yellow-400"></div>
                  
                  {/* Face highlight */}
                  <div className="absolute top-4 left-8 w-12 h-8 bg-yellow-200 rounded-full opacity-70"></div>
                  
                  {/* Eyes */}
                  <motion.div
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute top-12 left-12 w-6 h-6 bg-black rounded-full"
                  />
                  <div className="absolute top-12 right-12 w-6 h-6 bg-black rounded-full"></div>
                  
                  {/* Smile */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-8 border-4 border-black border-t-0 rounded-b-full"></div>
                  
                  {/* Thumbs up */}
                  <motion.div
                    animate={{ 
                      rotate: [-10, 10, -10],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -right-8 top-4 text-6xl"
                  >
                    👍
                  </motion.div>
                </div>
              </motion.div>

              {/* Success message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative z-10"
              >
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Thank you for reaching out!
                </motion.h3>
                <p className="text-gray-600 text-xl leading-relaxed mb-8">
                  Your message is received. I will reach out to you shortly! 🚀
                </p>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={handleSuccessClose}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Awesome! 🎉</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}

export default EmailModal