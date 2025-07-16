'use client'; // This directive is needed for Next.js 13+ App Router

import React, { useState, useEffect, useRef } from 'react';
import { animeList } from '../data/animeData.js';
import { webtoonList } from '../data/webtoonData.js';

// Helper component for SVG icons
const Icon = ({ id, className, ...props }) => {
  const icons = {
    search: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    menu: (
       <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
    close: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    x: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    sparkles: (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M9.315 7.584C11.173 6.244 12.83 3 12.83 3s1.657 3.244 3.515 4.584c1.858 1.34 5.085 2.002 5.085 2.002s-3.227.662-5.085 2.002C14.487 13.927 12.83 17.17 12.83 17.17s-1.657-3.243-3.515-4.584C7.457 11.244 4.23 10.586 4.23 10.586s3.227-.662 5.085-2.002zM5.64 18.356c1.24-1.122 2.21-3.038 2.21-3.038s-1.033-1.916-2.21-3.038c-1.178-1.122-3.334-1.636-3.334-1.636s2.156-.514 3.334-1.636c1.178-1.122 2.21-3.038 2.21-3.038s-1.033-1.916-2.21-3.038C4.46 1.74 2.304 2.254 2.304 2.254s2.156.514 3.334 1.636c1.178 1.122 2.21 3.038 2.21 3.038s-1.033 1.916-2.21 3.038c-1.178 1.122-3.334 1.636-3.334 1.636s2.156.514 3.334 1.636z" clipRule="evenodd" />
        </svg>
    ),
    user: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    lock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    bookmark: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    pencil: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    shopping: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    play: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    heart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    chevronUp: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ),
    'chevron-up': (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ),
    refresh: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2M15 15v4h.582A8.001 8.001 0 0019.418 15H15z" />
      </svg>
    ),
    shuffle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6L6 18M6 6l12 12" />
      </svg>
    )
  };
  return icons[id] || null;
};

// Preloader Component
const Preloader = ({ isVisible }) => {
  return (
    <div 
      className={`fixed inset-0 bg-[#0D0D0D] z-[100] flex items-center justify-center transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="text-4xl md:text-6xl font-bold tracking-wider animate-logoPulse">
        ANI<span className="text-[#00FFFF]">O</span>MICS
      </div>
      <style>{`
        @keyframes customPulse { 0%, 100% { transform: scale(1); text-shadow: 0 0 15px rgba(0, 255, 255, 0.4); } 50% { transform: scale(1.05); text-shadow: 0 0 30px rgba(0, 255, 255, 0.8); } }
        .animate-logoPulse { animation: customPulse 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// Enhanced About Modal Component
const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-3xl p-10 shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent flex items-center gap-3">
                            <Icon id="sparkles" className="w-8 h-8 text-[#00FFFF]"/>
                            About Aniomics
                        </h2>
                        <p className="text-white/60">Your premium anime & comics discovery platform</p>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                        <Icon id="close" className="w-6 h-6"/>
                    </button>
                </div>
                
                <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                    <div className="bg-gradient-to-r from-[#00FFFF]/10 to-transparent p-6 rounded-2xl border-l-4 border-[#00FFFF]">
                        <h3 className="font-bold text-white mb-2">🎯 Our Mission</h3>
                        <p>Revolutionize how anime and webtoon enthusiasts discover, track, and share their favorite content through cutting-edge technology and real-time data.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <span className="text-xl">📈</span> Live Data
                            </h3>
                            <p className="text-sm">Real-time trending data from AniList and MyAnimeList, updated hourly to keep you informed of the latest popular content.</p>
                        </div>
                        
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <span className="text-xl">🎨</span> Premium Design
                            </h3>
                            <p className="text-sm">Beautiful, modern interface designed for passionate fans who appreciate quality and attention to detail.</p>
                        </div>
                    </div>
                    
                    <div className="text-center pt-6">
                        <p className="text-white/60 mb-6">Join thousands of anime and webtoon enthusiasts worldwide</p>
                        <div className="flex items-center justify-center gap-8 text-sm text-white/40">
                            <span>Powered by AniList API</span>
                            <span>•</span>
                            <span>MyAnimeList Integration</span>
                            <span>•</span>
                            <span>Real-time Updates</span>
                        </div>
                    </div>
                </div>
                
                <button
                    onClick={onClose}
                    className="w-full mt-8 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold uppercase tracking-wide py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]"
                >
                    Start Exploring
                </button>
            </div>
        </div>
    );
};

// Login Modal Component with integrated Sign Up
const LoginModal = ({ isOpen, onClose, onSwitchToSignup, onLogin }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginMode) {
            // Login logic
            if (formData.email && formData.password) {
                onLogin(formData.email);
                onClose();
                setFormData({ email: '', password: '', confirmPassword: '', name: '' });
            }
        } else {
            // Sign up logic
            if (formData.email && formData.password && formData.confirmPassword && formData.name) {
                if (formData.password === formData.confirmPassword) {
                    onLogin(formData.email); // For demo, treat signup as login
                    onClose();
                    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
                } else {
                    alert('Passwords do not match!');
                }
            }
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-md shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon id="user" className="w-8 h-8 text-black"/>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-white">
                            {isLoginMode ? 'Welcome Back' : 'Join ANIOMICS'}
                        </h2>
                        <p className="text-white/60">
                            {isLoginMode 
                                ? 'Sign in to access your personalized experience'
                                : 'Create your account to start discovering amazing content'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLoginMode && (
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="Enter your full name"
                                    required={!isLoginMode}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Icon id="mail" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                                <Icon id="lock" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"/>
                            </div>
                        </div>

                        {!isLoginMode && (
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                        placeholder="Confirm your password"
                                        required={!isLoginMode}
                                    />
                                    <Icon id="lock" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"/>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]"
                        >
                            {isLoginMode ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="text-[#00FFFF] hover:text-white transition-colors ml-2 font-medium"
                            >
                                {isLoginMode ? 'Sign up here' : 'Sign in here'}
                            </button>
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
                    >
                        <Icon id="close" className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Creator Hub Modal Component
const CreatorHubModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        portfolio: '',
        specialty: '',
        experience: '',
        description: '',
        socialLinks: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (in real app, send to backend)
        console.log('Creator application submitted:', formData);
        alert('Application submitted successfully! We will review and get back to you within 48 hours.');
        onClose();
        setFormData({
            name: '', email: '', portfolio: '', specialty: '', experience: '', description: '', socialLinks: ''
        });
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent flex items-center gap-3">
                                <Icon id="pencil" className="w-8 h-8 text-[#00FFFF]"/>
                                Creator Hub Application
                            </h2>
                            <p className="text-white/60">Apply to become a featured creator on ANIOMICS</p>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <Icon id="close" className="w-6 h-6"/>
                        </button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#00FFFF]/10 to-transparent p-6 rounded-2xl border-l-4 border-[#00FFFF] mb-8">
                        <h3 className="font-bold text-white mb-2">🎨 Join Our Creator Community</h3>
                        <p className="text-white/80">Get featured on our platform, connect with fans, and showcase your amazing anime and webtoon artwork!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    <Icon id="user" className="w-4 h-4 inline mr-2"/>
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    <Icon id="mail" className="w-4 h-4 inline mr-2"/>
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Portfolio URL *
                                </label>
                                <input
                                    type="url"
                                    value={formData.portfolio}
                                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="https://your-portfolio.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Specialty *
                                </label>
                                <select
                                    value={formData.specialty}
                                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    required
                                >
                                    <option value="">Select your specialty</option>
                                    <option value="manga-artist">Manga Artist</option>
                                    <option value="webtoon-artist">Webtoon Artist</option>
                                    <option value="character-designer">Character Designer</option>
                                    <option value="animator">Animator</option>
                                    <option value="writer">Story Writer</option>
                                    <option value="colorist">Colorist</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Years of Experience *
                            </label>
                            <select
                                value={formData.experience}
                                onChange={(e) => handleInputChange('experience', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                required
                            >
                                <option value="">Select experience level</option>
                                <option value="0-1">0-1 years (Beginner)</option>
                                <option value="2-3">2-3 years (Intermediate)</option>
                                <option value="4-5">4-5 years (Advanced)</option>
                                <option value="6+">6+ years (Expert)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                About Your Work *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all h-32 resize-none"
                                placeholder="Tell us about your artistic style, notable works, and what makes your art unique..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Social Media Links
                            </label>
                            <input
                                type="text"
                                value={formData.socialLinks}
                                onChange={(e) => handleInputChange('socialLinks', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                placeholder="Instagram, Twitter, DeviantArt, etc. (comma separated)"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]"
                        >
                            Submit Application
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            Applications are reviewed within 48 hours. Selected creators will be contacted via email.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Marketplace Modal Component
const MarketplaceModal = ({ isOpen, onClose }) => {
    const [artworkData, setArtworkData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        tags: '',
        royalty: '10'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle NFT creation/submission (in real app, integrate with blockchain)
        console.log('NFT artwork submitted:', artworkData);
        alert('Artwork submitted for NFT minting! Your NFT will be available on the marketplace within 24 hours.');
        onClose();
        setArtworkData({
            title: '', description: '', price: '', category: '', imageUrl: '', tags: '', royalty: '10'
        });
    };

    const handleInputChange = (field, value) => {
        setArtworkData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent flex items-center gap-3">
                                <Icon id="shopping" className="w-8 h-8 text-[#00FFFF]"/>
                                Marketplace - Mint NFT
                            </h2>
                            <p className="text-white/60">Create and sell your artwork as NFTs on our marketplace</p>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <Icon id="close" className="w-6 h-6"/>
                        </button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-[#00FFFF]/10 to-transparent p-6 rounded-2xl border-l-4 border-[#00FFFF] mb-8">
                        <h3 className="font-bold text-white mb-2">🎨 Transform Your Art into NFTs</h3>
                        <p className="text-white/80">Showcase and monetize your anime/webtoon artwork through blockchain technology. Set your own royalties and reach global collectors!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Artwork Title *
                                </label>
                                <input
                                    type="text"
                                    value={artworkData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="Give your artwork a title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Price (ETH) *
                                </label>
                                <input
                                    type="number"
                                    step="0.001"
                                    min="0.001"
                                    value={artworkData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="0.1"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Category *
                            </label>
                            <select
                                value={artworkData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                required
                            >
                                <option value="">Select category</option>
                                <option value="anime-art">Anime Art</option>
                                <option value="webtoon-art">Webtoon Art</option>
                                <option value="character-design">Character Design</option>
                                <option value="fan-art">Fan Art</option>
                                <option value="original-art">Original Art</option>
                                <option value="concept-art">Concept Art</option>
                                <option value="digital-art">Digital Art</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Artwork Image URL *
                            </label>
                            <input
                                type="url"
                                value={artworkData.imageUrl}
                                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                placeholder="https://your-image-url.com/artwork.jpg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                Description *
                            </label>
                            <textarea
                                value={artworkData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all h-32 resize-none"
                                placeholder="Describe your artwork, inspiration, techniques used, etc..."
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    value={artworkData.tags}
                                    onChange={(e) => handleInputChange('tags', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    placeholder="anime, manga, digital, portrait (comma separated)"
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Royalty % *
                                </label>
                                <select
                                    value={artworkData.royalty}
                                    onChange={(e) => handleInputChange('royalty', e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all"
                                    required
                                >
                                    <option value="5">5% (Recommended)</option>
                                    <option value="10">10% (Standard)</option>
                                    <option value="15">15% (High)</option>
                                    <option value="20">20% (Maximum)</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <Icon id="star" className="w-4 h-4 text-[#00FFFF]"/>
                                NFT Benefits
                            </h4>
                            <ul className="text-white/70 text-sm space-y-1">
                                <li>• Permanent ownership verification on blockchain</li>
                                <li>• Automated royalty payments on resales</li>
                                <li>• Global marketplace exposure</li>
                                <li>• Creator verification and authenticity</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]"
                        >
                            Mint NFT & List on Marketplace
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            Gas fees and marketplace commission (2.5%) will be calculated at checkout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Library Modal Component
const LibraryModal = ({ isOpen, onClose }) => {
    const [activeLibraryTab, setActiveLibraryTab] = useState('watchlist');
    const [watchlist, setWatchlist] = useState([
        { id: 1, title: "Attack on Titan", type: "anime", status: "watching", progress: "Episode 15/25", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg" },
        { id: 2, title: "Demon Slayer", type: "anime", status: "completed", progress: "Completed", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg" },
        { id: 3, title: "Solo Leveling", type: "webtoon", status: "reading", progress: "Chapter 120/180", image: "https://webtoon-phinf.pstatic.net/20200813_128/1597304985285SAMEl_JPEG/solo_leveling.jpg" }
    ]);
    const [readlist, setReadlist] = useState([
        { id: 4, title: "Tower of God", type: "webtoon", status: "reading", progress: "Chapter 520/ongoing", image: "https://webtoon-phinf.pstatic.net/20181207_73/1544145307987BqzLp_JPEG/tower_of_god.jpg" },
        { id: 5, title: "The God of High School", type: "webtoon", status: "completed", progress: "Completed", image: "https://webtoon-phinf.pstatic.net/20200302_181/1583135557796mQdOO_JPEG/god_of_high_school.jpg" },
        { id: 6, title: "Unordinary", type: "webtoon", status: "paused", progress: "Chapter 280/ongoing", image: "https://webtoon-phinf.pstatic.net/20191104_128/1572833506067j8dYq_JPEG/unordinary.jpg" }
    ]);

    if (!isOpen) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'watching':
            case 'reading': return 'bg-green-500/80';
            case 'completed': return 'bg-blue-500/80';
            case 'paused': return 'bg-yellow-500/80';
            case 'dropped': return 'bg-red-500/80';
            default: return 'bg-gray-500/80';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'watching': return 'Watching';
            case 'reading': return 'Reading';
            case 'completed': return 'Completed';
            case 'paused': return 'On Hold';
            case 'dropped': return 'Dropped';
            default: return status;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent flex items-center gap-3">
                                <Icon id="bookmark" className="w-8 h-8 text-[#00FFFF]"/>
                                My Library
                            </h2>
                            <p className="text-white/60">Track your anime and webtoon progress</p>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <Icon id="close" className="w-6 h-6"/>
                        </button>
                    </div>
                    
                    {/* Library Tab Navigation */}
                    <div className="flex space-x-1 mb-8 bg-white/5 p-2 rounded-2xl">
                        <button
                            onClick={() => setActiveLibraryTab('watchlist')}
                            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                activeLibraryTab === 'watchlist'
                                    ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            Watch List
                        </button>
                        <button
                            onClick={() => setActiveLibraryTab('readlist')}
                            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                activeLibraryTab === 'readlist'
                                    ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            Read List
                        </button>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-[#00FFFF]">
                                {activeLibraryTab === 'watchlist' ? watchlist.filter(item => item.status === 'watching').length : readlist.filter(item => item.status === 'reading').length}
                            </div>
                            <div className="text-white/60 text-sm">{activeLibraryTab === 'watchlist' ? 'Watching' : 'Reading'}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-blue-400">
                                {activeLibraryTab === 'watchlist' ? watchlist.filter(item => item.status === 'completed').length : readlist.filter(item => item.status === 'completed').length}
                            </div>
                            <div className="text-white/60 text-sm">Completed</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-yellow-400">
                                {activeLibraryTab === 'watchlist' ? watchlist.filter(item => item.status === 'paused').length : readlist.filter(item => item.status === 'paused').length}
                            </div>
                            <div className="text-white/60 text-sm">On Hold</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-white">
                                {activeLibraryTab === 'watchlist' ? watchlist.length : readlist.length}
                            </div>
                            <div className="text-white/60 text-sm">Total</div>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="space-y-4">
                        {(activeLibraryTab === 'watchlist' ? watchlist : readlist).map((item) => (
                            <div
                                key={item.id}
                                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-20 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=120&fit=crop&auto=format`;
                                        }}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                                        <p className="text-white/60 text-sm mb-2">{item.progress}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}>
                                                {getStatusText(item.status)}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">
                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                            <Icon id="pencil" className="w-4 h-4 text-white/60"/>
                                        </button>
                                        <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
                                            <Icon id="close" className="w-4 h-4 text-red-400"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add New Item Button */}
                    <div className="mt-6 flex justify-center">
                        <button className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]">
                            + Add to {activeLibraryTab === 'watchlist' ? 'Watch List' : 'Read List'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main App Component
export default function Home() {
  console.log('Home component rendered');
  
  const [activeTab, setActiveTab] = useState('anime');
  const [animeData, setAnimeData] = useState(animeList.slice(0, 6)); // Show first 6 anime
  const [webtoonData, setWebtoonData] = useState(webtoonList.slice(0, 6)); // Show first 6 webtoons
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showMore, setShowMore] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const heroRef = useRef(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showPreloader, setShowPreloader] = useState(true);
  const [creatorHubModalOpen, setCreatorHubModalOpen] = useState(false);
  const [marketplaceModalOpen, setMarketplaceModalOpen] = useState(false);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // API fetching functions
  const fetchAnimeData = async () => {
    try {
      setLoading(true);
      const query = `
        query {
          Page(page: 1, perPage: 20) {
            media(type: ANIME, sort: TRENDING_DESC) {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
                medium
              }
              averageScore
              genres
              status
              seasonYear
              description
              studios {
                nodes {
                  name
                }
              }
              countryOfOrigin
            }
          }
        }
      `;

      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      
      if (data.data) {
        const formattedAnime = data.data.Page.media.map(item => ({
          id: item.id,
          title: item.title.romaji || item.title.english,
          image: item.coverImage.large || item.coverImage.medium,
          rating: item.averageScore ? (item.averageScore / 10).toFixed(1) : '8.5',
          genre: item.genres.slice(0, 3).join(', '),
          year: item.seasonYear || 2024,
          description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description available.',
          studio: item.studios.nodes[0]?.name || 'Unknown Studio',
          status: item.status || 'RELEASING',
          nationality: item.countryOfOrigin === 'JP' ? 'JP' : item.countryOfOrigin === 'KR' ? 'KR' : item.countryOfOrigin === 'CN' ? 'CN' : 'US'
        }));
        
        setAnimeData(formattedAnime);
        setLastUpdated(new Date());
        console.log('✅ Anime data updated from AniList API:', formattedAnime.length, 'items');
      }
    } catch (error) {
      console.error('❌ Error fetching anime data:', error);
      // Fallback to static data on error
    } finally {
      setLoading(false);
    }
  };

  const fetchWebtoonData = async () => {
    try {
      const query = `
        query {
          Page(page: 1, perPage: 20) {
            media(type: MANGA, sort: TRENDING_DESC) {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
                medium
              }
              averageScore
              genres
              status
              startDate {
                year
              }
              description
              staff {
                nodes {
                  name {
                    full
                  }
                }
              }
              countryOfOrigin
            }
          }
        }
      `;

      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      
      if (data.data) {
        const formattedWebtoons = data.data.Page.media.map(item => ({
          id: item.id,
          title: item.title.romaji || item.title.english,
          image: item.coverImage.large || item.coverImage.medium,
          rating: item.averageScore ? (item.averageScore / 10).toFixed(1) : '8.5',
          genre: item.genres.slice(0, 3).join(', '),
          year: item.startDate?.year || 2024,
          description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No description available.',
          author: item.staff.nodes[0]?.name.full || 'Unknown Author',
          status: item.status || 'RELEASING',
          nationality: item.countryOfOrigin === 'KR' ? 'KR' : item.countryOfOrigin === 'JP' ? 'JP' : item.countryOfOrigin === 'CN' ? 'CN' : 'US'
        }));
        
        setWebtoonData(formattedWebtoons);
        setLastUpdated(new Date());
        console.log('✅ Webtoon data updated from AniList API:', formattedWebtoons.length, 'items');
      }
    } catch (error) {
      console.error('❌ Error fetching webtoon data:', error);
      // Fallback to static data on error
    }
  };

  useEffect(() => {
    // Handle preloader
    const preloaderTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 2000);

    // Initial data fetch
    fetchAnimeData();
    fetchWebtoonData();

    // Set up hourly updates (every 3600000ms = 1 hour)
    const updateInterval = setInterval(() => {
      console.log('🔄 Hourly update triggered - fetching latest data...');
      fetchAnimeData();
      fetchWebtoonData();
    }, 3600000); // 1 hour = 60 * 60 * 1000 = 3600000ms

    // Cleanup function
    return () => {
      clearTimeout(preloaderTimer);
      clearInterval(updateInterval);
    };
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleClickOutside = (event) => {
      // Close dropdowns when clicking outside
      if (!event.target.closest('.filter-dropdown')) {
        setShowGenreDropdown(false);
        setShowSortDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Enhanced data filtering and search
  const getFilteredData = () => {
    const currentData = activeTab === 'anime' ? animeList : webtoonList;
    let filtered = currentData;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nationality.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(item =>
        item.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Sort functionality
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      default: // popularity
        // Keep original order
        break;
    }

    return filtered;
  };

  // Get unique genres for filter options
  const getGenres = () => {
    const currentData = activeTab === 'anime' ? animeList : webtoonList;
    const genres = [...new Set(currentData.flatMap(item => 
      item.genre.split(', ').map(g => g.trim())
    ))];
    return genres.sort();
  };

  // Authentication functions
  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Manual refresh function
  const handleManualRefresh = async () => {
    console.log('🔄 Manual refresh triggered');
    await Promise.all([fetchAnimeData(), fetchWebtoonData()]);
  };

  const getCurrentData = () => {
    return getFilteredData();
  };

  const currentData = getCurrentData();

  return (
    <>
      <Preloader isVisible={showPreloader} />
      
      <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#001122] via-[#0D0D0D] to-[#001a33] -z-10"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)] -z-10"></div>
        
        {/* Navigation */}
        <nav className={`relative z-50 px-6 py-6 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${isScrolled ? 'bg-black/60' : 'bg-black/20'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo and Compact Search */}
            <div className="flex items-center gap-6">
              <div className="text-2xl font-bold tracking-wide">
                ANI<span className="text-[#00FFFF]">O</span>MICS
              </div>
              
              {/* Compact Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-white/10 border border-white/20 rounded-xl px-4 py-2 pl-10 text-white placeholder-white/50 focus:border-[#00FFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                  />
                  <Icon id="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"/>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      <Icon id="x" className="w-3 h-3"/>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setLibraryModalOpen(true)}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <Icon id="bookmark" className="w-4 h-4"/>
                Library
              </button>
              <button 
                onClick={() => setCreatorHubModalOpen(true)}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <Icon id="pencil" className="w-4 h-4"/>
                Creator Hub
              </button>
              <button 
                onClick={() => setMarketplaceModalOpen(true)}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <Icon id="shopping" className="w-4 h-4"/>
                Marketplace
              </button>
            </div>
            
            {/* User Profile Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Toggle */}
              <button className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md">
                <Icon id="search" className="w-5 h-5"/>
              </button>
              
              {/* User Profile Button */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <div className="hidden md:flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-2">
                      <Icon id="user" className="w-4 h-4 text-[#00FFFF]"/>
                      <span className="text-sm text-white/80">{userEmail.split('@')[0]}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="hidden md:block bg-red-500/80 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setLoginModalOpen(true)}
                      className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 backdrop-blur-md flex items-center gap-2"
                      title="Login / Sign Up"
                    >
                      <Icon id="user" className="w-5 h-5"/>
                      <span className="hidden md:block text-sm">Profile</span>
                    </button>
                  </div>
                )}
              </div>
              
              <button className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md">
                <Icon id="menu" className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-40 px-6 pt-16 pb-12">
          <div className="max-w-7xl mx-auto text-center">
            {isLoggedIn && (
              <div className="mb-6 bg-gradient-to-r from-[#00FFFF]/10 to-[#0099CC]/10 border border-[#00FFFF]/30 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-[#00FFFF] font-medium">
                  Welcome back, {userEmail.split('@')[0]}! 🎉 Ready to discover your next favorite series?
                </p>
              </div>
            )}
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00FFFF] via-white to-[#0099CC] bg-clip-text text-transparent">
              Discover Amazing
              <br />
              <span className="text-3xl md:text-6xl">Anime & Comics</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              {isLoggedIn 
                ? "Your personalized collection of trending anime and webtoons awaits. Track your favorites and discover new series!"
                : "Explore curated collections of trending anime and webtoons. Your next obsession is just a click away."
              }
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2 inline-flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('anime')}
                  className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 text-sm ${
                    activeTab === 'anime'
                      ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black shadow-lg shadow-[#00FFFF]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Anime
                </button>
                <button
                  onClick={() => setActiveTab('webtoons')}
                  className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 text-sm ${
                    activeTab === 'webtoons'
                      ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black shadow-lg shadow-[#00FFFF]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Comics
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Filter Controls */}
        <section className="relative z-40 px-6 py-8">
          <div className="max-w-7xl mx-auto">            <div className="flex justify-between items-center mb-8">
              {/* Genre Filter Dropdown */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => {
                    setShowGenreDropdown(!showGenreDropdown);
                    setShowSortDropdown(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 text-white transition-all duration-300 flex items-center gap-3 backdrop-blur-md"
                >
                  <span className="text-sm font-medium">
                    Genre: {selectedGenre === 'all' ? 'All Genres' : selectedGenre}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showGenreDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showGenreDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 min-w-[200px] shadow-2xl shadow-black/50 z-50 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedGenre('all');
                        setShowGenreDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                        selectedGenre === 'all'
                          ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-medium'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      All Genres
                    </button>
                    {getGenres().map(genre => (
                      <button
                        key={genre}
                        onClick={() => {
                          setSelectedGenre(genre);
                          setShowGenreDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                          selectedGenre === genre
                            ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-medium'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Controls Dropdown */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    setShowGenreDropdown(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 text-white transition-all duration-300 flex items-center gap-3 backdrop-blur-md"
                >
                  <span className="text-sm font-medium">
                    Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 min-w-[150px] shadow-2xl shadow-black/50 z-50">
                    {[
                      { value: 'popularity', label: 'Popularity' },
                      { value: 'rating', label: 'Rating' },
                      { value: 'title', label: 'Title' },
                      { value: 'year', label: 'Year' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                          sortBy === option.value
                            ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-medium'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative z-40 px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {activeTab === 'anime' && (searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Anime')}
                {activeTab === 'webtoons' && (searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Comics')} 
              </h2>
              <p className="text-white/60 text-lg">
                {searchQuery ? `Found ${getCurrentData().length} ${activeTab === 'anime' ? 'anime' : 'comics'} matching your search` : 
                 (activeTab === 'anime' ? 'Real-time data powered by AniList • Updated every hour' : 'Real-time data powered by AniList • Updated every hour')}
              </p>
              {!searchQuery && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <p className="text-white/40 text-sm">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                  <button
                    onClick={handleManualRefresh}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm"
                    disabled={loading}
                  >
                    <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? 'Updating...' : 'Refresh Now'}
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              // Enhanced Loading Skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-[3/4] bg-gradient-to-br from-white/10 to-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-white/10 rounded-lg animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 bg-white/10 rounded-full w-16 animate-pulse"></div>
                        <div className="h-6 bg-white/10 rounded-full w-20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : getCurrentData().length === 0 ? (
              // No Results State
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#00FFFF]/20 to-[#0099CC]/20 rounded-full flex items-center justify-center">
                  <Icon id="search" className="w-12 h-12 text-[#00FFFF]"/>
                </div>
                <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
                <p className="text-white/60 mb-6">
                  We couldn't find any {activeTab === 'anime' ? 'anime' : 'comics'} matching your search criteria.
                </p>
                <p className="text-white/40 text-sm">
                  Try adjusting your search terms or filter settings above.
                </p>
              </div>
            ) : (
              // Enhanced Cards Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {currentData.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-[#00FFFF]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#00FFFF]/20 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Enhanced Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=face&auto=format`;
                        }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {/* Ranking Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        #{index + 1}
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        {item.rating}
                      </div>
                      
                      {/* Year Badge */}
                      {item.year && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                          {item.year}
                        </div>
                      )}
                      
                      {/* Nationality Badge */}
                      {item.nationality && (
                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                          {item.nationality === 'JP' && '🇯🇵'}
                          {item.nationality === 'KR' && '🇰�'}
                          {item.nationality === 'CN' && '🇨🇳'}
                          {item.nationality === 'US' && '🇺🇸'}
                          {item.nationality}
                        </div>
                      )}
                      
                      {/* Hover Overlay with Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-3">
                          <button className="bg-[#00FFFF] text-black p-3 rounded-full hover:bg-white transition-colors duration-200">
                            <Icon id="play" className="w-5 h-5"/>
                          </button>
                          <button className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200">
                            <Icon id="bookmark" className="w-5 h-5"/>
                          </button>
                          <button className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200">
                            <Icon id="heart" className="w-5 h-5"/>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#00FFFF] transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      {/* Genre Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.genre.split(', ').slice(0, 2).map((genre, i) => (
                          <span 
                            key={i}
                            className="bg-[#00FFFF]/20 text-[#00FFFF] px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-white/60 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Additional Info */}
                      <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                        <div className="text-white/50 flex justify-between">
                          <span className="font-medium">
                            {activeTab === 'anime' ? 'Studio:' : 'Author:'}
                          </span>
                          <span>{activeTab === 'anime' ? item.studio : item.author}</span>
                        </div>
                        {item.status && (
                          <div className="text-white/50 flex justify-between">
                            <span className="font-medium">Status:</span>
                            <span className="text-[#00FFFF]">{item.status}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 bg-gradient-to-r from-[#00FFFF]/20 to-[#0099CC]/20 border border-[#00FFFF]/30 text-[#00FFFF] py-2 rounded-xl hover:bg-[#00FFFF]/30 transition-all duration-300 text-sm font-medium">
                          {activeTab === 'anime' ? 'Watch Now' : 'Read Now'}
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-300">
                          <Icon id="plus" className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* Scroll to Top */}
          {isScrolled && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black p-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#00FFFF]/30 transition-all duration-300 hover:scale-110 animate-fade-in-scale"
            >
              <Icon id="chevron-up" className="w-5 h-5"/>
            </button>
          )}
        </div>

        {/* Footer */}
        <footer className="relative z-40 mt-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="text-2xl font-bold tracking-wide mb-4">
                  ANI<span className="text-[#00FFFF]">O</span>MICS
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Your premium anime & comics discovery platform. Revolutionize how you discover, track, and share your favorite content through cutting-edge technology and real-time data.
                </p>
                <button 
                  onClick={() => setAboutModalOpen(true)}
                  className="text-[#00FFFF] hover:text-white transition-colors font-medium flex items-center gap-2"
                >
                  <Icon id="sparkles" className="w-4 h-4"/>
                  Learn More About Us
                </button>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><button className="text-white/60 hover:text-white transition-colors">Discover</button></li>
                  <li><button className="text-white/60 hover:text-white transition-colors">Community</button></li>
                  <li><button onClick={() => setLibraryModalOpen(true)} className="text-white/60 hover:text-white transition-colors">My Library</button></li>
                  <li><button onClick={() => setCreatorHubModalOpen(true)} className="text-white/60 hover:text-white transition-colors">Creator Hub</button></li>
                  <li><button onClick={() => setMarketplaceModalOpen(true)} className="text-white/60 hover:text-white transition-colors">Marketplace</button></li>
                </ul>
              </div>

              {/* Platform Info */}
              <div>
                <h3 className="font-bold text-white mb-4">Platform</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>🔥 Real-time Data</li>
                  <li>📊 AniList Integration</li>
                  <li>🎨 NFT Marketplace</li>
                  <li>👥 Creator Network</li>
                  <li>📚 Personal Library</li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/40 text-sm mb-4 md:mb-0">
                © 2025 ANIOMICS. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-white/40 text-sm">
                <span>Powered by AniList API</span>
                <span>•</span>
                <span>Built with Next.js</span>
                <span>•</span>
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </footer>

        <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
        <LoginModal 
          isOpen={loginModalOpen} 
          onClose={() => setLoginModalOpen(false)}
          onLogin={handleLogin}
        />
        <CreatorHubModal 
          isOpen={creatorHubModalOpen} 
          onClose={() => setCreatorHubModalOpen(false)}
        />
        <MarketplaceModal 
          isOpen={marketplaceModalOpen} 
          onClose={() => setMarketplaceModalOpen(false)}
        />
        <LibraryModal 
          isOpen={libraryModalOpen} 
          onClose={() => setLibraryModalOpen(false)}
        />
      </div>
    </>
  );
}
