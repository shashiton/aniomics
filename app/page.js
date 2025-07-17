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
    ),
    trophy: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M5 9V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM3 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM17 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM9 20h6l-1-7H10l-1 7z"/>
      </svg>
    ),
    star: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    award: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    fire: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.5 12c0-2.65 2.35-5 5-5s5 2.35 5 5-2.35 5-5 5-5-2.35-5-5zm7 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"/>
        <path d="M12 21c4.97 0 9-4.03 9-9 0-1.83-.55-3.53-1.49-4.95L17 9.59c.83 1.08 1.33 2.43 1.33 3.91 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-1.48.5-2.83 1.33-3.91L5.49 7.05C4.55 8.47 4 10.17 4 12c0 4.97 4.03 9 8 9z"/>
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    target: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm3 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
      </svg>
    ),
    cog: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    eye: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
// Gamification UI Components
const LevelUpAnimation = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl shadow-2xl animate-bounce">
        <div className="text-center">
          <div className="text-3xl font-bold">🎉 LEVEL UP! 🎉</div>
          <div className="text-xl mt-2">You reached Level {userLevel}!</div>
        </div>
      </div>
    </div>
  );
};

const AchievementPopup = ({ achievement }) => {
  if (!achievement) return null;
  
  return (
    <div className="fixed top-6 right-6 z-[9999] bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-xl shadow-2xl animate-slide-in-right">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{achievement.icon}</div>
        <div>
          <div className="font-bold">Achievement Unlocked!</div>
          <div className="text-sm">{achievement.name}</div>
          <div className="text-xs opacity-80">{achievement.description}</div>
        </div>
      </div>
    </div>
  );
};

const DailyCheckInPopup = ({ isVisible, streak }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black p-6 rounded-xl shadow-2xl animate-slide-in-top">
      <div className="text-center">
        <div className="text-3xl mb-2">✅</div>
        <div className="font-bold text-lg">Daily Check-In Complete!</div>
        <div className="text-sm mt-1">
          {streak > 1 ? (
            <>
              <span className="font-medium">{streak} day streak!</span>
              <div className="text-xs mt-1">🔥 Keep it up! +{streak >= 7 ? '100' : '30'} XP</div>
            </>
          ) : (
            <span>Welcome back! +30 XP</span>
          )}
        </div>
        {streak >= 7 && (
          <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full mt-2 inline-block">
            🏆 Weekly Streak Bonus!
          </div>
        )}
      </div>
    </div>
  );
};

const GamificationWidget = () => {
  const xpProgress = ((userExp % gamificationSystem.xpForNextLevel(userLevel)) / gamificationSystem.xpForNextLevel(userLevel)) * 100;
  
  return (
    <div className="fixed top-20 left-4 z-40 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl p-4 w-64">
      <div className="text-center mb-3">
        <div className="text-lg font-bold text-[#00FFFF]">Level {userLevel}</div>
        <div className="text-sm text-white/60">{userPoints} Points</div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>XP Progress</span>
          <span>{userExp % gamificationSystem.xpForNextLevel(userLevel)}/{gamificationSystem.xpForNextLevel(userLevel)}</span>
        </div>
        <div className="bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] h-2 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-[#00FFFF]">📝 {userStats.animeWatched}</div>
          <div className="text-white/60">Reviewed</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-[#00FFFF]">⭐ {userStats.comicsRead}</div>
          <div className="text-white/60">Rated</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-[#00FFFF]">🔥 {userStats.loginStreak || 0}</div>
          <div className="text-white/60">Day Streak</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-[#00FFFF]">🏆 {achievements.length}</div>
          <div className="text-white/60">Achievements</div>
        </div>
      </div>
      
      {/* Community Stats */}
      <div className="mt-3 pt-3 border-t border-white/20">
        <div className="text-xs text-white/80 mb-2 font-medium flex items-center gap-1">
          <span>👥</span> Community Activity
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-blue-500/20 rounded-lg p-2 text-center">
            <div className="text-blue-300">💬 {userStats.communityPosts || 0}</div>
            <div className="text-white/60">Posts</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-2 text-center">
            <div className="text-green-300">💖 {userStats.likesGiven || 0}</div>
            <div className="text-white/60">Likes</div>
          </div>
          <div className="bg-purple-500/20 rounded-lg p-2 text-center">
            <div className="text-purple-300">🤝 {userStats.usersHelped || 0}</div>
            <div className="text-white/60">Helped</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-2 text-center">
            <div className="text-yellow-300">⭐ {userStats.upvotesReceived || 0}</div>
            <div className="text-white/60">Upvotes</div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setGamificationVisible(!gamificationVisible)}
        className="w-full mt-3 bg-gradient-to-r from-[#00FFFF]/20 to-[#0099CC]/20 border border-[#00FFFF]/30 text-[#00FFFF] py-2 rounded-lg text-xs font-medium hover:bg-[#00FFFF]/30 transition-all"
      >
        {gamificationVisible ? 'Hide Details' : 'Show Details'}
      </button>
      
      {gamificationVisible && (
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="text-xs text-white/80 mb-2 font-medium">Recent Achievements</div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {achievements.slice(-5).map(achId => {
              const ach = achievementDefinitions.find(a => a.id === achId);
              return ach ? (
                <div key={achId} className="bg-white/10 rounded-lg p-2 flex items-center gap-2">
                  <span className="text-sm">{ach.icon}</span>
                  <div>
                    <div className="text-xs font-medium">{ach.name}</div>
                    <div className="text-xs text-white/60">+{ach.points} XP</div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Admin Dashboard Modal
const AdminModal = ({ isOpen, onClose }) => {
  const [activeAdminTab, setActiveAdminTab] = useState('overview');
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00FFFF]/20 to-[#0099CC]/20 border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">⚙️</span>
                Admin Dashboard
              </h2>
              <p className="text-white/60 mt-1">Platform analytics and user management</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Admin Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'content', name: 'Content', icon: '🎬' },
              { id: 'system', name: 'System', icon: '⚡' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeAdminTab === tab.id
                    ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black'
                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeAdminTab === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-white">{adminData.totalUsers.toLocaleString()}</p>
                      <p className="text-green-400 text-xs">{adminData.userGrowth} this month</p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-300 text-sm">Active Users</p>
                      <p className="text-2xl font-bold text-white">{adminData.activeUsers.toLocaleString()}</p>
                      <p className="text-green-400 text-xs">{adminData.engagement} engagement</p>
                    </div>
                    <div className="text-3xl">🟢</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300 text-sm">Total Content</p>
                      <p className="text-2xl font-bold text-white">{adminData.totalContent.toLocaleString()}</p>
                      <p className="text-green-400 text-xs">{adminData.contentGrowth} this month</p>
                    </div>
                    <div className="text-3xl">🎬</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-300 text-sm">Revenue</p>
                      <p className="text-2xl font-bold text-white">{adminData.revenue}</p>
                      <p className="text-green-400 text-xs">+15.2% this month</p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                </div>
              </div>
              
              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📈 User Growth</h3>
                  <div className="h-64 bg-gradient-to-r from-[#00FFFF]/10 to-[#0099CC]/10 rounded-lg flex items-center justify-center">
                    <div className="text-white/60">Chart would go here</div>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🎯 Content Performance</h3>
                  <div className="h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center">
                    <div className="text-white/60">Chart would go here</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeAdminTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/20 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/20">
                  <h3 className="text-lg font-bold text-white">Recent Users</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr className="text-left">
                        <th className="p-4 text-white/60 font-medium">User</th>
                        <th className="p-4 text-white/60 font-medium">Level</th>
                        <th className="p-4 text-white/60 font-medium">Points</th>
                        <th className="p-4 text-white/60 font-medium">Join Date</th>
                        <th className="p-4 text-white/60 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.recentUsers.map(user => (
                        <tr key={user.id} className="border-t border-white/10 hover:bg-white/5">
                          <td className="p-4 text-white">{user.email}</td>
                          <td className="p-4">
                            <span className="bg-[#00FFFF]/20 text-[#00FFFF] px-2 py-1 rounded-full text-sm">
                              Level {user.level}
                            </span>
                          </td>
                          <td className="p-4 text-white">{user.points.toLocaleString()}</td>
                          <td className="p-4 text-white/60">{user.joinDate}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              user.status === 'active' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeAdminTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/20 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/20">
                  <h3 className="text-lg font-bold text-white">Top Performing Content</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr className="text-left">
                        <th className="p-4 text-white/60 font-medium">Title</th>
                        <th className="p-4 text-white/60 font-medium">Type</th>
                        <th className="p-4 text-white/60 font-medium">Views</th>
                        <th className="p-4 text-white/60 font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminData.topContent.map((item, index) => (
                        <tr key={index} className="border-t border-white/10 hover:bg-white/5">
                          <td className="p-4 text-white font-medium">{item.title}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              item.type === 'anime' 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-purple-500/20 text-purple-400'
                            }`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="p-4 text-white">{item.views.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-white">{item.rating}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeAdminTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(adminData.systemStats).map(([key, value]) => (
                  <div key={key} className="bg-white/5 border border-white/20 rounded-xl p-4">
                    <div className="text-white/60 text-sm capitalize mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        style={{ width: key === 'serverUptime' ? '99%' : '75%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🔧 System Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 p-4 rounded-xl transition-all">
                    <div className="text-2xl mb-2">🔄</div>
                    <div className="font-medium">Refresh Cache</div>
                  </button>
                  <button className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 p-4 rounded-xl transition-all">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-medium">Export Data</div>
                  </button>
                  <button className="bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-300 p-4 rounded-xl transition-all">
                    <div className="text-2xl mb-2">⚠️</div>
                    <div className="font-medium">View Logs</div>
                  </button>
                  <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 p-4 rounded-xl transition-all">
                    <div className="text-2xl mb-2">🛠️</div>
                    <div className="font-medium">Maintenance</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent flex items-center gap-3">
                                <Icon id="pencil" className="w-8 h-8 text-[#00FFFF]"/>
                                Creator Hub
                            </h2>
                            <p className="text-white/60">Empowering anime and webtoon creators worldwide</p>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <Icon id="close" className="w-6 h-6"/>
                        </button>
                    </div>
                    
                    {/* Coming Soon Section */}
                    <div className="text-center py-20">
                        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#00FFFF]/20 to-[#0099CC]/20 rounded-full flex items-center justify-center">
                            <Icon id="pencil" className="w-16 h-16 text-[#00FFFF]"/>
                        </div>
                        
                        <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent">
                            Coming Soon
                        </h3>
                        
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                            We're building the ultimate creator platform where talented artists and storytellers can showcase their work, connect with fans, and monetize their creativity.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl mb-4">🎨</div>
                                <h4 className="font-bold text-white mb-2">Artist Showcase</h4>
                                <p className="text-white/60 text-sm">Feature your portfolio and get discovered by millions of fans</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl mb-4">💰</div>
                                <h4 className="font-bold text-white mb-2">Monetization Tools</h4>
                                <p className="text-white/60 text-sm">Multiple revenue streams including commissions and subscriptions</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl mb-4">🤝</div>
                                <h4 className="font-bold text-white mb-2">Community Hub</h4>
                                <p className="text-white/60 text-sm">Connect with fellow creators and collaborate on projects</p>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-[#00FFFF]/10 to-[#0099CC]/10 border border-[#00FFFF]/30 rounded-2xl p-6 mb-8">
                            <h4 className="font-bold text-white mb-3 flex items-center justify-center gap-2">
                                <span className="text-xl">🚀</span>
                                Creator Benefits
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4 text-left">
                                <ul className="text-white/70 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Portfolio hosting and management
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Direct fan interaction tools
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Commission marketplace
                                    </li>
                                </ul>
                                <ul className="text-white/70 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Analytics and insights dashboard
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Collaboration matching system
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Revenue tracking and payments
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <button className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]">
                                Join the Creator Waitlist
                            </button>
                            
                            <p className="text-white/40 text-sm">
                                Be among the first creators to access our platform and exclusive launch benefits
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Marketplace Modal Component
const MarketplaceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50 backdrop-blur-xl" onClick={e => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent flex items-center gap-3">
                                <Icon id="shopping" className="w-8 h-8 text-[#00FFFF]"/>
                                NFT Marketplace
                            </h2>
                            <p className="text-white/60">Digital collectibles and exclusive anime/webtoon NFTs</p>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                            <Icon id="close" className="w-6 h-6"/>
                        </button>
                    </div>
                    
                    {/* Coming Soon Section */}
                    <div className="text-center py-20">
                        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#00FFFF]/20 to-[#0099CC]/20 rounded-full flex items-center justify-center">
                            <Icon id="sparkles" className="w-16 h-16 text-[#00FFFF]"/>
                        </div>
                        
                        <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] bg-clip-text text-transparent">
                            Coming Soon
                        </h3>
                        
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                            We're building an amazing NFT marketplace where you can discover, collect, and trade exclusive anime and webtoon digital collectibles.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl mb-4">🎨</div>
                                <h4 className="font-bold text-white mb-2">Creator NFTs</h4>
                                <p className="text-white/60 text-sm">Exclusive artwork from top anime and webtoon creators</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl mb-4">💎</div>
                                <h4 className="font-bold text-white mb-2">Rare Collectibles</h4>
                                <p className="text-white/60 text-sm">Limited edition character cards and special moments</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-3xl mb-4">🏆</div>
                                <h4 className="font-bold text-white mb-2">Achievements</h4>
                                <p className="text-white/60 text-sm">Unlock special NFTs through platform achievements</p>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-[#00FFFF]/10 to-[#0099CC]/10 border border-[#00FFFF]/30 rounded-2xl p-6 mb-8">
                            <h4 className="font-bold text-white mb-3 flex items-center justify-center gap-2">
                                <span className="text-xl">🚀</span>
                                What's Coming
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4 text-left">
                                <ul className="text-white/70 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Official anime studio partnerships
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Webtoon creator exclusive drops
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Cross-platform trading
                                    </li>
                                </ul>
                                <ul className="text-white/70 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Gamified collecting experience
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Community-driven curation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-[#00FFFF]">✓</span>
                                        Eco-friendly blockchain integration
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <button className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFFF]/30 hover:scale-[1.02]">
                                Get Notified When We Launch
                            </button>
                            
                            <p className="text-white/40 text-sm">
                                Join our community to be the first to know about exclusive drops and early access
                            </p>
                        </div>
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
        { id: 1, title: "Attack on Titan", type: "anime", status: "reviewed", progress: "Rating: 9.5/10", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg" },
        { id: 2, title: "Demon Slayer", type: "anime", status: "reviewed", progress: "Rating: 8.8/10", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg" },
        { id: 3, title: "Solo Leveling", type: "webtoon", status: "reviewing", progress: "Currently Reading", image: "https://webtoon-phinf.pstatic.net/20200813_128/1597304985285SAMEl_JPEG/solo_leveling.jpg" }
    ]);
    const [readlist, setReadlist] = useState([
        { id: 4, title: "Tower of God", type: "webtoon", status: "reviewing", progress: "Currently Reading", image: "https://webtoon-phinf.pstatic.net/20181207_73/1544145307987BqzLp_JPEG/tower_of_god.jpg" },
        { id: 5, title: "The God of High School", type: "webtoon", status: "reviewed", progress: "Rating: 7.5/10", image: "https://webtoon-phinf.pstatic.net/20200302_181/1583135557796mQdOO_JPEG/god_of_high_school.jpg" },
        { id: 6, title: "Unordinary", type: "webtoon", status: "plan_to_review", progress: "In Reading List", image: "https://webtoon-phinf.pstatic.net/20191104_128/1572833506067j8dYq_JPEG/unordinary.jpg" }
    ]);

    if (!isOpen) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'reviewing':
            case 'reviewing': return 'bg-green-500/80';
            case 'reviewed': return 'bg-blue-500/80';
            case 'plan_to_review': return 'bg-yellow-500/80';
            case 'dropped': return 'bg-red-500/80';
            default: return 'bg-gray-500/80';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'reviewing': return 'Reviewing';
            case 'reviewing': return 'Reviewing';
            case 'reviewed': return 'Reviewed';
            case 'plan_to_review': return 'Plan to Review';
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
                            Anime Reviews
                        </button>
                        <button
                            onClick={() => setActiveLibraryTab('readlist')}
                            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                                activeLibraryTab === 'readlist'
                                    ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            Comic Reviews
                        </button>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-[#00FFFF]">
                                {activeLibraryTab === 'watchlist' ? watchlist.filter(item => item.status === 'reviewing').length : readlist.filter(item => item.status === 'reviewing').length}
                            </div>
                            <div className="text-white/60 text-sm">{activeLibraryTab === 'watchlist' ? 'Reviewing' : 'Reviewing'}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-blue-400">
                                {activeLibraryTab === 'watchlist' ? watchlist.filter(item => item.status === 'reviewed').length : readlist.filter(item => item.status === 'reviewed').length}
                            </div>
                            <div className="text-white/60 text-sm">Reviewed</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-yellow-400">
                                {activeLibraryTab === 'watchlist' ? watchlist.filter(item => item.status === 'plan_to_review').length : readlist.filter(item => item.status === 'plan_to_review').length}
                            </div>
                            <div className="text-white/60 text-sm">Plan to Review</div>
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

// Detailed Content Modal Component - Similar to AniList
const DetailedContentModal = ({ isOpen, onClose, content, type }) => {
  const [activeDetailTab, setActiveDetailTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [userStatus, setUserStatus] = useState('');
  const [userProgress, setUserProgress] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  if (!isOpen || !content) return null;

  const handleAddToLibrary = (status) => {
    setUserStatus(status);
    // Add to user's library logic here
    if (isLoggedIn) {
      gamificationSystem.trackAction(type === 'anime' ? 'watch' : 'read');
    }
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    // Save rating logic here
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[80] overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen p-4 flex items-start justify-center">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/20 rounded-3xl w-full max-w-6xl shadow-2xl shadow-black/50 backdrop-blur-xl relative" onClick={e => e.stopPropagation()}>
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
            <Icon id="close" className="w-6 h-6"/>
          </button>

          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-t-3xl">
            {/* Background Image */}
            <div className="h-80 bg-gradient-to-r from-blue-900 to-purple-900 relative">
              <img
                src={content.bannerImage || content.image}
                alt={content.title}
                className="w-full h-full object-cover opacity-30"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop&auto=format`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
            </div>

            {/* Content Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end gap-6">
                {/* Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-40 h-56 object-cover rounded-xl border-4 border-white/20 shadow-2xl"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=280&fit=crop&auto=format`;
                    }}
                  />
                </div>

                {/* Basic Info */}
                <div className="flex-1 pb-4">
                  <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
                  {content.titleEnglish && content.titleEnglish !== content.title && (
                    <h2 className="text-xl text-white/80 mb-3">{content.titleEnglish}</h2>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                      <span>⭐</span>
                      <span className="font-bold">{content.rating}</span>
                    </div>
                    <div className="bg-[#00FFFF]/20 text-[#00FFFF] px-3 py-1 rounded-full text-sm font-medium">
                      {content.year}
                    </div>
                    <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {type === 'anime' ? content.format || 'TV' : 'Webtoon'}
                    </div>
                    {content.status && (
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {content.status}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.genre.split(', ').slice(0, 4).map((genre, i) => (
                      <span key={i} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAddToLibrary(type === 'anime' ? 'plan_to_watch' : 'plan_to_read')}
                      className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#00FFFF]/30 transition-all duration-300"
                    >
                      Add to List
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-colors" title="Add to Favorites">
                      <Icon id="heart" className="w-5 h-5"/>
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-colors" title="Save for Later">
                      <Icon id="bookmark" className="w-5 h-5"/>
                    </button>
                    <button 
                      onClick={() => setShowTrailer(true)}
                      className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-colors"
                      title="Watch Trailer"
                    >
                      <Icon id="play" className="w-5 h-5"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-white/10 px-8">
            <div className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'characters', label: 'Characters' },
                { id: 'episodes', label: type === 'anime' ? 'Episodes' : 'Chapters' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'stats', label: 'Stats' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id)}
                  className={`py-4 px-2 font-medium transition-colors relative ${
                    activeDetailTab === tab.id
                      ? 'text-[#00FFFF]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeDetailTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FFFF] to-[#0099CC]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeDetailTab === 'overview' && (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Synopsis */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Synopsis</h3>
                    <p className="text-white/80 leading-relaxed">
                      {content.description || `Discover the amazing world of ${content.title}. This ${type} offers an incredible journey filled with adventure, emotion, and unforgettable characters. Join the community of fans who have fallen in love with this exceptional story.`}
                    </p>
                  </div>

                  {/* User Rating Section */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Your Rating & Status</h4>
                    <div className="space-y-4">
                      {/* Rating */}
                      <div>
                        <label className="block text-white/80 mb-2">Rate this {type}:</label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                            <button
                              key={star}
                              onClick={() => handleRating(star)}
                              className={`w-8 h-8 rounded transition-colors ${
                                star <= userRating ? 'text-yellow-400' : 'text-white/20 hover:text-yellow-400/50'
                              }`}
                            >
                              ⭐
                            </button>
                          ))}
                          <span className="ml-2 text-white/60">{userRating}/10</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-white/80 mb-2">Status:</label>
                        <select
                          value={userStatus}
                          onChange={(e) => handleAddToLibrary(e.target.value)}
                          className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="">Select Status</option>
                          <option value={type === 'anime' ? 'watching' : 'reading'}>
                            {type === 'anime' ? 'Watching' : 'Reading'}
                          </option>
                          <option value="completed">Completed</option>
                          <option value="paused">On Hold</option>
                          <option value="dropped">Dropped</option>
                          <option value="planning">Plan to {type === 'anime' ? 'Watch' : 'Read'}</option>
                        </select>
                      </div>

                      {/* Progress */}
                      <div>
                        <label className="block text-white/80 mb-2">
                          Progress ({type === 'anime' ? 'Episodes' : 'Chapters'}):
                        </label>
                        <input
                          type="number"
                          value={userProgress}
                          onChange={(e) => setUserProgress(e.target.value)}
                          placeholder={`0 / ${content.episodes || content.chapters || '?'}`}
                          className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* Details */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Details</h4>
                    <div className="space-y-3 text-sm">
                      {type === 'anime' ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-white/60">Studio:</span>
                            <span className="text-white">{content.studio || 'Unknown'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Episodes:</span>
                            <span className="text-white">{content.episodes || 'Ongoing'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Duration:</span>
                            <span className="text-white">{content.duration || '24 min'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Source:</span>
                            <span className="text-white">{content.source || 'Manga'}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-white/60">Author:</span>
                            <span className="text-white">{content.author || 'Unknown'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Chapters:</span>
                            <span className="text-white">{content.chapters || 'Ongoing'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Status:</span>
                            <span className="text-white">{content.status || 'Ongoing'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Country:</span>
                            <span className="text-white">{content.nationality || 'Korea'}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/60">Year:</span>
                        <span className="text-white">{content.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Rating:</span>
                        <span className="text-white">{content.rating}⭐</span>
                      </div>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Genres</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.genre.split(', ').map((genre, i) => (
                        <span key={i} className="bg-[#00FFFF]/20 text-[#00FFFF] px-3 py-1 rounded-full text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Statistics</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Popularity:</span>
                        <span className="text-white">#{Math.floor(Math.random() * 1000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Members:</span>
                        <span className="text-white">{(Math.random() * 500000).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Favorites:</span>
                        <span className="text-white">{(Math.random() * 50000).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === 'characters' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Characters</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#00FFFF]/20 to-[#0099CC]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Icon id="user" className="w-8 h-8 text-[#00FFFF]"/>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">Character {i}</h4>
                      <p className="text-white/60 text-xs">Main Character</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeDetailTab === 'episodes' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">
                  {type === 'anime' ? 'Episodes' : 'Chapters'}
                </h3>
                <div className="space-y-3">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00FFFF]/20 to-[#0099CC]/20 rounded-lg flex items-center justify-center">
                          <span className="text-[#00FFFF] font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {type === 'anime' ? `Episode ${i + 1}` : `Chapter ${i + 1}`}
                          </h4>
                          <p className="text-white/60 text-sm">
                            {type === 'anime' ? '24 min' : '15 pages'}
                          </p>
                        </div>
                      </div>
                      <button className="bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF] px-4 py-2 rounded-lg transition-colors">
                        {type === 'anime' ? 'Watch' : 'Read'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeDetailTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">User Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00FFFF]/20 to-[#0099CC]/20 rounded-full flex items-center justify-center">
                            <Icon id="user" className="w-5 h-5 text-[#00FFFF]"/>
                          </div>
                          <div>
                            <h4 className="font-bold text-white">User{i}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, j) => (
                                <span key={j} className={j < 4 ? 'text-yellow-400' : 'text-white/20'}>⭐</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-white/40 text-sm">2 days ago</span>
                      </div>
                      <p className="text-white/80 leading-relaxed">
                        Amazing {type}! The story is captivating and the characters are well-developed. 
                        Highly recommend to anyone looking for quality content.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeDetailTab === 'stats' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Statistics</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Score Distribution</h4>
                    <div className="space-y-2">
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(score => (
                        <div key={score} className="flex items-center gap-3">
                          <span className="text-white/60 w-4">{score}</span>
                          <div className="flex-1 bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[#00FFFF] to-[#0099CC] h-2 rounded-full"
                              style={{ width: `${score * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-white/60 text-sm">{score * 2}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4">Status Distribution</h4>
                    <div className="space-y-3">
                      {[
                        { status: type === 'anime' ? 'Watching' : 'Reading', count: '45,231', color: 'green' },
                        { status: 'Completed', count: '123,567', color: 'blue' },
                        { status: 'On Hold', count: '12,890', color: 'yellow' },
                        { status: 'Dropped', count: '5,432', color: 'red' },
                        { status: 'Plan to ' + (type === 'anime' ? 'Watch' : 'Read'), count: '28,901', color: 'purple' }
                      ].map(item => (
                        <div key={item.status} className="flex justify-between items-center">
                          <span className="text-white/80">{item.status}</span>
                          <span className={`text-${item.color}-400 font-bold`}>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchIntent, setSearchIntent] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
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
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [detailedContentModalOpen, setDetailedContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  // Gamification states
  const [userLevel, setUserLevel] = useState(1);
  const [userPoints, setUserPoints] = useState(0);
  const [userExp, setUserExp] = useState(0);
  const [maxExp, setMaxExp] = useState(100);
  const [achievements, setAchievements] = useState([]);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);
  const [gamificationVisible, setGamificationVisible] = useState(false);
  const [userStats, setUserStats] = useState({
    animeWatched: 0,
    comicsRead: 0,
    searchesMade: 0,
    filtersUsed: 0,
    languagesExplored: 1,
    totalTimeSpent: 0,
    achievementsUnlocked: 0,
    perfectDays: 0,
    // Community stats
    loginStreak: 0,
    communityPosts: 0,
    comments: 0,
    likesGiven: 0,
    contentShared: 0,
    discussionsJoined: 0,
    discussionsStarted: 0,
    usersHelped: 0,
    upvotesReceived: 0
  });

  // Gamification System
  const achievementDefinitions = [
    {
      id: 'first_search',
      name: 'Explorer',
      description: 'Made your first search',
      icon: '🔍',
      points: 10,
      condition: (stats) => stats.searchesMade >= 1
    },
    {
      id: 'search_master',
      name: 'Search Master',
      description: 'Made 50 searches',
      icon: '🎯',
      points: 100,
      condition: (stats) => stats.searchesMade >= 50
    },
    {
      id: 'anime_lover',
      name: 'Anime Reviewer',
      description: 'Reviewed 10 anime',
      icon: '�',
      points: 50,
      condition: (stats) => stats.animeWatched >= 10
    },
    {
      id: 'manga_reader',
      name: 'Comic Critic',
      description: 'Rated 10 comics',
      icon: '⭐',
      points: 50,
      condition: (stats) => stats.comicsRead >= 10
    },
    {
      id: 'polyglot',
      name: 'Polyglot',
      description: 'Explored 5 different languages',
      icon: '🌍',
      points: 75,
      condition: (stats) => stats.languagesExplored >= 5
    },
    {
      id: 'filter_ninja',
      name: 'Filter Ninja',
      description: 'Used filters 25 times',
      icon: '⚡',
      points: 40,
      condition: (stats) => stats.filtersUsed >= 25
    },
    {
      id: 'streak_week',
      name: 'Week Warrior',
      description: '7-day login streak',
      icon: '🔥',
      points: 150,
      condition: () => dailyStreak >= 7
    },
    {
      id: 'streak_month',
      name: 'Monthly Master',
      description: '30-day login streak',
      icon: '👑',
      points: 500,
      condition: () => dailyStreak >= 30
    },
    {
      id: 'completionist',
      name: 'Completionist',
      description: 'Unlocked 10 achievements',
      icon: '🏆',
      points: 200,
      condition: (stats) => stats.achievementsUnlocked >= 10
    },
    {
      id: 'time_spent',
      name: 'Dedicated Fan',
      description: 'Spent 60 minutes on the platform',
      icon: '⏰',
      points: 80,
      condition: (stats) => stats.totalTimeSpent >= 3600 // 60 minutes in seconds
    },
    // Community Achievements
    {
      id: 'first_check_in',
      name: 'Daily Visitor',
      description: 'Complete your first daily check-in',
      icon: '✅',
      points: 20,
      condition: (stats) => stats.loginStreak >= 1
    },
    {
      id: 'social_butterfly',
      name: 'Social Butterfly',
      description: 'Make your first community post',
      icon: '🦋',
      points: 30,
      condition: (stats) => (stats.communityPosts || 0) >= 1
    },
    {
      id: 'conversation_starter',
      name: 'Conversation Starter',
      description: 'Start 5 discussions',
      icon: '💬',
      points: 75,
      condition: (stats) => (stats.discussionsStarted || 0) >= 5
    },
    {
      id: 'helpful_member',
      name: 'Helpful Member',
      description: 'Help 10 community members',
      icon: '🤝',
      points: 100,
      condition: (stats) => (stats.usersHelped || 0) >= 10
    },
    {
      id: 'popular_poster',
      name: 'Popular Poster',
      description: 'Receive 50 upvotes on your posts',
      icon: '⭐',
      points: 150,
      condition: (stats) => (stats.upvotesReceived || 0) >= 50
    },
    {
      id: 'community_champion',
      name: 'Community Champion',
      description: 'Make 25 posts and 100 comments',
      icon: '🏅',
      points: 200,
      condition: (stats) => (stats.communityPosts || 0) >= 25 && (stats.comments || 0) >= 100
    },
    {
      id: 'streak_legend',
      name: 'Streak Legend',
      description: '100-day login streak',
      icon: '🔥',
      points: 1000,
      condition: (stats) => (stats.loginStreak || 0) >= 100
    },
    {
      id: 'engagement_master',
      name: 'Engagement Master',
      description: 'Like 200 posts and share 50 items',
      icon: '💖',
      points: 120,
      condition: (stats) => (stats.likesGiven || 0) >= 200 && (stats.contentShared || 0) >= 50
    }
  ];

  const levelThresholds = [
    { level: 1, exp: 0, title: 'Newcomer', color: '#94a3b8' },
    { level: 2, exp: 100, title: 'Explorer', color: '#10b981' },
    { level: 3, exp: 250, title: 'Enthusiast', color: '#3b82f6' },
    { level: 4, exp: 450, title: 'Otaku', color: '#8b5cf6' },
    { level: 5, exp: 700, title: 'Connoisseur', color: '#f59e0b' },
    { level: 6, exp: 1000, title: 'Expert', color: '#ef4444' },
    { level: 7, exp: 1400, title: 'Master', color: '#ec4899' },
    { level: 8, exp: 1900, title: 'Legend', color: '#06b6d4' },
    { level: 9, exp: 2500, title: 'Mythical', color: '#a855f7' },
    { level: 10, exp: 3200, title: 'Transcendent', color: '#facc15' }
  ];

  // Gamification Functions
  const awardPoints = (points, reason) => {
    setUserPoints(prev => prev + points);
    setUserExp(prev => {
      const newExp = prev + points;
      checkLevelUp(newExp);
      return newExp;
    });
    
    // Show point notification
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.innerHTML = `+${points} XP - ${reason}`;
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce';
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    }
  };

  const checkLevelUp = (currentExp) => {
    const currentLevel = levelThresholds.find(threshold => 
      currentExp >= threshold.exp && 
      (levelThresholds[levelThresholds.indexOf(threshold) + 1]?.exp > currentExp || !levelThresholds[levelThresholds.indexOf(threshold) + 1])
    );
    
    if (currentLevel && currentLevel.level > userLevel) {
      setUserLevel(currentLevel.level);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 5000);
      awardPoints(50, 'Level Up Bonus!');
    }
  };

  const checkAchievements = (newStats) => {
    achievementDefinitions.forEach(achievement => {
      if (!achievements.some(a => a.id === achievement.id) && achievement.condition(newStats)) {
        const newAchievement = { ...achievement, dateUnlocked: new Date() };
        setAchievements(prev => [...prev, newAchievement]);
        setShowAchievement(newAchievement);
        awardPoints(achievement.points, `Achievement: ${achievement.name}`);
        setUserStats(prev => ({ ...prev, achievementsUnlocked: prev.achievementsUnlocked + 1 }));
        setTimeout(() => setShowAchievement(null), 5000);
      }
    });
  };

  const trackAction = (action, value = 1) => {
    setUserStats(prev => {
      const newStats = { ...prev };
      
      switch (action) {
        case 'search':
          newStats.searchesMade += value;
          awardPoints(2, 'Search Action');
          break;
        case 'filter':
          newStats.filtersUsed += value;
          awardPoints(1, 'Filter Used');
          break;
        case 'watch':
          newStats.animeWatched += value;
          awardPoints(5, 'Anime Watched');
          break;
        case 'read':
          newStats.comicsRead += value;
          awardPoints(5, 'Comic Read');
          break;
        case 'language':
          if (!newStats.languagesExplored || newStats.languagesExplored < value) {
            newStats.languagesExplored = value;
            awardPoints(10, 'Language Explored');
          }
          break;
        case 'time':
          newStats.totalTimeSpent += value;
          break;
      }
      
      checkAchievements(newStats);
      return newStats;
    });
  };

  // Initialize daily streak on component mount
  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit);
      const daysDiff = Math.floor((new Date() - lastVisitDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        setDailyStreak(prev => prev + 1);
      } else if (daysDiff > 1) {
        setDailyStreak(1);
      }
    } else {
      setDailyStreak(1);
    }
    
    localStorage.setItem('lastVisit', today);
  }, []);

  // Track time spent
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackAction('time', timeSpent);
    };
  }, []);

  // Handle clicking outside dropdowns to prevent overlapping
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdowns if clicking outside
      if (!event.target.closest('.filter-dropdown')) {
        setShowGenreDropdown(false);
        setShowSortDropdown(false);
        setShowLanguageDropdown(false);
      }
      
      // Close search suggestions if clicking outside
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // API fetching functions
  const fetchAnimeData = async () => {
    try {
      setLoading(true);
      const query = `
        query {
          Page(page: 1, perPage: 50) {
            media(type: ANIME, sort: TRENDING_DESC) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
                color
              }
              bannerImage
              averageScore
              meanScore
              popularity
              trending
              favourites
              genres
              tags {
                name
                rank
                isMediaSpoiler
              }
              status
              format
              episodes
              duration
              seasonYear
              season
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              description
              source
              studios {
                nodes {
                  name
                  isAnimationStudio
                }
              }
              staff {
                edges {
                  node {
                    name {
                      full
                      native
                    }
                  }
                  role
                }
              }
              characters {
                edges {
                  node {
                    name {
                      full
                      native
                    }
                    image {
                      large
                    }
                  }
                  role
                  voiceActors {
                    name {
                      full
                    }
                    language
                  }
                }
              }
              relations {
                edges {
                  node {
                    id
                    title {
                      romaji
                      english
                    }
                    type
                    format
                  }
                  relationType
                }
              }
              recommendations {
                edges {
                  node {
                    mediaRecommendation {
                      id
                      title {
                        romaji
                        english
                      }
                      coverImage {
                        large
                      }
                    }
                  }
                }
              }
              trailer {
                id
                site
                thumbnail
              }
              countryOfOrigin
              isAdult
              nextAiringEpisode {
                episode
                timeUntilAiring
              }
              externalLinks {
                url
                site
              }
              streamingEpisodes {
                title
                thumbnail
                url
              }
              rankings {
                rank
                type
                format
                year
                season
                allTime
                context
              }
              stats {
                scoreDistribution {
                  score
                  amount
                }
                statusDistribution {
                  status
                  amount
                }
              }
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
          title: item.title.romaji || item.title.english || item.title.native,
          titleEnglish: item.title.english,
          titleNative: item.title.native,
          image: item.coverImage.large || item.coverImage.medium,
          bannerImage: item.bannerImage,
          coverColor: item.coverImage.color,
          rating: item.averageScore ? (item.averageScore / 10).toFixed(1) : '8.5',
          meanScore: item.meanScore,
          popularity: item.popularity,
          trending: item.trending,
          favourites: item.favourites,
          genre: item.genres.slice(0, 3).join(', '),
          genres: item.genres,
          tags: item.tags?.filter(tag => !tag.isMediaSpoiler).slice(0, 5).map(tag => tag.name) || [],
          year: item.seasonYear || item.startDate?.year || 2024,
          season: item.season,
          format: item.format,
          episodes: item.episodes,
          duration: item.duration,
          startDate: item.startDate,
          endDate: item.endDate,
          description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 'No description available.',
          fullDescription: item.description ? item.description.replace(/<[^>]*>/g, '') : 'No description available.',
          source: item.source,
          studio: item.studios.nodes.find(studio => studio.isAnimationStudio)?.name || item.studios.nodes[0]?.name || 'Unknown Studio',
          studios: item.studios.nodes.map(studio => studio.name),
          status: item.status || 'RELEASING',
          nationality: item.countryOfOrigin === 'JP' ? 'JP' : item.countryOfOrigin === 'KR' ? 'KR' : item.countryOfOrigin === 'CN' ? 'CN' : 'US',
          countryOfOrigin: item.countryOfOrigin,
          isAdult: item.isAdult,
          staff: item.staff?.edges?.slice(0, 10).map(edge => ({
            name: edge.node.name.full,
            nativeName: edge.node.name.native,
            role: edge.role
          })) || [],
          characters: item.characters?.edges?.slice(0, 12).map(edge => ({
            name: edge.node.name.full,
            nativeName: edge.node.name.native,
            image: edge.node.image.large,
            role: edge.role,
            voiceActors: edge.voiceActors?.slice(0, 2).map(va => ({
              name: va.name.full,
              language: va.language
            })) || []
          })) || [],
          relations: item.relations?.edges?.slice(0, 5).map(edge => ({
            id: edge.node.id,
            title: edge.node.title.romaji || edge.node.title.english,
            type: edge.node.type,
            format: edge.node.format,
            relationType: edge.relationType
          })) || [],
          recommendations: item.recommendations?.edges?.slice(0, 6).map(edge => ({
            id: edge.node.mediaRecommendation?.id,
            title: edge.node.mediaRecommendation?.title?.romaji || edge.node.mediaRecommendation?.title?.english,
            image: edge.node.mediaRecommendation?.coverImage?.large
          })).filter(rec => rec.id) || [],
          trailer: item.trailer ? {
            id: item.trailer.id,
            site: item.trailer.site,
            thumbnail: item.trailer.thumbnail
          } : null,
          nextAiringEpisode: item.nextAiringEpisode,
          externalLinks: item.externalLinks?.slice(0, 5).map(link => ({
            url: link.url,
            site: link.site
          })) || [],
          streamingEpisodes: item.streamingEpisodes?.slice(0, 10) || [],
          rankings: item.rankings?.slice(0, 3) || [],
          scoreDistribution: item.stats?.scoreDistribution || [],
          statusDistribution: item.stats?.statusDistribution || []
        }));
        
        setAnimeData(formattedAnime);
        setLastUpdated(new Date());
        console.log('✅ Enhanced Anime data updated from AniList API:', formattedAnime.length, 'items with comprehensive data');
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
          Page(page: 1, perPage: 50) {
            media(type: MANGA, sort: TRENDING_DESC) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
                color
              }
              bannerImage
              averageScore
              meanScore
              popularity
              trending
              favourites
              genres
              tags {
                name
                rank
                isMediaSpoiler
              }
              status
              format
              chapters
              volumes
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              description
              source
              staff {
                edges {
                  node {
                    name {
                      full
                      native
                    }
                  }
                  role
                }
              }
              characters {
                edges {
                  node {
                    name {
                      full
                      native
                    }
                    image {
                      large
                    }
                  }
                  role
                }
              }
              relations {
                edges {
                  node {
                    id
                    title {
                      romaji
                      english
                    }
                    type
                    format
                  }
                  relationType
                }
              }
              recommendations {
                edges {
                  node {
                    mediaRecommendation {
                      id
                      title {
                        romaji
                        english
                      }
                      coverImage {
                        large
                      }
                    }
                  }
                }
              }
              countryOfOrigin
              isAdult
              externalLinks {
                url
                site
              }
              rankings {
                rank
                type
                format
                year
                allTime
                context
              }
              stats {
                scoreDistribution {
                  score
                  amount
                }
                statusDistribution {
                  status
                  amount
                }
              }
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
          title: item.title.romaji || item.title.english || item.title.native,
          titleEnglish: item.title.english,
          titleNative: item.title.native,
          image: item.coverImage.large || item.coverImage.medium,
          bannerImage: item.bannerImage,
          coverColor: item.coverImage.color,
          rating: item.averageScore ? (item.averageScore / 10).toFixed(1) : '8.5',
          meanScore: item.meanScore,
          popularity: item.popularity,
          trending: item.trending,
          favourites: item.favourites,
          genre: item.genres.slice(0, 3).join(', '),
          genres: item.genres,
          tags: item.tags?.filter(tag => !tag.isMediaSpoiler).slice(0, 5).map(tag => tag.name) || [],
          year: item.startDate?.year || 2024,
          format: item.format,
          chapters: item.chapters,
          volumes: item.volumes,
          startDate: item.startDate,
          endDate: item.endDate,
          description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 'No description available.',
          fullDescription: item.description ? item.description.replace(/<[^>]*>/g, '') : 'No description available.',
          source: item.source,
          author: item.staff?.edges?.find(edge => edge.role === 'Story & Art' || edge.role === 'Story')?.node?.name?.full || 
                  item.staff?.edges?.[0]?.node?.name?.full || 'Unknown Author',
          staff: item.staff?.edges?.slice(0, 10).map(edge => ({
            name: edge.node.name.full,
            nativeName: edge.node.name.native,
            role: edge.role
          })) || [],
          status: item.status || 'RELEASING',
          nationality: item.countryOfOrigin === 'JP' ? 'JP' : item.countryOfOrigin === 'KR' ? 'KR' : item.countryOfOrigin === 'CN' ? 'CN' : 'US',
          countryOfOrigin: item.countryOfOrigin,
          isAdult: item.isAdult,
          characters: item.characters?.edges?.slice(0, 12).map(edge => ({
            name: edge.node.name.full,
            nativeName: edge.node.name.native,
            image: edge.node.image.large,
            role: edge.role
          })) || [],
          relations: item.relations?.edges?.slice(0, 5).map(edge => ({
            id: edge.node.id,
            title: edge.node.title.romaji || edge.node.title.english,
            type: edge.node.type,
            format: edge.node.format,
            relationType: edge.relationType
          })) || [],
          recommendations: item.recommendations?.edges?.slice(0, 6).map(edge => ({
            id: edge.node.mediaRecommendation?.id,
            title: edge.node.mediaRecommendation?.title?.romaji || edge.node.mediaRecommendation?.title?.english,
            image: edge.node.mediaRecommendation?.coverImage?.large
          })).filter(rec => rec.id) || [],
          externalLinks: item.externalLinks?.slice(0, 5).map(link => ({
            url: link.url,
            site: link.site
          })) || [],
          rankings: item.rankings?.slice(0, 3) || [],
          scoreDistribution: item.stats?.scoreDistribution || [],
          statusDistribution: item.stats?.statusDistribution || []
        }));
        
        setWebtoonData(formattedWebtoons);
        console.log('✅ Enhanced Webtoon data updated from AniList API:', formattedWebtoons.length, 'items with comprehensive data');
      }
    } catch (error) {
      console.error('❌ Error fetching webtoon data:', error);
      // Fallback to static data on error
    } finally {
      setLoading(false);
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

  // Enhanced data filtering and search with AI
  const getFilteredData = () => {
    const currentData = activeTab === 'anime' ? animeData : webtoonData;
    let filtered = currentData;

    // AI-powered search
    if (searchQuery) {
      filtered = aiSearchEngine.smartSearch(searchQuery, filtered);
      
      // Update search intent for UI feedback
      const intents = aiSearchEngine.detectIntent(searchQuery);
      setSearchIntent(intents.join(', '));
    }

    // Multi-genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(item => {
        const itemGenres = item.genre.split(', ').map(g => g.trim().toLowerCase());
        return selectedGenres.some(selectedGenre => 
          itemGenres.some(itemGenre => itemGenre.includes(selectedGenre.toLowerCase()))
        );
      });
    }

    // Enhanced sort functionality with new options
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => {
          const scoreA = parseFloat(a.rating) || parseFloat(a.score) || parseFloat(a.meanScore) || 0;
          const scoreB = parseFloat(b.rating) || parseFloat(b.score) || parseFloat(b.meanScore) || 0;
          return scoreB - scoreA;
        });
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case 'episodes':
        filtered.sort((a, b) => {
          const episodesA = parseInt(a.episodes) || parseInt(a.chapters) || 0;
          const episodesB = parseInt(b.episodes) || parseInt(b.chapters) || 0;
          return episodesB - episodesA;
        });
        break;
      case 'favorites':
        filtered.sort((a, b) => {
          const favA = parseInt(a.favourites) || parseInt(a.favorites) || 0;
          const favB = parseInt(b.favourites) || parseInt(b.favorites) || 0;
          return favB - favA;
        });
        break;
      default: // popularity
        filtered.sort((a, b) => {
          if (searchQuery) {
            return (b.searchScore || 0) - (a.searchScore || 0);
          }
          const popA = parseInt(a.popularity) || parseInt(a.trending) || 0;
          const popB = parseInt(b.popularity) || parseInt(b.trending) || 0;
          return popB - popA;
        });
        break;
    }

    return filtered;
  };

  // Get unique genres for filter options
  const getGenres = () => {
    const currentData = activeTab === 'anime' ? animeData : webtoonData;
    const genres = [...new Set(currentData.flatMap(item => 
      item.genre.split(', ').map(g => g.trim())
    ))];
    return genres.sort();
  };

  // Handle genre selection
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        // Track filter usage for gamification
        if (isLoggedIn) {
          gamificationSystem.trackAction('filter');
        }
        return [...prev, genre];
      }
    });
  };

  // Clear all genre filters
  const clearGenreFilters = () => {
    setSelectedGenres([]);
  };

  // Language support
  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    pt: { name: 'Português', flag: '🇧🇷' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ko: { name: '한국어', flag: '🇰🇷' },
    zh: { name: '中文', flag: '🇨🇳' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    hi: { name: 'हिन्दी', flag: '🇮🇳' },
    th: { name: 'ไทย', flag: '🇹🇭' },
    vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
    id: { name: 'Bahasa Indonesia', flag: '🇮🇩' },
    ms: { name: 'Bahasa Melayu', flag: '🇲🇾' },
    tr: { name: 'Türkçe', flag: '🇹🇷' },
    nl: { name: 'Nederlands', flag: '🇳🇱' },
    sv: { name: 'Svenska', flag: '🇸🇪' },
    pl: { name: 'Polski', flag: '🇵🇱' }
  };

  // Translation object
  const translations = {
    en: {
      // Navigation
      library: 'Library',
      creatorHub: 'Creator Hub',
      marketplace: 'Marketplace',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
      language: 'Language',
      
      // Hero Section
      welcome: 'Welcome back',
      readyDiscover: 'Ready to discover your next favorite series?',
      discoverAmazing: 'Discover Amazing',
      animeComics: 'Animes & Comics',
      personalizedCollection: 'Your personalized collection of trending anime and webtoons awaits. Track favorites and discover new series!',
      exploreCollections: 'Explore curated collections of trending Animes & Comics. Your next obsession is just one click away.',
      searchPlaceholder: 'Search anime, comics...',
      
      // Tabs
      anime: 'Anime',
      
      // Filters
      genres: 'Genres',
      allGenres: 'All',
      sort: 'Sort',
      popularity: 'Popularity',
      rating: 'Rating',
      title: 'Title',
      year: 'Year',
      clearAll: 'Clear All',
      filters: 'Filters',
      clearAllFilters: 'Clear all filters',
      selected: 'selected',
      
      // Content
      trendingAnime: 'Trending Anime',
      trendingComics: 'Trending Comics',
      searchResults: 'Search Results for',
      found: 'Found',
      matching: 'matching your search',
      realTimeData: 'Real-time data powered by AniList • Updated every hour',
      lastUpdated: 'Last updated',
      refreshNow: 'Refresh Now',
      updating: 'Updating...',
      
      // Cards
      watch: 'Watch',
      read: 'Read',
      watchNow: 'Watch Now',
      readNow: 'Read Now',
      studio: 'Studio',
      author: 'Author',
      status: 'Status',
      
      // No Results
      noResults: 'No Results Found',
      noResultsDesc: 'We couldn\'t find any {type} matching your search criteria.',
      adjustSearch: 'Try adjusting your search terms or filter settings above.',
      
      // Footer
      platformDesc: 'Your premium anime & comics discovery platform. Revolutionize how you discover, track, and share your favorite content through cutting-edge technology and real-time data.',
      learnMore: 'Learn More About Us',
      quickLinks: 'Quick Links',
      discover: 'Discover',
      community: 'Community',
      platform: 'Platform',
      realTimeDataFooter: 'Real-time Data',
      anilistIntegration: 'AniList Integration',
      nftMarketplace: 'NFT Marketplace',
      creatorNetwork: 'Creator Network',
      personalLibrary: 'Personal Library',
      poweredBy: 'Powered by AniList API',
      builtWith: 'Built with Next.js',
      realTimeUpdates: 'Real-time Updates',
      allRightsReserved: 'All rights reserved'
    },
    es: {
      // Navigation
      library: 'Biblioteca',
      creatorHub: 'Centro de Creadores',
      marketplace: 'Mercado',
      profile: 'Perfil',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      language: 'Idioma',
      
      // Hero Section
      welcome: 'Bienvenido de vuelta',
      readyDiscover: '¿Listo para descubrir tu próxima serie favorita?',
      discoverAmazing: 'Descubre Increíbles',
      animeComics: 'Anime y Cómics',
      personalizedCollection: 'Tu colección personalizada de anime y webtoons de tendencia te espera. ¡Rastrea tus favoritos y descubre nuevas series!',
      exploreCollections: 'Explora colecciones curadas de anime y webtoons de tendencia. Tu próxima obsesión está a solo un clic.',
      searchPlaceholder: 'Buscar anime, cómics...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Cómics',
      
      // Filters
      genres: 'Géneros',
      allGenres: 'Todos',
      sort: 'Ordenar',
      popularity: 'Popularidad',
      rating: 'Calificación',
      title: 'Título',
      year: 'Año',
      clearAll: 'Limpiar Todo',
      filters: 'Filtros',
      clearAllFilters: 'Limpiar todos los filtros',
      selected: 'seleccionados',
      
      // Content
      trendingAnime: 'Anime de Tendencia',
      trendingComics: 'Cómics de Tendencia',
      searchResults: 'Resultados de búsqueda para',
      found: 'Encontrados',
      matching: 'que coinciden con tu búsqueda',
      realTimeData: 'Datos en tiempo real impulsados por AniList • Actualizado cada hora',
      lastUpdated: 'Última actualización',
      refreshNow: 'Actualizar Ahora',
      updating: 'Actualizando...',
      
      // Cards
      watch: 'Ver',
      read: 'Leer',
      watchNow: 'Ver Ahora',
      readNow: 'Leer Ahora',
      studio: 'Estudio',
      author: 'Autor',
      status: 'Estado',
      
      // No Results
      noResults: 'No se Encontraron Resultados',
      noResultsDesc: 'No pudimos encontrar ningún {type} que coincida con tus criterios de búsqueda.',
      adjustSearch: 'Intenta ajustar tus términos de búsqueda o configuración de filtros arriba.',
      
      // Footer
      platformDesc: 'Tu plataforma premium de descubrimiento de anime y cómics. Revoluciona cómo descubres, rastreas y compartes tu contenido favorito a través de tecnología de vanguardia y datos en tiempo real.',
      learnMore: 'Conoce Más Sobre Nosotros',
      quickLinks: 'Enlaces Rápidos',
      discover: 'Descubrir',
      community: 'Comunidad',
      platform: 'Plataforma',
      realTimeDataFooter: 'Datos en Tiempo Real',
      anilistIntegration: 'Integración AniList',
      nftMarketplace: 'Mercado NFT',
      creatorNetwork: 'Red de Creadores',
      personalLibrary: 'Biblioteca Personal',
      poweredBy: 'Impulsado por AniList API',
      builtWith: 'Construido con Next.js',
      realTimeUpdates: 'Actualizaciones en Tiempo Real',
      allRightsReserved: 'Todos los derechos reservados'
    },
    ja: {
      // Navigation
      library: 'ライブラリ',
      creatorHub: 'クリエイターハブ',
      marketplace: 'マーケットプレイス',
      profile: 'プロフィール',
      login: 'ログイン',
      logout: 'ログアウト',
      language: '言語',
      
      // Hero Section
      welcome: 'おかえりなさい',
      readyDiscover: '次のお気に入りシリーズを発見する準備はできていますか？',
      discoverAmazing: '素晴らしい作品を発見',
      animeComics: 'アニメ & コミック',
      personalizedCollection: 'あなた専用のトレンドアニメとウェブトゥーンコレクションが待っています。お気に入りを追跡し、新しいシリーズを発見しましょう！',
      exploreCollections: 'トレンドアニメとウェブトゥーンの厳選コレクションを探索してください。あなたの次の夢中になる作品はクリック一つで見つかります。',
      searchPlaceholder: 'アニメ、コミックを検索...',
      
      // Tabs
      anime: 'アニメ',
      comics: 'コミック',
      
      // Filters
      genres: 'ジャンル',
      allGenres: 'すべて',
      sort: '並び替え',
      popularity: '人気',
      rating: '評価',
      title: 'タイトル',
      year: '年',
      clearAll: 'すべてクリア',
      filters: 'フィルター',
      clearAllFilters: 'すべてのフィルターをクリア',
      selected: '選択済み',
      
      // Content
      trendingAnime: 'トレンドアニメ',
      trendingComics: 'トレンドコミック',
      searchResults: '検索結果：',
      found: '見つかりました',
      matching: 'あなたの検索に一致する',
      realTimeData: 'AniListによるリアルタイムデータ • 毎時更新',
      lastUpdated: '最終更新',
      refreshNow: '今すぐ更新',
      updating: '更新中...',
      
      // Cards
      watch: '視聴',
      read: '読む',
      watchNow: '今すぐ視聴',
      readNow: '今すぐ読む',
      studio: 'スタジオ',
      author: '作者',
      status: 'ステータス',
      
      // No Results
      noResults: '結果が見つかりません',
      noResultsDesc: '検索条件に一致する{type}が見つかりませんでした。',
      adjustSearch: '上記の検索条件やフィルター設定を調整してみてください。',
      
      // Footer
      platformDesc: 'あなたのプレミアムアニメ&コミック発見プラットフォーム。最先端技術とリアルタイムデータを通じて、お気に入りコンテンツの発見、追跡、共有方法を革新します。',
      learnMore: '私たちについてもっと知る',
      quickLinks: 'クイックリンク',
      discover: '発見',
      community: 'コミュニティ',
      platform: 'プラットフォーム',
      realTimeDataFooter: 'リアルタイムデータ',
      anilistIntegration: 'AniList統合',
      nftMarketplace: 'NFTマーケットプレイス',
      creatorNetwork: 'クリエイターネットワーク',
      personalLibrary: 'パーソナルライブラリ',
      poweredBy: 'AniList APIを活用',
      builtWith: 'Next.jsで構築',
      realTimeUpdates: 'リアルタイム更新',
      allRightsReserved: 'すべての権利を留保'
    },
    ko: {
      // Navigation
      library: '라이브러리',
      creatorHub: '크리에이터 허브',
      marketplace: '마켓플레이스',
      profile: '프로필',
      login: '로그인',
      logout: '로그아웃',
      language: '언어',
      
      // Hero Section
      welcome: '다시 오신 것을 환영합니다',
      readyDiscover: '다음 최애 시리즈를 발견할 준비가 되셨나요?',
      discoverAmazing: '놀라운 작품들을 발견하세요',
      animeComics: '애니메이션 & 만화',
      personalizedCollection: '트렌드 애니메이션과 웹툰의 개인화된 컬렉션이 기다리고 있습니다. 즐겨찾기를 추적하고 새로운 시리즈를 발견하세요!',
      exploreCollections: '엄선된 트렌드 애니메이션과 웹툰 컬렉션을 탐색하세요. 당신의 다음 최애작은 클릭 한 번으로 찾을 수 있습니다.',
      searchPlaceholder: '애니메이션, 만화 검색...',
      
      // Tabs
      anime: '애니메이션',
      comics: '만화',
      
      // Filters
      genres: '장르',
      allGenres: '전체',
      sort: '정렬',
      popularity: '인기도',
      rating: '평점',
      title: '제목',
      year: '연도',
      clearAll: '전체 지우기',
      filters: '필터',
      clearAllFilters: '모든 필터 지우기',
      selected: '선택됨',
      
      // Content
      trendingAnime: '트렌드 애니메이션',
      trendingComics: '트렌드 만화',
      searchResults: '검색 결과:',
      found: '찾았습니다',
      matching: '검색과 일치하는',
      realTimeData: 'AniList 기반 실시간 데이터 • 매시간 업데이트',
      lastUpdated: '마지막 업데이트',
      refreshNow: '지금 새로고침',
      updating: '업데이트 중...',
      
      // Cards
      watch: '시청',
      read: '읽기',
      watchNow: '지금 시청',
      readNow: '지금 읽기',
      studio: '스튜디오',
      author: '작가',
      status: '상태',
      
      // No Results
      noResults: '결과를 찾을 수 없습니다',
      noResultsDesc: '검색 조건에 맞는 {type}를 찾을 수 없었습니다.',
      adjustSearch: '위의 검색어나 필터 설정을 조정해 보세요.',
      
      // Footer
      platformDesc: '당신만의 프리미엄 애니메이션 & 만화 발견 플랫폼. 최첨단 기술과 실시간 데이터를 통해 좋아하는 콘텐츠를 발견하고, 추적하고, 공유하는 방식을 혁신합니다.',
      learnMore: '우리에 대해 더 알아보기',
      quickLinks: '빠른 링크',
      discover: '발견',
      community: '커뮤니티',
      platform: '플랫폼',
      realTimeDataFooter: '실시간 데이터',
      anilistIntegration: 'AniList 통합',
      nftMarketplace: 'NFT 마켓플레이스',
      creatorNetwork: '크리에이터 네트워크',
      personalLibrary: '개인 라이브러리',
      poweredBy: 'AniList API 기반',
      builtWith: 'Next.js로 구축',
      realTimeUpdates: '실시간 업데이트',
      allRightsReserved: '모든 권리 보유'
    },
    zh: {
      // Navigation
      library: '资料库',
      creatorHub: '创作者中心',
      marketplace: '市场',
      profile: '个人资料',
      login: '登录',
      logout: '登出',
      language: '语言',
      
      // Hero Section
      welcome: '欢迎回来',
      readyDiscover: '准备好发现你的下一部最爱作品了吗？',
      discoverAmazing: '发现精彩',
      animeComics: '动漫作品',
      personalizedCollection: '您的个性化热门动漫和网络漫画收藏等待着您。追踪您的收藏并发现新系列！',
      exploreCollections: '探索精选的热门动漫和网络漫画收藏。您的下一个迷恋作品只需一键之遥。',
      searchPlaceholder: '搜索动漫、漫画...',
      
      // Tabs
      anime: '动漫',
      comics: '漫画',
      
      // Filters
      genres: '类型',
      allGenres: '全部',
      sort: '排序',
      popularity: '热度',
      rating: '评分',
      title: '标题',
      year: '年份',
      clearAll: '清除全部',
      filters: '筛选',
      clearAllFilters: '清除所有筛选',
      selected: '已选择',
      
      // Content
      trendingAnime: '热门动漫',
      trendingComics: '热门漫画',
      searchResults: '搜索结果：',
      found: '找到',
      matching: '与您的搜索匹配',
      realTimeData: '由AniList提供的实时数据 • 每小时更新',
      lastUpdated: '最后更新',
      refreshNow: '立即刷新',
      updating: '更新中...',
      
      // Cards
      watch: '观看',
      read: '阅读',
      watchNow: '立即观看',
      readNow: '立即阅读',
      studio: '制作公司',
      author: '作者',
      status: '状态',
      
      // No Results
      noResults: '未找到结果',
      noResultsDesc: '我们无法找到符合您搜索条件的{type}。',
      adjustSearch: '请尝试调整上面的搜索词或筛选设置。',
      
      // Footer
      platformDesc: '您的高端动漫漫画发现平台。通过尖端技术和实时数据，革新您发现、追踪和分享喜爱内容的方式。',
      learnMore: '了解更多关于我们',
      quickLinks: '快速链接',
      discover: '发现',
      community: '社区',
      platform: '平台',
      realTimeDataFooter: '实时数据',
      anilistIntegration: 'AniList集成',
      nftMarketplace: 'NFT市场',
      creatorNetwork: '创作者网络',
      personalLibrary: '个人资料库',
      poweredBy: '由AniList API驱动',
      builtWith: '使用Next.js构建',
      realTimeUpdates: '实时更新',
      allRightsReserved: '版权所有'
    },
    fr: {
      // Navigation
      library: 'Bibliothèque',
      creatorHub: 'Centre Créateur',
      marketplace: 'Marché',
      profile: 'Profil',
      login: 'Connexion',
      logout: 'Déconnexion',
      language: 'Langue',
      
      // Hero Section
      welcome: 'Bon retour',
      readyDiscover: 'Prêt à découvrir votre prochaine série préférée ?',
      discoverAmazing: 'Découvrez d\'Incroyables',
      animeComics: 'Anime et BD',
      personalizedCollection: 'Votre collection personnalisée d\'anime et webtoons tendance vous attend. Suivez vos favoris et découvrez de nouvelles séries !',
      exploreCollections: 'Explorez des collections organisées d\'anime et webtoons tendance. Votre prochaine obsession n\'est qu\'à un clic.',
      searchPlaceholder: 'Rechercher anime, BD...',
      
      // Tabs
      anime: 'Anime',
      comics: 'BD',
      
      // Filters
      genres: 'Genres',
      allGenres: 'Tous',
      sort: 'Trier',
      popularity: 'Popularité',
      rating: 'Note',
      title: 'Titre',
      year: 'Année',
      clearAll: 'Tout Effacer',
      filters: 'Filtres',
      clearAllFilters: 'Effacer tous les filtres',
      selected: 'sélectionnés',
      
      // Content
      trendingAnime: 'Anime Tendance',
      trendingComics: 'BD Tendance',
      searchResults: 'Résultats de recherche pour',
      found: 'Trouvé',
      matching: 'correspondant à votre recherche',
      realTimeData: 'Données en temps réel par AniList • Mis à jour chaque heure',
      lastUpdated: 'Dernière mise à jour',
      refreshNow: 'Actualiser Maintenant',
      updating: 'Mise à jour...',
      
      // Cards
      watch: 'Regarder',
      read: 'Lire',
      watchNow: 'Regarder Maintenant',
      readNow: 'Lire Maintenant',
      studio: 'Studio',
      author: 'Auteur',
      status: 'Statut',
      
      // No Results
      noResults: 'Aucun Résultat Trouvé',
      noResultsDesc: 'Nous n\'avons trouvé aucun {type} correspondant à vos critères de recherche.',
      adjustSearch: 'Essayez d\'ajuster vos termes de recherche ou paramètres de filtre ci-dessus.',
      
      // Footer
      platformDesc: 'Votre plateforme premium de découverte d\'anime et BD. Révolutionnez la façon dont vous découvrez, suivez et partagez votre contenu préféré grâce à une technologie de pointe et des données en temps réel.',
      learnMore: 'En Savoir Plus Sur Nous',
      quickLinks: 'Liens Rapides',
      discover: 'Découvrir',
      community: 'Communauté',
      platform: 'Plateforme',
      realTimeDataFooter: 'Données en Temps Réel',
      anilistIntegration: 'Intégration AniList',
      nftMarketplace: 'Marché NFT',
      creatorNetwork: 'Réseau Créateur',
      personalLibrary: 'Bibliothèque Personnelle',
      poweredBy: 'Alimenté par AniList API',
      builtWith: 'Construit avec Next.js',
      realTimeUpdates: 'Mises à Jour en Temps Réel',
      allRightsReserved: 'Tous droits réservés'
    },
    de: {
      // Navigation
      library: 'Bibliothek',
      creatorHub: 'Creator Hub',
      marketplace: 'Marktplatz',
      profile: 'Profil',
      login: 'Anmelden',
      logout: 'Abmelden',
      language: 'Sprache',
      
      // Hero Section
      welcome: 'Willkommen zurück',
      readyDiscover: 'Bereit, deine nächste Lieblingsserie zu entdecken?',
      discoverAmazing: 'Entdecke Erstaunliche',
      animeComics: 'Anime & Comics',
      personalizedCollection: 'Deine personalisierte Sammlung von Trend-Anime und Webtoons wartet auf dich. Verfolge deine Favoriten und entdecke neue Serien!',
      exploreCollections: 'Erkunde kuratierte Sammlungen von Trend-Anime und Webtoons. Deine nächste Obsession ist nur einen Klick entfernt.',
      searchPlaceholder: 'Anime, Comics suchen...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Comics',
      
      // Filters
      genres: 'Genres',
      allGenres: 'Alle',
      sort: 'Sortieren',
      popularity: 'Beliebtheit',
      rating: 'Bewertung',
      title: 'Titel',
      year: 'Jahr',
      clearAll: 'Alle Löschen',
      filters: 'Filter',
      clearAllFilters: 'Alle Filter löschen',
      selected: 'ausgewählt',
      
      // Content
      trendingAnime: 'Trend-Anime',
      trendingComics: 'Trend-Comics',
      searchResults: 'Suchergebnisse für',
      found: 'Gefunden',
      matching: 'passend zu deiner Suche',
      realTimeData: 'Echtzeit-Daten von AniList • Stündlich aktualisiert',
      lastUpdated: 'Zuletzt aktualisiert',
      refreshNow: 'Jetzt Aktualisieren',
      updating: 'Aktualisierung...',
      
      // Cards
      watch: 'Ansehen',
      read: 'Lesen',
      watchNow: 'Jetzt Ansehen',
      readNow: 'Jetzt Lesen',
      studio: 'Studio',
      author: 'Autor',
      status: 'Status',
      
      // No Results
      noResults: 'Keine Ergebnisse Gefunden',
      noResultsDesc: 'Wir konnten keine {type} finden, die deinen Suchkriterien entsprechen.',
      adjustSearch: 'Versuche deine Suchbegriffe oder Filtereinstellungen oben anzupassen.',
      
      // Footer
      platformDesc: 'Deine Premium-Plattform für die Entdeckung von Anime & Comics. Revolutioniere, wie du deine Lieblingsinhalte entdeckst, verfolgst und teilst durch modernste Technologie und Echtzeit-Daten.',
      learnMore: 'Mehr Über Uns Erfahren',
      quickLinks: 'Schnelllinks',
      discover: 'Entdecken',
      community: 'Community',
      platform: 'Plattform',
      realTimeDataFooter: 'Echtzeit-Daten',
      anilistIntegration: 'AniList Integration',
      nftMarketplace: 'NFT Marktplatz',
      creatorNetwork: 'Creator Netzwerk',
      personalLibrary: 'Persönliche Bibliothek',
      poweredBy: 'Betrieben von AniList API',
      builtWith: 'Gebaut mit Next.js',
      realTimeUpdates: 'Echtzeit-Updates',
      allRightsReserved: 'Alle Rechte vorbehalten'
    },
    it: {
      // Navigation
      library: 'Libreria',
      creatorHub: 'Hub Creatore',
      marketplace: 'Mercato',
      profile: 'Profilo',
      login: 'Accedi',
      logout: 'Esci',
      language: 'Lingua',
      
      // Hero Section
      welcome: 'Bentornato',
      readyDiscover: 'Pronto a scoprire la tua prossima serie preferita?',
      discoverAmazing: 'Scopri Incredibili',
      animeComics: 'Anime e Fumetti',
      personalizedCollection: 'La tua collezione personalizzata di anime e webtoon di tendenza ti aspetta. Tieni traccia dei tuoi preferiti e scopri nuove serie!',
      exploreCollections: 'Esplora collezioni curate di anime e webtoon di tendenza. La tua prossima ossessione è a un solo clic di distanza.',
      searchPlaceholder: 'Cerca anime, fumetti...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Fumetti',
      
      // Filters
      genres: 'Generi',
      allGenres: 'Tutti',
      sort: 'Ordina',
      popularity: 'Popolarità',
      rating: 'Valutazione',
      title: 'Titolo',
      year: 'Anno',
      clearAll: 'Cancella Tutto',
      filters: 'Filtri',
      clearAllFilters: 'Cancella tutti i filtri',
      selected: 'selezionati',
      
      // Content
      trendingAnime: 'Anime di Tendenza',
      trendingComics: 'Fumetti di Tendenza',
      searchResults: 'Risultati di ricerca per',
      found: 'Trovato',
      matching: 'corrispondenti alla tua ricerca',
      realTimeData: 'Dati in tempo reale da AniList • Aggiornato ogni ora',
      lastUpdated: 'Ultimo aggiornamento',
      refreshNow: 'Aggiorna Ora',
      updating: 'Aggiornamento...',
      
      // Cards
      watch: 'Guarda',
      read: 'Leggi',
      watchNow: 'Guarda Ora',
      readNow: 'Leggi Ora',
      studio: 'Studio',
      author: 'Autore',
      status: 'Stato',
      
      // No Results
      noResults: 'Nessun Risultato Trovato',
      noResultsDesc: 'Non siamo riusciti a trovare nessun {type} corrispondente ai tuoi criteri di ricerca.',
      adjustSearch: 'Prova ad aggiustare i tuoi termini di ricerca o le impostazioni del filtro sopra.',
      
      // Footer
      platformDesc: 'La tua piattaforma premium per la scoperta di anime e fumetti. Rivoluziona il modo in cui scopri, tieni traccia e condividi i tuoi contenuti preferiti attraverso tecnologia all\'avanguardia e dati in tempo reale.',
      learnMore: 'Scopri Di Più Su Di Noi',
      quickLinks: 'Link Rapidi',
      discover: 'Scopri',
      community: 'Comunità',
      platform: 'Piattaforma',
      realTimeDataFooter: 'Dati in Tempo Reale',
      anilistIntegration: 'Integrazione AniList',
      nftMarketplace: 'Mercato NFT',
      creatorNetwork: 'Rete Creatori',
      personalLibrary: 'Libreria Personale',
      poweredBy: 'Alimentato da AniList API',
      builtWith: 'Costruito con Next.js',
      realTimeUpdates: 'Aggiornamenti in Tempo Reale',
      allRightsReserved: 'Tutti i diritti riservati'
    },
    pt: {
      // Navigation
      library: 'Biblioteca',
      creatorHub: 'Hub do Criador',
      marketplace: 'Mercado',
      profile: 'Perfil',
      login: 'Entrar',
      logout: 'Sair',
      language: 'Idioma',
      
      // Hero Section
      welcome: 'Bem-vindo de volta',
      readyDiscover: 'Pronto para descobrir sua próxima série favorita?',
      discoverAmazing: 'Descubra Incríveis',
      animeComics: 'Anime e Quadrinhos',
      personalizedCollection: 'Sua coleção personalizada de anime e webtoons em alta está esperando por você. Acompanhe seus favoritos e descubra novas séries!',
      exploreCollections: 'Explore coleções curadas de anime e webtoons em alta. Sua próxima obsessão está a apenas um clique de distância.',
      searchPlaceholder: 'Buscar anime, quadrinhos...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Quadrinhos',
      
      // Filters
      genres: 'Gêneros',
      allGenres: 'Todos',
      sort: 'Ordenar',
      popularity: 'Popularidade',
      rating: 'Avaliação',
      title: 'Título',
      year: 'Ano',
      clearAll: 'Limpar Tudo',
      filters: 'Filtros',
      clearAllFilters: 'Limpar todos os filtros',
      selected: 'selecionados',
      
      // Content
      trendingAnime: 'Anime em Alta',
      trendingComics: 'Quadrinhos em Alta',
      searchResults: 'Resultados da busca por',
      found: 'Encontrado',
      matching: 'correspondendo à sua busca',
      realTimeData: 'Dados em tempo real do AniList • Atualizado a cada hora',
      lastUpdated: 'Última atualização',
      refreshNow: 'Atualizar Agora',
      updating: 'Atualizando...',
      
      // Cards
      watch: 'Assistir',
      read: 'Ler',
      watchNow: 'Assistir Agora',
      readNow: 'Ler Agora',
      studio: 'Estúdio',
      author: 'Autor',
      status: 'Status',
      
      // No Results
      noResults: 'Nenhum Resultado Encontrado',
      noResultsDesc: 'Não conseguimos encontrar nenhum {type} correspondente aos seus critérios de busca.',
      adjustSearch: 'Tente ajustar seus termos de busca ou configurações de filtro acima.',
      
      // Footer
      platformDesc: 'Sua plataforma premium de descoberta de anime e quadrinhos. Revolucione como você descobre, acompanha e compartilha seu conteúdo favorito através de tecnologia de ponta e dados em tempo real.',
      learnMore: 'Saiba Mais Sobre Nós',
      quickLinks: 'Links Rápidos',
      discover: 'Descobrir',
      community: 'Comunidade',
      platform: 'Plataforma',
      realTimeDataFooter: 'Dados em Tempo Real',
      anilistIntegration: 'Integração AniList',
      nftMarketplace: 'Mercado NFT',
      creatorNetwork: 'Rede de Criadores',
      personalLibrary: 'Biblioteca Pessoal',
      poweredBy: 'Alimentado pela API AniList',
      builtWith: 'Construído com Next.js',
      realTimeUpdates: 'Atualizações em Tempo Real',
      allRightsReserved: 'Todos os direitos reservados'
    },
    ru: {
      // Navigation
      library: 'Библиотека',
      creatorHub: 'Хаб Создателя',
      marketplace: 'Маркетплейс',
      profile: 'Профиль',
      login: 'Войти',
      logout: 'Выйти',
      language: 'Язык',
      
      // Hero Section
      welcome: 'Добро пожаловать обратно',
      readyDiscover: 'Готовы открыть свой следующий любимый сериал?',
      discoverAmazing: 'Откройте Удивительные',
      animeComics: 'Аниме и Комиксы',
      personalizedCollection: 'Ваша персонализированная коллекция трендовых аниме и вебтунов ждет вас. Отслеживайте избранное и открывайте новые сериалы!',
      exploreCollections: 'Исследуйте кураторские коллекции трендовых аниме и вебтунов. Ваша следующая одержимость всего в одном клике.',
      searchPlaceholder: 'Поиск аниме, комиксов...',
      
      // Tabs
      anime: 'Аниме',
      comics: 'Комиксы',
      
      // Filters
      genres: 'Жанры',
      allGenres: 'Все',
      sort: 'Сортировка',
      popularity: 'Популярность',
      rating: 'Рейтинг',
      title: 'Название',
      year: 'Год',
      clearAll: 'Очистить Все',
      filters: 'Фильтры',
      clearAllFilters: 'Очистить все фильтры',
      selected: 'выбрано',
      
      // Content
      trendingAnime: 'Трендовые Аниме',
      trendingComics: 'Трендовые Комиксы',
      searchResults: 'Результаты поиска для',
      found: 'Найдено',
      matching: 'соответствующих вашему поиску',
      realTimeData: 'Данные в реальном времени от AniList • Обновляется каждый час',
      lastUpdated: 'Последнее обновление',
      refreshNow: 'Обновить Сейчас',
      updating: 'Обновление...',
      
      // Cards
      watch: 'Смотреть',
      read: 'Читать',
      watchNow: 'Смотреть Сейчас',
      readNow: 'Читать Сейчас',
      studio: 'Студия',
      author: 'Автор',
      status: 'Статус',
      
      // No Results
      noResults: 'Результатов Не Найдено',
      noResultsDesc: 'Мы не смогли найти ни одного {type}, соответствующего вашим критериям поиска.',
      adjustSearch: 'Попробуйте изменить условия поиска или настройки фильтра выше.',
      
      // Footer
      platformDesc: 'Ваша премиум-платформа для открытия аниме и комиксов. Революционизируйте то, как вы открываете, отслеживаете и делитесь любимым контентом через передовые технологии и данные в реальном времени.',
      learnMore: 'Узнать Больше О Нас',
      quickLinks: 'Быстрые Ссылки',
      discover: 'Открыть',
      community: 'Сообщество',
      platform: 'Платформа',
      realTimeDataFooter: 'Данные в Реальном Времени',
      anilistIntegration: 'Интеграция AniList',
      nftMarketplace: 'NFT Маркетплейс',
      creatorNetwork: 'Сеть Создателей',
      personalLibrary: 'Личная Библиотека',
      poweredBy: 'На основе AniList API',
      builtWith: 'Создано с Next.js',
      realTimeUpdates: 'Обновления в Реальном Времени',
      allRightsReserved: 'Все права защищены'
    },
    ar: {
      // Navigation
      library: 'المكتبة',
      creatorHub: 'مركز المبدعين',
      marketplace: 'السوق',
      profile: 'الملف الشخصي',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      language: 'اللغة',
      
      // Hero Section
      welcome: 'مرحباً بعودتك',
      readyDiscover: 'هل أنت مستعد لاكتشاف مسلسلك المفضل التالي؟',
      discoverAmazing: 'اكتشف المذهل',
      animeComics: 'الأنمي والكوميكس',
      personalizedCollection: 'مجموعتك الشخصية من الأنمي والويبتون الرائجة في انتظارك. تتبع المفضلة لديك واكتشف مسلسلات جديدة!',
      exploreCollections: 'استكشف مجموعات منسقة من الأنمي والويبتون الرائجة. هوسك القادم على بعد نقرة واحدة.',
      searchPlaceholder: 'البحث عن أنمي، كوميكس...',
      
      // Tabs
      anime: 'أنمي',
      comics: 'كوميكس',
      
      // Filters
      genres: 'الأنواع',
      allGenres: 'الكل',
      sort: 'ترتيب',
      popularity: 'الشعبية',
      rating: 'التقييم',
      title: 'العنوان',
      year: 'السنة',
      clearAll: 'مسح الكل',
      filters: 'المرشحات',
      clearAllFilters: 'مسح جميع المرشحات',
      selected: 'مختار',
      
      // Content
      trendingAnime: 'الأنمي الرائج',
      trendingComics: 'الكوميكس الرائج',
      searchResults: 'نتائج البحث عن',
      found: 'وُجد',
      matching: 'مطابق لبحثك',
      realTimeData: 'بيانات فورية من AniList • يتم التحديث كل ساعة',
      lastUpdated: 'آخر تحديث',
      refreshNow: 'تحديث الآن',
      updating: 'جاري التحديث...',
      
      // Cards
      watch: 'مشاهدة',
      read: 'قراءة',
      watchNow: 'شاهد الآن',
      readNow: 'اقرأ الآن',
      studio: 'الاستوديو',
      author: 'المؤلف',
      status: 'الحالة',
      
      // No Results
      noResults: 'لم يتم العثور على نتائج',
      noResultsDesc: 'لم نتمكن من العثور على أي {type} مطابق لمعايير البحث الخاصة بك.',
      adjustSearch: 'حاول تعديل مصطلحات البحث أو إعدادات المرشح أعلاه.',
      
      // Footer
      platformDesc: 'منصتك المتميزة لاكتشاف الأنمي والكوميكس. ثوِّر طريقة اكتشافك وتتبعك ومشاركتك للمحتوى المفضل لديك من خلال التكنولوجيا المتطورة والبيانات الفورية.',
      learnMore: 'تعرف على المزيد عنا',
      quickLinks: 'روابط سريعة',
      discover: 'اكتشف',
      community: 'المجتمع',
      platform: 'المنصة',
      realTimeDataFooter: 'البيانات الفورية',
      anilistIntegration: 'تكامل AniList',
      nftMarketplace: 'سوق NFT',
      creatorNetwork: 'شبكة المبدعين',
      personalLibrary: 'المكتبة الشخصية',
      poweredBy: 'مدعوم بواسطة AniList API',
      builtWith: 'مبني بـ Next.js',
      realTimeUpdates: 'التحديثات الفورية',
      allRightsReserved: 'جميع الحقوق محفوظة'
    },
    hi: {
      // Navigation
      library: 'लाइब्रेरी',
      creatorHub: 'क्रिएटर हब',
      marketplace: 'मार्केटप्लेस',
      profile: 'प्रोफाइल',
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      language: 'भाषा',
      
      // Hero Section
      welcome: 'वापसी पर स्वागत',
      readyDiscover: 'अपनी अगली पसंदीदा सीरीज़ खोजने के लिए तैयार हैं?',
      discoverAmazing: 'अद्भुत खोजें',
      animeComics: 'एनीमे और कॉमिक्स',
      personalizedCollection: 'ट्रेंडिंग एनीमे और वेबटून का आपका व्यक्तिगत संग्रह आपका इंतज़ार कर रहा है। अपने पसंदीदा को ट्रैक करें और नई सीरीज़ खोजें!',
      exploreCollections: 'ट्रेंडिंग एनीमे और वेबटून के क्यूरेटेड संग्रह एक्सप्लोर करें। आपका अगला जुनून बस एक क्लिक दूर है।',
      searchPlaceholder: 'एनीमे, कॉमिक्स खोजें...',
      
      // Tabs
      anime: 'एनीमे',
      comics: 'कॉमिक्स',
      
      // Filters
      genres: 'शैलियाँ',
      allGenres: 'सभी',
      sort: 'क्रमबद्ध करें',
      popularity: 'लोकप्रियता',
      rating: 'रेटिंग',
      title: 'शीर्षक',
      year: 'वर्ष',
      clearAll: 'सभी साफ करें',
      filters: 'फ़िल्टर',
      clearAllFilters: 'सभी फ़िल्टर साफ करें',
      selected: 'चयनित',
      
      // Content
      trendingAnime: 'ट्रेंडिंग एनीमे',
      trendingComics: 'ट्रेंडिंग कॉमिक्स',
      searchResults: 'खोज परिणाम:',
      found: 'मिला',
      matching: 'आपकी खोज से मेल खाता है',
      realTimeData: 'AniList से रियल-टाइम डेटा • हर घंटे अपडेट',
      lastUpdated: 'अंतिम अपडेट',
      refreshNow: 'अभी रिफ्रेश करें',
      updating: 'अपडेट हो रहा है...',
      
      // Cards
      watch: 'देखें',
      read: 'पढ़ें',
      watchNow: 'अभी देखें',
      readNow: 'अभी पढ़ें',
      studio: 'स्टूडियो',
      author: 'लेखक',
      status: 'स्थिति',
      
      // No Results
      noResults: 'कोई परिणाम नहीं मिला',
      noResultsDesc: 'हमें आपके खोज मानदंड से मेल खाने वाला कोई {type} नहीं मिला।',
      adjustSearch: 'ऊपर अपने खोज शब्दों या फ़िल्टर सेटिंग्स को समायोजित करने का प्रयास करें।',
      
      // Footer
      platformDesc: 'आपका प्रीमियम एनीमे और कॉमिक्स डिस्कवरी प्लेटफॉर्म। अत्याधुनिक तकनीक और रियल-टाइम डेटा के माध्यम से अपनी पसंदीदा सामग्री को खोजने, ट्रैक करने और साझा करने के तरीके में क्रांति लाएं।',
      learnMore: 'हमारे बारे में और जानें',
      quickLinks: 'त्वरित लिंक',
      discover: 'खोजें',
      community: 'समुदाय',
      platform: 'प्लेटफॉर्म',
      realTimeDataFooter: 'रियल-टाइम डेटा',
      anilistIntegration: 'AniList एकीकरण',
      nftMarketplace: 'NFT मार्केटप्लेस',
      creatorNetwork: 'क्रिएटर नेटवर्क',
      personalLibrary: 'व्यक्तिगत लाइब्रेरी',
      poweredBy: 'AniList API द्वारा संचालित',
      builtWith: 'Next.js के साथ निर्मित',
      realTimeUpdates: 'रियल-टाइम अपडेट',
      allRightsReserved: 'सभी अधिकार सुरक्षित'
    },
    th: {
      // Navigation
      library: 'คลัง',
      creatorHub: 'ฮับครีเอเตอร์',
      marketplace: 'ตลาด',
      profile: 'โปรไฟล์',
      login: 'เข้าสู่ระบบ',
      logout: 'ออกจากระบบ',
      language: 'ภาษา',
      
      // Hero Section
      welcome: 'ยินดีต้อนรับกลับ',
      readyDiscover: 'พร้อมที่จะค้นพบซีรีส์ที่ชื่นชอบถัดไปของคุณแล้วหรือยัง?',
      discoverAmazing: 'ค้นพบสิ่งน่าทึ่ง',
      animeComics: 'อนิเมะและการ์ตูน',
      personalizedCollection: 'คอลเลกชันส่วนบุคคลของอนิเมะและเว็บตูนยอดนิยมรออยู่ ติดตามรายการโปรดและค้นพบซีรีส์ใหม่!',
      exploreCollections: 'สำรวจคอลเลกชันที่คัดสรรแล้วของอนิเมะและเว็บตูนยอดนิยม ความหลงใหลครั้งต่อไปของคุณอยู่ห่างออกไปเพียงคลิกเดียว',
      searchPlaceholder: 'ค้นหาอนิเมะ, การ์ตูน...',
      
      // Tabs
      anime: 'อนิเมะ',
      comics: 'การ์ตูน',
      
      // Filters
      genres: 'ประเภท',
      allGenres: 'ทั้งหมด',
      sort: 'เรียง',
      popularity: 'ความนิยม',
      rating: 'คะแนน',
      title: 'ชื่อเรื่อง',
      year: 'ปี',
      clearAll: 'ล้างทั้งหมด',
      filters: 'ตัวกรอง',
      clearAllFilters: 'ล้างตัวกรองทั้งหมด',
      selected: 'เลือก',
      
      // Content
      trendingAnime: 'อนิเมะยอดนิยม',
      trendingComics: 'การ์ตูนยอดนิยม',
      searchResults: 'ผลการค้นหาสำหรับ',
      found: 'พบ',
      matching: 'ที่ตรงกับการค้นหาของคุณ',
      realTimeData: 'ข้อมูลเรียลไทม์จาก AniList • อัปเดตทุกชั่วโมง',
      lastUpdated: 'อัปเดตล่าสุด',
      refreshNow: 'รีเฟรชตอนนี้',
      updating: 'กำลังอัปเดต...',
      
      // Cards
      watch: 'ดู',
      read: 'อ่าน',
      watchNow: 'ดูตอนนี้',
      readNow: 'อ่านตอนนี้',
      studio: 'สตูดิโอ',
      author: 'ผู้แต่ง',
      status: 'สถานะ',
      
      // No Results
      noResults: 'ไม่พบผลลัพธ์',
      noResultsDesc: 'เราไม่พบ {type} ที่ตรงกับเกณฑ์การค้นหาของคุณ',
      adjustSearch: 'ลองปรับแต่งคำค้นหาหรือการตั้งค่าตัวกรองข้างต้น',
      
      // Footer
      platformDesc: 'แพลตฟอร์มค้นพบอนิเมะและการ์ตูนพรีเมียมของคุณ ปฏิวัติวิธีที่คุณค้นพบ ติดตาม และแบ่งปันเนื้อหาโปรดผ่านเทคโนโลยีล้ำสมัยและข้อมูลเรียลไทม์',
      learnMore: 'เรียนรู้เพิ่มเติมเกี่ยวกับเรา',
      quickLinks: 'ลิงก์ด่วน',
      discover: 'ค้นพบ',
      community: 'ชุมชน',
      platform: 'แพลตฟอร์ม',
      realTimeDataFooter: 'ข้อมูลเรียลไทม์',
      anilistIntegration: 'การรวม AniList',
      nftMarketplace: 'ตลาด NFT',
      creatorNetwork: 'เครือข่ายผู้สร้าง',
      personalLibrary: 'คลังส่วนบุคคล',
      poweredBy: 'ขับเคลื่อนโดย AniList API',
      builtWith: 'สร้างด้วย Next.js',
      realTimeUpdates: 'อัปเดตเรียลไทม์',
      allRightsReserved: 'สงวนลิขสิทธิ์'
    },
    vi: {
      // Navigation  
      library: 'Thư viện',
      creatorHub: 'Trung tâm Sáng tạo',
      marketplace: 'Chợ',
      profile: 'Hồ sơ',
      login: 'Đăng nhập',
      logout: 'Đăng xuất', 
      language: 'Ngôn ngữ',
      
      // Hero Section
      welcome: 'Chào mừng trở lại',
      readyDiscover: 'Sẵn sàng khám phá series yêu thích tiếp theo chưa?',
      discoverAmazing: 'Khám phá Tuyệt vời',
      animeComics: 'Anime & Truyện tranh',
      personalizedCollection: 'Bộ sưu tập cá nhân hóa anime và webtoon xu hướng đang chờ bạn. Theo dõi yêu thích và khám phá series mới!',
      exploreCollections: 'Khám phá bộ sưu tập được tuyển chọn của anime và webtoon xu hướng. Niềm đam mê tiếp theo chỉ cách một cú nhấp chuột.',
      searchPlaceholder: 'Tìm anime, truyện tranh...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Truyện tranh',
      
      // Filters
      genres: 'Thể loại',
      allGenres: 'Tất cả',
      sort: 'Sắp xếp',
      popularity: 'Phổ biến',
      rating: 'Đánh giá',
      title: 'Tiêu đề',
      year: 'Năm',
      clearAll: 'Xóa tất cả',
      filters: 'Bộ lọc',
      clearAllFilters: 'Xóa tất cả bộ lọc',
      selected: 'đã chọn',
      
      // Content
      trendingAnime: 'Anime Xu hướng',
      trendingComics: 'Truyện tranh Xu hướng',
      searchResults: 'Kết quả tìm kiếm cho',
      found: 'Tìm thấy',
      matching: 'phù hợp với tìm kiếm của bạn',
      realTimeData: 'Dữ liệu thời gian thực từ AniList • Cập nhật mỗi giờ',
      lastUpdated: 'Cập nhật lần cuối',
      refreshNow: 'Làm mới ngay',
      updating: 'Đang cập nhật...',
      
      // Cards
      watch: 'Xem',
      read: 'Đọc',
      watchNow: 'Xem ngay',
      readNow: 'Đọc ngay',
      studio: 'Studio',
      author: 'Tác giả',
      status: 'Trạng thái',
      
      // No Results
      noResults: 'Không tìm thấy kết quả',
      noResultsDesc: 'Chúng tôi không thể tìm thấy {type} nào phù hợp với tiêu chí tìm kiếm của bạn.',
      adjustSearch: 'Hãy thử điều chỉnh từ khóa tìm kiếm hoặc cài đặt bộ lọc ở trên.',
      
      // Footer
      platformDesc: 'Nền tảng khám phá anime & truyện tranh cao cấp của bạn. Cách mạng hóa cách bạn khám phá, theo dõi và chia sẻ nội dung yêu thích thông qua công nghệ tiên tiến và dữ liệu thời gian thực.',
      learnMore: 'Tìm hiểu thêm về chúng tôi',
      quickLinks: 'Liên kết nhanh',
      discover: 'Khám phá',
      community: 'Cộng đồng',
      platform: 'Nền tảng',
      realTimeDataFooter: 'Dữ liệu Thời gian thực',
      anilistIntegration: 'Tích hợp AniList',
      nftMarketplace: 'Chợ NFT',
      creatorNetwork: 'Mạng Sáng tạo',
      personalLibrary: 'Thư viện Cá nhân',
      poweredBy: 'Được hỗ trợ bởi AniList API',
      builtWith: 'Xây dựng với Next.js',
      realTimeUpdates: 'Cập nhật Thời gian thực',
      allRightsReserved: 'Bảo lưu mọi quyền'
    },
    id: {
      // Navigation
      library: 'Perpustakaan',
      creatorHub: 'Hub Kreator',
      marketplace: 'Pasar',
      profile: 'Profil',
      login: 'Masuk',
      logout: 'Keluar',
      language: 'Bahasa',
      
      // Hero Section
      welcome: 'Selamat datang kembali',
      readyDiscover: 'Siap menemukan serial favorit berikutnya?',
      discoverAmazing: 'Temukan yang Menakjubkan',
      animeComics: 'Anime & Komik',
      personalizedCollection: 'Koleksi anime dan webtoon trending yang dipersonalisasi menanti Anda. Lacak favorit dan temukan serial baru!',
      exploreCollections: 'Jelajahi koleksi anime dan webtoon trending yang dikurasi. Obsesi berikutnya hanya dengan satu klik.',
      searchPlaceholder: 'Cari anime, komik...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Komik',
      
      // Filters
      genres: 'Genre',
      allGenres: 'Semua',
      sort: 'Urutkan',
      popularity: 'Popularitas',
      rating: 'Rating',
      title: 'Judul',
      year: 'Tahun',
      clearAll: 'Hapus Semua',
      filters: 'Filter',
      clearAllFilters: 'Hapus semua filter',
      selected: 'dipilih',
      
      // Content
      trendingAnime: 'Anime Trending',
      trendingComics: 'Komik Trending',
      searchResults: 'Hasil pencarian untuk',
      found: 'Ditemukan',
      matching: 'sesuai pencarian Anda',
      realTimeData: 'Data real-time dari AniList • Diperbarui setiap jam',
      lastUpdated: 'Terakhir diperbarui',
      refreshNow: 'Refresh Sekarang',
      updating: 'Memperbarui...',
      
      // Cards
      watch: 'Tonton',
      read: 'Baca',
      watchNow: 'Tonton Sekarang',
      readNow: 'Baca Sekarang',
      studio: 'Studio',
      author: 'Penulis',
      status: 'Status',
      
      // No Results
      noResults: 'Tidak Ada Hasil Ditemukan',
      noResultsDesc: 'Kami tidak dapat menemukan {type} yang sesuai dengan kriteria pencarian Anda.',
      adjustSearch: 'Coba sesuaikan kata kunci pencarian atau pengaturan filter di atas.',
      
      // Footer
      platformDesc: 'Platform penemuan anime & komik premium Anda. Revolusionisasi cara Anda menemukan, melacak, dan berbagi konten favorit melalui teknologi mutakhir dan data real-time.',
      learnMore: 'Pelajari Lebih Lanjut Tentang Kami',
      quickLinks: 'Tautan Cepat',
      discover: 'Temukan',
      community: 'Komunitas',
      platform: 'Platform',
      realTimeDataFooter: 'Data Real-time',
      anilistIntegration: 'Integrasi AniList',
      nftMarketplace: 'Pasar NFT',
      creatorNetwork: 'Jaringan Kreator',
      personalLibrary: 'Perpustakaan Pribadi',
      poweredBy: 'Didukung oleh AniList API',
      builtWith: 'Dibangun dengan Next.js',
      realTimeUpdates: 'Pembaruan Real-time',
      allRightsReserved: 'Semua hak dilindungi'
    },
    ms: {
      // Navigation
      library: 'Perpustakaan',
      creatorHub: 'Hub Pencipta',
      marketplace: 'Pasar Raya',
      profile: 'Profil',
      login: 'Log Masuk',
      logout: 'Log Keluar',
      language: 'Bahasa',
      
      // Hero Section
      welcome: 'Selamat kembali',
      readyDiscover: 'Bersedia untuk menemui siri kegemaran seterusnya?',
      discoverAmazing: 'Temui yang Menakjubkan',
      animeComics: 'Anime & Komik',
      personalizedCollection: 'Koleksi peribadi anime dan webtoon yang sedang trending menanti anda. Jejaki kegemaran dan temui siri baharu!',
      exploreCollections: 'Terokai koleksi dipilih anime dan webtoon trending. Obsesi seterusnya hanya satu klik sahaja.',
      searchPlaceholder: 'Cari anime, komik...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Komik',
      
      // Filters
      genres: 'Genre',
      allGenres: 'Semua',
      sort: 'Susun',
      popularity: 'Populariti',
      rating: 'Penilaian',
      title: 'Tajuk',
      year: 'Tahun',
      clearAll: 'Padam Semua',
      filters: 'Penapis',
      clearAllFilters: 'Padam semua penapis',
      selected: 'dipilih',
      
      // Content
      trendingAnime: 'Anime Trending',
      trendingComics: 'Komik Trending',
      searchResults: 'Hasil carian untuk',
      found: 'Dijumpai',
      matching: 'sepadan dengan carian anda',
      realTimeData: 'Data masa nyata daripada AniList • Dikemaskini setiap jam',
      lastUpdated: 'Dikemaskini terakhir',
      refreshNow: 'Muat Semula Sekarang',
      updating: 'Mengemaskini...',
      
      // Cards
      watch: 'Tonton',
      read: 'Baca',
      watchNow: 'Tonton Sekarang',
      readNow: 'Baca Sekarang',
      studio: 'Studio',
      author: 'Pengarang',
      status: 'Status',
      
      // No Results
      noResults: 'Tiada Hasil Dijumpai',
      noResultsDesc: 'Kami tidak dapat mencari {type} yang sepadan dengan kriteria carian anda.',
      adjustSearch: 'Cuba laraskan istilah carian atau tetapan penapis di atas.',
      
      // Footer
      platformDesc: 'Platform penemuan anime & komik premium anda. Revolusikan cara anda menemui, menjejaki, dan berkongsi kandungan kegemaran melalui teknologi termaju dan data masa nyata.',
      learnMore: 'Ketahui Lebih Lanjut Tentang Kami',
      quickLinks: 'Pautan Pantas',
      discover: 'Temui',
      community: 'Komuniti',
      platform: 'Platform',
      realTimeDataFooter: 'Data Masa Nyata',
      anilistIntegration: 'Integrasi AniList',
      nftMarketplace: 'Pasar NFT',
      creatorNetwork: 'Rangkaian Pencipta',
      personalLibrary: 'Perpustakaan Peribadi',
      poweredBy: 'Dikuasakan oleh AniList API',
      builtWith: 'Dibina dengan Next.js',
      realTimeUpdates: 'Kemaskini Masa Nyata',
      allRightsReserved: 'Semua hak terpelihara'
    },
    tr: {
      // Navigation
      library: 'Kütüphane',
      creatorHub: 'İçerik Üreticisi Merkezi',
      marketplace: 'Pazar Yeri',
      profile: 'Profil',
      login: 'Giriş Yap',
      logout: 'Çıkış Yap',
      language: 'Dil',
      
      // Hero Section
      welcome: 'Tekrar hoş geldiniz',
      readyDiscover: 'Bir sonraki favori dizinizi keşfetmeye hazır mısınız?',
      discoverAmazing: 'Muhteşemi Keşfedin',
      animeComics: 'Anime ve Çizgi Roman',
      personalizedCollection: 'Kişiselleştirilmiş trend anime ve webtoon koleksiyonunuz sizi bekliyor. Favorilerinizi takip edin ve yeni diziler keşfedin!',
      exploreCollections: 'Trend anime ve webtoon\'ların seçilmiş koleksiyonlarını keşfedin. Bir sonraki tutkununuz sadece bir tık uzakta.',
      searchPlaceholder: 'Anime, çizgi roman ara...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Çizgi Roman',
      
      // Filters
      genres: 'Türler',
      allGenres: 'Tümü',
      sort: 'Sırala',
      popularity: 'Popülerlik',
      rating: 'Değerlendirme',
      title: 'Başlık',
      year: 'Yıl',
      clearAll: 'Tümünü Temizle',
      filters: 'Filtreler',
      clearAllFilters: 'Tüm filtreleri temizle',
      selected: 'seçili',
      
      // Content
      trendingAnime: 'Trend Anime',
      trendingComics: 'Trend Çizgi Romanlar',
      searchResults: 'Arama sonuçları:',
      found: 'Bulundu',
      matching: 'aramanızla eşleşen',
      realTimeData: 'AniList\'ten gerçek zamanlı veri • Saatte bir güncellenir',
      lastUpdated: 'Son güncelleme',
      refreshNow: 'Şimdi Yenile',
      updating: 'Güncelleniyor...',
      
      // Cards
      watch: 'İzle',
      read: 'Oku',
      watchNow: 'Şimdi İzle',
      readNow: 'Şimdi Oku',
      studio: 'Stüdyo',
      author: 'Yazar',
      status: 'Durum',
      
      // No Results
      noResults: 'Sonuç Bulunamadı',
      noResultsDesc: 'Arama kriterlerinize uygun {type} bulamadık.',
      adjustSearch: 'Yukarıdaki arama terimlerinizi veya filtre ayarlarınızı ayarlamayı deneyin.',
      
      // Footer
      platformDesc: 'Premium anime ve çizgi roman keşif platformunuz. En son teknoloji ve gerçek zamanlı verilerle favori içeriklerinizi keşfetme, takip etme ve paylaşma şeklinizi devrimleştirin.',
      learnMore: 'Hakkımızda Daha Fazla Bilgi',
      quickLinks: 'Hızlı Bağlantılar',
      discover: 'Keşfet',
      community: 'Topluluk',
      platform: 'Platform',
      realTimeDataFooter: 'Gerçek Zamanlı Veri',
      anilistIntegration: 'AniList Entegrasyonu',
      nftMarketplace: 'NFT Pazar Yeri',
      creatorNetwork: 'İçerik Üreticisi Ağı',
      personalLibrary: 'Kişisel Kütüphane',
      poweredBy: 'AniList API tarafından desteklenir',
      builtWith: 'Next.js ile inşa edildi',
      realTimeUpdates: 'Gerçek Zamanlı Güncellemeler',
      allRightsReserved: 'Tüm hakları saklıdır'
    },
    nl: {
      // Navigation
      library: 'Bibliotheek',
      creatorHub: 'Maker Hub',
      marketplace: 'Marktplaats',
      profile: 'Profiel',
      login: 'Inloggen',
      logout: 'Uitloggen',
      language: 'Taal',
      
      // Hero Section
      welcome: 'Welkom terug',
      readyDiscover: 'Klaar om je volgende favoriete serie te ontdekken?',
      discoverAmazing: 'Ontdek Geweldige',
      animeComics: 'Anime & Strips',
      personalizedCollection: 'Je gepersonaliseerde collectie van trending anime en webtoons wacht op je. Volg je favorieten en ontdek nieuwe series!',
      exploreCollections: 'Verken gecureerde collecties van trending anime en webtoons. Je volgende obsessie is slechts één klik verwijderd.',
      searchPlaceholder: 'Zoek anime, strips...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Strips',
      
      // Filters
      genres: 'Genres',
      allGenres: 'Alle',
      sort: 'Sorteren',
      popularity: 'Populariteit',
      rating: 'Beoordeling',
      title: 'Titel',
      year: 'Jaar',
      clearAll: 'Alles Wissen',
      filters: 'Filters',
      clearAllFilters: 'Alle filters wissen',
      selected: 'geselecteerd',
      
      // Content
      trendingAnime: 'Trending Anime',
      trendingComics: 'Trending Strips',
      searchResults: 'Zoekresultaten voor',
      found: 'Gevonden',
      matching: 'die overeenkomen met je zoekopdracht',
      realTimeData: 'Real-time data van AniList • Elk uur bijgewerkt',
      lastUpdated: 'Laatst bijgewerkt',
      refreshNow: 'Nu Vernieuwen',
      updating: 'Bijwerken...',
      
      // Cards
      watch: 'Bekijken',
      read: 'Lezen',
      watchNow: 'Nu Bekijken',
      readNow: 'Nu Lezen',
      studio: 'Studio',
      author: 'Auteur',
      status: 'Status',
      
      // No Results
      noResults: 'Geen Resultaten Gevonden',
      noResultsDesc: 'We konden geen {type} vinden die overeenkomen met je zoekcriteria.',
      adjustSearch: 'Probeer je zoektermen of filterinstellingen hierboven aan te passen.',
      
      // Footer
      platformDesc: 'Je premium anime & strips ontdekkingsplatform. Revolutioneer hoe je je favoriete content ontdekt, volgt en deelt door middel van geavanceerde technologie en real-time data.',
      learnMore: 'Meer Over Ons Leren',
      quickLinks: 'Snelle Links',
      discover: 'Ontdekken',
      community: 'Gemeenschap',
      platform: 'Platform',
      realTimeDataFooter: 'Real-time Data',
      anilistIntegration: 'AniList Integratie',
      nftMarketplace: 'NFT Marktplaats',
      creatorNetwork: 'Makernetwerk',
      personalLibrary: 'Persoonlijke Bibliotheek',
      poweredBy: 'Aangedreven door AniList API',
      builtWith: 'Gebouwd met Next.js',
      realTimeUpdates: 'Real-time Updates',
      allRightsReserved: 'Alle rechten voorbehouden'
    },
    sv: {
      // Navigation
      library: 'Bibliotek',
      creatorHub: 'Skapare Hub',
      marketplace: 'Marknadsplats',
      profile: 'Profil',
      login: 'Logga in',
      logout: 'Logga ut',
      language: 'Språk',
      
      // Hero Section
      welcome: 'Välkommen tillbaka',
      readyDiscover: 'Redo att upptäcka din nästa favoritserie?',
      discoverAmazing: 'Upptäck Fantastiska',
      animeComics: 'Anime & Serier',
      personalizedCollection: 'Din personliga samling av trendande anime och webtoons väntar på dig. Spåra dina favoriter och upptäck nya serier!',
      exploreCollections: 'Utforska kurerade samlingar av trendande anime och webtoons. Din nästa besatthet är bara ett klick bort.',
      searchPlaceholder: 'Sök anime, serier...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Serier',
      
      // Filters
      genres: 'Genrer',
      allGenres: 'Alla',
      sort: 'Sortera',
      popularity: 'Popularitet',
      rating: 'Betyg',
      title: 'Titel',
      year: 'År',
      clearAll: 'Rensa Alla',
      filters: 'Filter',
      clearAllFilters: 'Rensa alla filter',
      selected: 'valda',
      
      // Content
      trendingAnime: 'Trendande Anime',
      trendingComics: 'Trendande Serier',
      searchResults: 'Sökresultat för',
      found: 'Hittade',
      matching: 'som matchar din sökning',
      realTimeData: 'Realtidsdata från AniList • Uppdaterad varje timme',
      lastUpdated: 'Senast uppdaterad',
      refreshNow: 'Uppdatera Nu',
      updating: 'Uppdaterar...',
      
      // Cards
      watch: 'Titta',
      read: 'Läs',
      watchNow: 'Titta Nu',
      readNow: 'Läs Nu',
      studio: 'Studio',
      author: 'Författare',
      status: 'Status',
      
      // No Results
      noResults: 'Inga Resultat Hittades',
      noResultsDesc: 'Vi kunde inte hitta några {type} som matchar dina sökkriterier.',
      adjustSearch: 'Försök justera dina söktermer eller filterinställningar ovan.',
      
      // Footer
      platformDesc: 'Din premium anime & serie-upptäcktsplattform. Revolutionera hur du upptäcker, spårar och delar ditt favoritinnehåll genom banbrytande teknik och realtidsdata.',
      learnMore: 'Lär Dig Mer Om Oss',
      quickLinks: 'Snabblänkar',
      discover: 'Upptäck',
      community: 'Gemenskap',
      platform: 'Plattform',
      realTimeDataFooter: 'Realtidsdata',
      anilistIntegration: 'AniList Integration',
      nftMarketplace: 'NFT Marknadsplats',
      creatorNetwork: 'Skaparnätverk',
      personalLibrary: 'Personligt Bibliotek',
      poweredBy: 'Drivs av AniList API',
      builtWith: 'Byggd med Next.js',
      realTimeUpdates: 'Realtidsuppdateringar',
      allRightsReserved: 'Alla rättigheter förbehållna'
    },
    pl: {
      // Navigation
      library: 'Biblioteka',
      creatorHub: 'Centrum Twórcy',
      marketplace: 'Rynek',
      profile: 'Profil',
      login: 'Zaloguj',
      logout: 'Wyloguj',
      language: 'Język',
      
      // Hero Section
      welcome: 'Witaj ponownie',
      readyDiscover: 'Gotowy odkryć swoją kolejną ulubioną serię?',
      discoverAmazing: 'Odkryj Niesamowite',
      animeComics: 'Anime i Komiksy',
      personalizedCollection: 'Twoja spersonalizowana kolekcja trendingowych anime i webtoonów czeka na Ciebie. Śledź ulubione i odkrywaj nowe serie!',
      exploreCollections: 'Eksploruj wyselekcjonowane kolekcje trendingowych anime i webtoonów. Twoja kolejna obsesja jest tylko jedno kliknięcie dalej.',
      searchPlaceholder: 'Szukaj anime, komiksy...',
      
      // Tabs
      anime: 'Anime',
      comics: 'Komiksy',
      
      // Filters
      genres: 'Gatunki',
      allGenres: 'Wszystkie',
      sort: 'Sortuj',
      popularity: 'Popularność',
      rating: 'Ocena',
      title: 'Tytuł',
      year: 'Rok',
      clearAll: 'Wyczyść Wszystko',
      filters: 'Filtry',
      clearAllFilters: 'Wyczyść wszystkie filtry',
      selected: 'wybrane',
      
      // Content
      trendingAnime: 'Trendingowe Anime',
      trendingComics: 'Trendingowe Komiksy',
      searchResults: 'Wyniki wyszukiwania dla',
      found: 'Znaleziono',
      matching: 'pasujących do Twojego wyszukiwania',
      realTimeData: 'Dane w czasie rzeczywistym z AniList • Aktualizowane co godzinę',
      lastUpdated: 'Ostatnio zaktualizowano',
      refreshNow: 'Odśwież Teraz',
      updating: 'Aktualizowanie...',
      
      // Cards
      watch: 'Oglądaj',
      read: 'Czytaj',
      watchNow: 'Oglądaj Teraz',
      readNow: 'Czytaj Teraz',
      studio: 'Studio',
      author: 'Autor',
      status: 'Status',
      
      // No Results
      noResults: 'Nie Znaleziono Wyników',
      noResultsDesc: 'Nie mogliśmy znaleźć żadnych {type} pasujących do Twoich kryteriów wyszukiwania.',
      adjustSearch: 'Spróbuj dostosować swoje terminy wyszukiwania lub ustawienia filtrów powyżej.',
      
      // Footer
      platformDesc: 'Twoja premium platforma odkrywania anime i komiksów. Zrewolucjonizuj sposób, w jaki odkrywasz, śledzisz i dzielisz się swoimi ulubionymi treściami dzięki najnowocześniejszej technologii i danym w czasie rzeczywistym.',
      learnMore: 'Dowiedz Się Więcej O Nas',
      quickLinks: 'Szybkie Linki',
      discover: 'Odkryj',
      community: 'Społeczność',
      platform: 'Platforma',
      realTimeDataFooter: 'Dane w Czasie Rzeczywistym',
      anilistIntegration: 'Integracja AniList',
      nftMarketplace: 'Rynek NFT',
      creatorNetwork: 'Sieć Twórców',
      personalLibrary: 'Osobista Biblioteka',
      poweredBy: 'Napędzane przez AniList API',
      builtWith: 'Zbudowane z Next.js',
      realTimeUpdates: 'Aktualizacje w Czasie Rzeczywistym',
      allRightsReserved: 'Wszystkie prawa zastrzeżone'
    }
  };

  // Get translated text
  const t = (key, params = {}) => {
    let translation = translations[selectedLanguage]?.[key] || translations.en[key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  // AI Search Engine - Client-side Intelligence
  const aiSearchEngine = {
    // Synonym mapping for semantic search
    synonyms: {
      action: ['fighting', 'battle', 'combat', 'war', 'martial arts', 'adventure'],
      romance: ['love', 'relationship', 'dating', 'romantic', 'couple'],
      comedy: ['funny', 'humor', 'laugh', 'hilarious', 'comic'],
      drama: ['sad', 'emotional', 'tragic', 'serious', 'melodrama'],
      fantasy: ['magic', 'magical', 'wizards', 'dragons', 'supernatural'],
      scifi: ['science fiction', 'space', 'future', 'technology', 'robot'],
      horror: ['scary', 'fear', 'ghost', 'monster', 'terror'],
      slice: ['daily life', 'everyday', 'realistic', 'mundane'],
      school: ['student', 'academy', 'education', 'high school'],
      sport: ['sports', 'competition', 'team', 'athlete'],
      mecha: ['robot', 'giant robot', 'gundam', 'mechanical'],
      music: ['musical', 'band', 'singing', 'idol'],
      mystery: ['detective', 'investigation', 'crime', 'puzzle'],
      psychological: ['mind', 'mental', 'psycho', 'brain'],
      thriller: ['suspense', 'tension', 'exciting', 'intense']
    },

    // Mood-based search mapping
    moods: {
      happy: ['comedy', 'slice of life', 'romance'],
      sad: ['drama', 'tragedy', 'melodrama'],
      excited: ['action', 'adventure', 'sports'],
      scared: ['horror', 'thriller', 'psychological'],
      nostalgic: ['slice of life', 'drama', 'school'],
      amazed: ['fantasy', 'sci-fi', 'supernatural'],
      relaxed: ['slice of life', 'comedy', 'music']
    },

    // Intent detection patterns
    intentPatterns: {
      recommendation: /(?:recommend|suggest|similar to|like|find me)/i,
      mood: /(?:feeling|mood|want something|looking for)/i,
      genre: /(?:genre|type|category|kind of)/i,
      popular: /(?:popular|trending|best|top|famous)/i,
      new: /(?:new|recent|latest|current)/i,
      rating: /(?:good|best|highly rated|top rated)/i
    },

    // Fuzzy string matching for typos
    levenshteinDistance: (str1, str2) => {
      const matrix = [];
      for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
      for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
      
      for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
          if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
          }
        }
      }
      return matrix[str2.length][str1.length];
    },

    // Calculate similarity score
    calculateSimilarity: (query, text) => {
      const queryLower = query.toLowerCase();
      const textLower = text.toLowerCase();
      
      // Exact match gets highest score
      if (textLower.includes(queryLower)) return 1;
      
      // Fuzzy matching for typos
      const distance = aiSearchEngine.levenshteinDistance(queryLower, textLower);
      const maxLength = Math.max(queryLower.length, textLower.length);
      const fuzzyScore = 1 - (distance / maxLength);
      
      return fuzzyScore > 0.7 ? fuzzyScore : 0;
    },

    // Expand query with synonyms
    expandQuery: (query) => {
      const words = query.toLowerCase().split(' ');
      const expandedTerms = new Set(words);
      
      words.forEach(word => {
        Object.keys(aiSearchEngine.synonyms).forEach(key => {
          if (key.includes(word) || aiSearchEngine.synonyms[key].some(syn => syn.includes(word))) {
            expandedTerms.add(key);
            aiSearchEngine.synonyms[key].forEach(syn => expandedTerms.add(syn));
          }
        });
      });
      
      return Array.from(expandedTerms);
    },

    // Detect search intent
    detectIntent: (query) => {
      const intents = [];
      Object.keys(aiSearchEngine.intentPatterns).forEach(intent => {
        if (aiSearchEngine.intentPatterns[intent].test(query)) {
          intents.push(intent);
        }
      });
      return intents;
    },

    // Smart search function
    smartSearch: (query, data) => {
      if (!query.trim()) return data;
      
      const expandedTerms = aiSearchEngine.expandQuery(query);
      const intents = aiSearchEngine.detectIntent(query);
      
      // Score each item
      const scoredResults = data.map(item => {
        let score = 0;
        
        // Title matching (highest weight)
        expandedTerms.forEach(term => {
          score += aiSearchEngine.calculateSimilarity(term, item.title) * 3;
        });
        
        // Genre matching
        if (item.genre) {
          expandedTerms.forEach(term => {
            score += aiSearchEngine.calculateSimilarity(term, item.genre) * 2;
          });
        }
        
        // Description matching
        if (item.description) {
          expandedTerms.forEach(term => {
            score += aiSearchEngine.calculateSimilarity(term, item.description) * 1;
          });
        }
        
        // Intent-based boosting
        if (intents.includes('popular') && item.score > 80) score += 0.5;
        if (intents.includes('rating') && item.score > 85) score += 0.5;
        if (intents.includes('new') && item.year >= 2023) score += 0.5;
        
        return { ...item, searchScore: score };
      });
      
      // Filter and sort by relevance
      return scoredResults
        .filter(item => item.searchScore > 0.1)
        .sort((a, b) => b.searchScore - a.searchScore);
    },

    // Generate smart suggestions
    generateSuggestions: (query, data) => {
      const suggestions = new Set();
      const queryLower = query.toLowerCase();
      
      // Add popular titles that match
      data.forEach(item => {
        if (item.title.toLowerCase().includes(queryLower)) {
          suggestions.add(item.title);
        }
      });
      
      // Add genre suggestions
      Object.keys(aiSearchEngine.synonyms).forEach(genre => {
        if (genre.includes(queryLower) || aiSearchEngine.synonyms[genre].some(syn => syn.includes(queryLower))) {
          suggestions.add(genre);
        }
      });
      
      // Add mood-based suggestions
      Object.keys(aiSearchEngine.moods).forEach(mood => {
        if (mood.includes(queryLower)) {
          suggestions.add(`${mood} anime`);
        }
      });
      
      return Array.from(suggestions).slice(0, 5);
    }
  };

  // Complete Gamification System with Community Features
  const gamificationSystem = {
    // XP calculation for different activities
    xpRewards: {
      search: 5,
      watch: 20,
      read: 15,
      filter: 3,
      languageSwitch: 10,
      dailyLogin: 25,
      streak: 50,
      achievement: 100,
      // Community features
      dailyCheckIn: 30,
      weeklyCheckIn: 100,
      communityPost: 15,
      commentOnPost: 10,
      likePost: 2,
      shareContent: 8,
      joinDiscussion: 12,
      startDiscussion: 20,
      helpOtherUser: 25,
      receiveUpvote: 5,
      view_detail: 8
    },
    
    // Level calculation
    calculateLevel: (xp) => Math.floor(Math.sqrt(xp / 100)) + 1,
    
    // XP needed for next level
    xpForNextLevel: (level) => Math.pow(level, 2) * 100,
    
    // Daily check-in system
    checkDailyLogin: () => {
      const today = new Date().toDateString();
      const lastLogin = localStorage.getItem('lastLoginDate');
      const currentStreak = parseInt(localStorage.getItem('loginStreak') || '0');
      
      if (lastLogin !== today) {
        // First login of the day
        localStorage.setItem('lastLoginDate', today);
        
        // Check if streak continues (logged in yesterday)
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
        const newStreak = lastLogin === yesterday ? currentStreak + 1 : 1;
        
        localStorage.setItem('loginStreak', newStreak.toString());
        setUserStats(prev => ({ ...prev, loginStreak: newStreak }));
        
        // Award XP for daily login
        gamificationSystem.awardXP(gamificationSystem.xpRewards.dailyLogin, 'Daily Check-in');
        
        // Bonus XP for streak milestones
        if (newStreak % 7 === 0) {
          gamificationSystem.awardXP(gamificationSystem.xpRewards.weeklyCheckIn, `${newStreak}-Day Streak!`);
        }
        
        // Show check-in notification
        setShowDailyCheckIn(true);
        setTimeout(() => setShowDailyCheckIn(false), 4000);
        
        return true;
      }
      return false;
    },
    
    // Community interaction tracking
    trackCommunityAction: (action, metadata = {}) => {
      const updates = {};
      
      switch (action) {
        case 'post':
          updates.communityPosts = (userStats.communityPosts || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.communityPost, 'Community Post');
          break;
        case 'comment':
          updates.comments = (userStats.comments || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.commentOnPost, 'Comment');
          break;
        case 'like':
          updates.likesGiven = (userStats.likesGiven || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.likePost, 'Like');
          break;
        case 'share':
          updates.contentShared = (userStats.contentShared || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.shareContent, 'Share');
          break;
        case 'discussion_join':
          updates.discussionsJoined = (userStats.discussionsJoined || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.joinDiscussion, 'Join Discussion');
          break;
        case 'discussion_start':
          updates.discussionsStarted = (userStats.discussionsStarted || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.startDiscussion, 'Start Discussion');
          break;
        case 'help_user':
          updates.usersHelped = (userStats.usersHelped || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.helpOtherUser, 'Help User');
          break;
        case 'receive_upvote':
          updates.upvotesReceived = (userStats.upvotesReceived || 0) + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.receiveUpvote, 'Upvote Received');
          break;
      }
      
      setUserStats(prev => ({ ...prev, ...updates }));
    },
    
    // Award XP and check for level ups
    awardXP: (amount, reason) => {
      const newXP = userExp + amount;
      const currentLevel = gamificationSystem.calculateLevel(userExp);
      const newLevel = gamificationSystem.calculateLevel(newXP);
      
      setUserExp(newXP);
      setUserPoints(prev => prev + Math.floor(amount / 2));
      
      if (newLevel > currentLevel) {
        setUserLevel(newLevel);
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
      
      // Check for new achievements
      gamificationSystem.checkAchievements();
    },
    
    // Check and unlock achievements
    checkAchievements: () => {
      achievementDefinitions.forEach(achievement => {
        if (!achievements.includes(achievement.id) && achievement.condition(userStats)) {
          setAchievements(prev => [...prev, achievement.id]);
          setShowAchievement(achievement);
          gamificationSystem.awardXP(achievement.points, `Achievement: ${achievement.name}`);
          setTimeout(() => setShowAchievement(null), 4000);
        }
      });
    },
    
    // Track user actions
    trackAction: (action, metadata = {}) => {
      const updates = {};
      
      switch (action) {
        case 'search':
          updates.searchesMade = userStats.searchesMade + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.search, 'Search');
          break;
        case 'watch':
          updates.animeWatched = userStats.animeWatched + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.watch, 'Watch');
          break;
        case 'read':
          updates.comicsRead = userStats.comicsRead + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.read, 'Read');
          break;
        case 'filter':
          updates.filtersUsed = userStats.filtersUsed + 1;
          gamificationSystem.awardXP(gamificationSystem.xpRewards.filter, 'Filter');
          break;
        case 'language':
          updates.languagesExplored = Math.max(userStats.languagesExplored, metadata.count || 1);
          gamificationSystem.awardXP(gamificationSystem.xpRewards.languageSwitch, 'Language Switch');
          break;
      }
      
      setUserStats(prev => ({ ...prev, ...updates }));
    }
  };

  // Admin Dashboard Data
  const [adminData, setAdminData] = useState({
    totalUsers: 12847,
    activeUsers: 3629,
    totalContent: 5420,
    searchesToday: 8934,
    userGrowth: '+12.5%',
    contentGrowth: '+8.3%',
    engagement: '74.2%',
    revenue: '$24,567',
    
    recentUsers: [
      { id: 1, email: 'user1@example.com', level: 5, points: 2340, joinDate: '2025-01-15', status: 'active' },
      { id: 2, email: 'user2@example.com', level: 3, points: 890, joinDate: '2025-01-14', status: 'active' },
      { id: 3, email: 'user3@example.com', level: 8, points: 5670, joinDate: '2025-01-13', status: 'inactive' },
      { id: 4, email: 'user4@example.com', level: 2, points: 450, joinDate: '2025-01-12', status: 'active' },
      { id: 5, email: 'user5@example.com', level: 6, points: 3210, joinDate: '2025-01-11', status: 'active' }
    ],
    
    topContent: [
      { title: 'Attack on Titan', views: 45678, type: 'anime', rating: 9.2 },
      { title: 'Solo Leveling', views: 38920, type: 'webtoon', rating: 9.5 },
      { title: 'Demon Slayer', views: 35421, type: 'anime', rating: 8.9 },
      { title: 'Tower of God', views: 29876, type: 'webtoon', rating: 8.7 },
      { title: 'Jujutsu Kaisen', views: 28543, type: 'anime', rating: 9.1 }
    ],
    
    systemStats: {
      serverUptime: '99.97%',
      responseTime: '245ms',
      errorRate: '0.03%',
      bandwidth: '2.4 TB',
      storage: '856 GB / 2 TB'
    }
  });

  // Authentication functions
  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setLoginModalOpen(false);
    
    // Check for daily login bonus
    setTimeout(() => {
      gamificationSystem.checkDailyLogin();
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Handle content detail view
  const handleContentClick = (item) => {
    setSelectedContent(item);
    setDetailedContentModalOpen(true);
    if (isLoggedIn) {
      gamificationSystem.trackAction('view_detail');
    }
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
      
      {/* Gamification UI Components */}
      <LevelUpAnimation isVisible={showLevelUp} />
      <AchievementPopup achievement={showAchievement} />
      <DailyCheckInPopup isVisible={showDailyCheckIn} streak={userStats.loginStreak} />
      {isLoggedIn && <GamificationWidget />}
      
      <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#001122] via-[#0D0D0D] to-[#001a33] -z-10"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)] -z-10"></div>
        
        {/* Navigation */}
        <nav className={`relative z-50 px-4 md:px-6 py-4 md:py-6 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${isScrolled ? 'bg-black/60' : 'bg-black/20'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo and Compact Search */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="text-xl md:text-2xl font-bold tracking-wide">
                ANI<span className="text-[#00FFFF]">O</span>MICS
              </div>
              
              {/* Compact Search Bar - Hidden on mobile, shown in hero */}
              <div className="hidden lg:flex items-center">
                <div className="relative search-container">
                  <input
                    type="text"
                    placeholder="Search with AI..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.length > 1) {
                        const suggestions = aiSearchEngine.generateSuggestions(e.target.value, activeTab === 'anime' ? animeData : webtoonData);
                        setSearchSuggestions(suggestions);
                        setShowSuggestions(true);
                      } else {
                        setShowSuggestions(false);
                      }
                    }}
                    onFocus={() => {
                      if (searchQuery.length > 1) setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    className="w-64 bg-white/10 border border-white/20 rounded-xl px-4 py-2 pl-10 text-white placeholder-white/50 focus:border-[#00FFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                  />
                  <Icon id="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"/>
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      <Icon id="x" className="w-3 h-3"/>
                    </button>
                  )}
                  
                  {/* AI Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 z-[90]">
                      <div className="p-2">
                        <div className="text-xs font-medium text-white/60 px-3 py-2 border-b border-white/10 flex items-center gap-2">
                          <span className="text-[#00FFFF]">🤖</span>
                          AI Suggestions
                        </div>
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(suggestion);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                          >
                            <span className="text-white/40">🔍</span>
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <button 
                onClick={() => setLibraryModalOpen(true)}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <Icon id="bookmark" className="w-4 h-4"/>
                {t('library')}
              </button>
              <button 
                onClick={() => setCreatorHubModalOpen(true)}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <Icon id="pencil" className="w-4 h-4"/>
                {t('creatorHub')}
              </button>
              <button 
                onClick={() => setMarketplaceModalOpen(true)}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                <Icon id="shopping" className="w-4 h-4"/>
                {t('marketplace')}
              </button>
              
              {/* Admin Dashboard - Only show if logged in as admin */}
              {isLoggedIn && userEmail.includes('admin') && (
                <button 
                  onClick={() => setAdminModalOpen(true)}
                  className="text-orange-400 hover:text-orange-300 transition-colors font-medium flex items-center gap-2"
                  title="Admin Dashboard"
                >
                  <Icon id="cog" className="w-4 h-4"/>
                  Admin
                </button>
              )}
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/90"
                >
                  <span className="text-lg">{languages[selectedLanguage]?.flag}</span>
                  <span className="text-sm font-medium">{languages[selectedLanguage]?.name}</span>
                  <svg className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 max-h-80 overflow-y-auto z-[90]">
                    <div className="p-2">
                      <div className="text-xs font-medium text-white/60 px-3 py-2 border-b border-white/10">{t('language')}</div>
                      {Object.entries(languages).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setSelectedLanguage(code);
                            setShowLanguageDropdown(false);
                            if (isLoggedIn) {
                              gamificationSystem.trackAction('language', { count: Object.keys(languages).indexOf(code) + 1 });
                            }
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 transition-colors ${
                            selectedLanguage === code ? 'bg-blue-600/30 text-blue-300' : 'text-white/80'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm font-medium">{lang.name}</span>
                          {selectedLanguage === code && (
                            <svg className="w-4 h-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* User Profile Menu */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 md:p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md">
                <Icon id="menu" className="w-5 h-5"/>
              </button>
              
              {/* User Profile Button */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <div className="hidden md:flex items-center space-x-2 bg-white/10 rounded-xl px-3 md:px-4 py-2">
                      <Icon id="user" className="w-4 h-4 text-[#00FFFF]"/>
                      <span className="text-xs md:text-sm text-white/80">{userEmail.split('@')[0]}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="hidden md:block bg-red-500/80 hover:bg-red-500 text-white text-xs md:text-sm px-3 md:px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setLoginModalOpen(true)}
                      className="bg-white/10 hover:bg-white/20 text-white p-2 md:p-3 rounded-xl transition-all duration-300 backdrop-blur-md flex items-center gap-2"
                      title="Login / Sign Up"
                    >
                      <Icon id="user" className="w-4 md:w-5 h-4 md:h-5"/>
                      <span className="hidden md:block text-sm">Profile</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-30 px-4 md:px-6 pt-8 md:pt-16 pb-6 md:pb-12">
          <div className="max-w-7xl mx-auto text-center">
            {isLoggedIn && (
              <div className="mb-4 md:mb-6 bg-gradient-to-r from-[#00FFFF]/10 to-[#0099CC]/10 border border-[#00FFFF]/30 rounded-2xl p-3 md:p-4 backdrop-blur-md">
                <p className="text-[#00FFFF] font-medium text-sm md:text-base">
                  {t('welcome')}, {userEmail.split('@')[0]}! 🎉 {t('readyDiscover')}
                </p>
              </div>
            )}
            
            {/* Mobile Search Bar with AI */}
            <div className="lg:hidden mb-6 md:mb-8">
              <div className="relative search-container">
                <input
                  type="text"
                  placeholder="🤖 AI-powered search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length > 1) {
                      const suggestions = aiSearchEngine.generateSuggestions(e.target.value, activeTab === 'anime' ? animeData : webtoonData);
                      setSearchSuggestions(suggestions);
                      setShowSuggestions(true);
                      // Track search action for gamification
                      if (isLoggedIn && e.target.value.length === 2) {
                        gamificationSystem.trackAction('search');
                      }
                    } else {
                      setShowSuggestions(false);
                    }
                  }}
                  onFocus={() => {
                    if (searchQuery.length > 1) setShowSuggestions(true);
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:border-[#00FFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                />
                <Icon id="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"/>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    <Icon id="x" className="w-4 h-4"/>
                  </button>
                )}
                
                {/* Mobile AI Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 z-[90]">
                    <div className="p-2">
                      <div className="text-xs font-medium text-white/60 px-3 py-2 border-b border-white/10 flex items-center gap-2">
                        <span className="text-[#00FFFF]">🤖</span>
                        AI Suggestions
                      </div>
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                        >
                          <span className="text-white/40">🔍</span>
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#00FFFF] via-white to-[#0099CC] bg-clip-text text-transparent leading-tight">
              {t('discoverAmazing')}
              <br />
              <span className="text-2xl md:text-3xl lg:text-6xl">{t('animeComics')}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              {isLoggedIn 
                ? "Discover, review, and track your favorite anime and comics. Build your personal collection and explore detailed insights from the community."
                : "Your ultimate review and discovery platform for anime and comics. Explore ratings, reviews, and detailed information to find your next favorite series."
              }
            </p>
            
            {/* AI Search Examples */}
            {!searchQuery && (
              <div className="mb-8 px-4">
                <p className="text-white/40 text-sm mb-3">🤖 Try AI-powered searches like:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    'sad anime',
                    'funny romance',
                    'action with magic',
                    'recommend something like One Piece',
                    'popular mecha',
                    'school comedy'
                  ].map((example) => (
                    <button
                      key={example}
                      onClick={() => setSearchQuery(example)}
                      className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#00FFFF]/50 rounded-full px-3 py-1 text-xs text-white/60 hover:text-white transition-all duration-300"
                    >
                      &quot;{example}&quot;
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8 md:mb-16">
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-1 md:p-2 inline-flex flex-wrap gap-1 md:gap-2 w-full max-w-sm md:max-w-none">
                <button
                  onClick={() => setActiveTab('anime')}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 text-xs md:text-sm ${
                    activeTab === 'anime'
                      ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black shadow-lg shadow-[#00FFFF]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('anime')}
                </button>
                <button
                  onClick={() => setActiveTab('webtoons')}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 text-xs md:text-sm ${
                    activeTab === 'webtoons'
                      ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black shadow-lg shadow-[#00FFFF]/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t('comics')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Modern Filter Controls */}
        <section className="relative z-50 px-4 md:px-6 py-4 md:py-8">
          <div className="max-w-7xl mx-auto">            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 md:mb-8">
              {/* Advanced Multi-Select Genre Filter */}
              <div className="relative filter-dropdown w-full lg:w-auto">
                <button
                  onClick={() => {
                    setShowGenreDropdown(!showGenreDropdown);
                    setShowSortDropdown(false);
                  }}
                  className="w-full lg:w-auto bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-[#00FFFF]/30 rounded-2xl px-5 md:px-7 py-3 md:py-4 text-white transition-all duration-300 flex items-center justify-between gap-4 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-[#00FFFF]/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#0099CC]"></div>
                    <span className="text-sm md:text-base font-medium">
                      {selectedGenres.length === 0 
                        ? "All Genres" 
                        : selectedGenres.length === 1 
                          ? selectedGenres[0] 
                          : `${selectedGenres.length} Genres Selected`
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedGenres.length > 0 && (
                      <span className="bg-[#00FFFF]/20 text-[#00FFFF] px-2 py-1 rounded-full text-xs font-bold">
                        {selectedGenres.length}
                      </span>
                    )}
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${showGenreDropdown ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {showGenreDropdown && (
                  <div className="absolute top-full left-0 mt-3 bg-[#0F0F0F]/98 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 min-w-[320px] max-w-[400px] shadow-2xl shadow-black/50 z-[100] max-h-80 overflow-hidden">
                    {/* Modern Header */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-white font-bold text-base">Genre Filter</h3>
                        <p className="text-white/60 text-xs mt-1">
                          {selectedGenres.length} of {getGenres().length} selected
                        </p>
                      </div>
                      <button
                        onClick={clearGenreFilters}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    {/* Genre Grid */}
                    <div className="max-h-60 overflow-y-auto pr-2 space-y-1">
                      {getGenres().map(genre => {
                        const isSelected = selectedGenres.includes(genre);
                        return (
                          <button
                            key={genre}
                            onClick={() => handleGenreToggle(genre)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm flex items-center justify-between group relative overflow-hidden ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#00FFFF]/20 to-[#0099CC]/20 border border-[#00FFFF]/40 text-[#00FFFF] shadow-lg shadow-[#00FFFF]/10'
                                : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-[#00FFFF] to-[#0099CC] shadow-lg shadow-[#00FFFF]/30' 
                                  : 'bg-white/20 group-hover:bg-white/40'
                              }`}></div>
                              <span className="font-medium">{genre}</span>
                            </div>
                            {isSelected && (
                              <svg className="w-5 h-5 text-[#00FFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {isSelected && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/5 to-[#0099CC]/5 rounded-xl"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Sort Controls */}
              <div className="relative filter-dropdown w-full lg:w-auto">
                <button
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown);
                    setShowGenreDropdown(false);
                  }}
                  className="w-full lg:w-auto bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-[#00FFFF]/30 rounded-2xl px-5 md:px-7 py-3 md:py-4 text-white transition-all duration-300 flex items-center justify-between gap-4 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-[#00FFFF]/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span className="text-sm md:text-base font-medium">
                      Sort by: {sortBy === 'popularity' ? 'Trending' : sortBy === 'rating' ? 'Top Rated' : sortBy === 'year' ? 'Newest' : sortBy === 'title' ? 'A-Z' : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    </span>
                  </div>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-3 bg-[#0F0F0F]/98 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 min-w-[280px] shadow-2xl shadow-black/50 z-[100]">
                    {/* Sort Header */}
                    <div className="mb-4 pb-3 border-b border-white/10">
                      <h3 className="text-white font-bold text-base">Sort Options</h3>
                      <p className="text-white/60 text-xs mt-1">Choose how to organize content</p>
                    </div>
                    
                    {/* Sort Options */}
                    <div className="space-y-2">
                      {[
                        { 
                          value: 'popularity', 
                          label: 'Trending', 
                          desc: 'Most popular right now',
                          icon: '🔥',
                          gradient: 'from-orange-500 to-red-500'
                        },
                        { 
                          value: 'rating', 
                          label: 'Top Rated', 
                          desc: 'Highest community scores',
                          icon: '⭐',
                          gradient: 'from-yellow-500 to-orange-500'
                        },
                        { 
                          value: 'year', 
                          label: 'Newest', 
                          desc: 'Recently released',
                          icon: '🆕',
                          gradient: 'from-green-500 to-blue-500'
                        },
                        { 
                          value: 'title', 
                          label: 'A-Z', 
                          desc: 'Alphabetical order',
                          icon: '🔤',
                          gradient: 'from-blue-500 to-purple-500'
                        },
                        { 
                          value: 'episodes', 
                          label: 'Episode Count', 
                          desc: 'By number of episodes',
                          icon: '📺',
                          gradient: 'from-purple-500 to-pink-500'
                        },
                        { 
                          value: 'favorites', 
                          label: 'Most Loved', 
                          desc: 'Community favorites',
                          icon: '💖',
                          gradient: 'from-pink-500 to-red-500'
                        }
                      ].map(option => {
                        const isSelected = sortBy === option.value;
                        return (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                              isSelected
                                ? `bg-gradient-to-r ${option.gradient}/20 border border-white/30 text-white shadow-lg`
                                : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{option.icon}</span>
                                <div>
                                  <div className="font-medium text-sm">{option.label}</div>
                                  <div className="text-white/60 text-xs">{option.desc}</div>
                                </div>
                              </div>
                              {isSelected && (
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${option.gradient} shadow-lg`}></div>
                              )}
                            </div>
                            {isSelected && (
                              <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient}/5 rounded-xl`}></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative z-30 px-4 md:px-6 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                {activeTab === 'anime' && (searchQuery ? `${t('searchResults')} "${searchQuery}"` : t('trendingAnime'))}
                {activeTab === 'webtoons' && (searchQuery ? `${t('searchResults')} "${searchQuery}"` : t('trendingComics'))} 
              </h2>
              <p className="text-white/60 text-base md:text-lg px-4">
                {searchQuery ? `Found ${getCurrentData().length} ${activeTab === 'anime' ? 'anime' : 'comics'} matching your search` : 
                 'Community-driven reviews and ratings • Updated daily with fresh insights'}
              </p>
              
              {/* Search Intent Indicator */}
              {searchQuery && searchIntent && (
                <div className="mt-2 mb-2">
                  <span className="inline-flex items-center gap-2 bg-[#00FFFF]/20 text-[#00FFFF] px-3 py-1 rounded-full text-xs font-medium">
                    <span>🤖</span>
                    AI detected: {searchIntent}
                  </span>
                </div>
              )}
              
              {/* Active Filters Display */}
              {(selectedGenres.length > 0 || searchQuery) && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 px-4">
                  <span className="text-white/60 text-sm">{t('filters')}:</span>
                  {searchQuery && (
                    <span className="bg-[#00FFFF]/20 text-[#00FFFF] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                      {t('searchResults')}: &quot;{searchQuery}&quot;
                      <button
                        onClick={() => setSearchQuery('')}
                        className="hover:text-white transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {selectedGenres.map(genre => (
                    <span
                      key={genre}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
                    >
                      {genre}
                      <button
                        onClick={() => handleGenreToggle(genre)}
                        className="hover:text-white transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  {(selectedGenres.length > 0 || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedGenres([]);
                        setSearchQuery('');
                      }}
                      className="text-white/40 hover:text-white transition-colors text-xs underline"
                    >
                      {t('clearAllFilters')}
                    </button>
                  )}
                </div>
              )}
              
              {!searchQuery && selectedGenres.length === 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 mt-3 md:mt-4">
                  <p className="text-white/40 text-xs md:text-sm">
                    {t('lastUpdated')}: {lastUpdated.toLocaleTimeString()}
                  </p>
                  <button
                    onClick={handleManualRefresh}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 md:px-4 py-1 md:py-2 text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-xs md:text-sm"
                    disabled={loading}
                  >
                    <svg className={`w-3 md:w-4 h-3 md:h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? t('updating') : t('refreshNow')}
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
                <h3 className="text-2xl font-bold mb-4">{t('noResults')}</h3>
                <p className="text-white/60 mb-6">
                  {t('noResultsDesc', { type: activeTab === 'anime' ? t('anime').toLowerCase() : t('comics').toLowerCase() })}
                </p>
                <p className="text-white/40 text-sm">
                  {t('adjustSearch')}
                </p>
              </div>
            ) : (
              // Enhanced Cards Grid
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
                {currentData.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleContentClick(item)}
                    className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl overflow-hidden hover:border-[#00FFFF]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#00FFFF]/20 cursor-pointer"
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
                      <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-gradient-to-r from-[#00FFFF] to-[#0099CC] text-black px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold shadow-lg">
                        #{index + 1}
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black/70 backdrop-blur-sm text-white px-2 md:px-3 py-0.5 md:py-1 rounded-lg text-xs md:text-sm font-medium flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        {item.rating}
                      </div>
                      
                      {/* Year Badge */}
                      {item.year && (
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/20 backdrop-blur-sm text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg text-xs">
                          {item.year}
                        </div>
                      )}
                      
                      {/* Nationality Badge */}
                      {item.nationality && (
                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg text-xs font-bold">
                          {item.nationality}
                        </div>
                      )}
                      
                      {/* Hover Overlay with Actions - Hidden on mobile for better performance */}
                      <div className="hidden md:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                        <div className="flex gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContentClick(item);
                            }}
                            className="bg-[#00FFFF] text-black p-3 rounded-full hover:bg-white transition-colors duration-200"
                            title="View Details"
                          >
                            <Icon id="eye" className="w-5 h-5"/>
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to library logic
                            }}
                            className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
                            title="Add to Library"
                          >
                            <Icon id="bookmark" className="w-5 h-5"/>
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to favorites logic
                            }}
                            className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
                            title="Add to Favorites"
                          >
                            <Icon id="heart" className="w-5 h-5"/>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Simplified Content - Title Only */}
                    <div className="p-3 md:p-4">
                      <h3 className="font-bold text-sm md:text-base text-center line-clamp-2 group-hover:text-[#00FFFF] transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* Community Quick Actions - Only show when logged in */}
          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  gamificationSystem.trackCommunityAction('post');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110"
                title="Create Community Post (+15 XP)"
              >
                <Icon id="pencil" className="w-4 h-4"/>
              </button>
              
              <button
                onClick={() => {
                  gamificationSystem.trackCommunityAction('like');
                }}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-110"
                title="Like Content (+2 XP)"
              >
                <Icon id="heart" className="w-4 h-4"/>
              </button>
              
              <button
                onClick={() => {
                  gamificationSystem.trackCommunityAction('help_user');
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-110"
                title="Help Community Member (+25 XP)"
              >
                <Icon id="user" className="w-4 h-4"/>
              </button>
            </>
          )}
          
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
                  Your premium anime & comics review and discovery platform. Explore detailed reviews, ratings, and community insights to discover your next favorite series through curated content and intelligent recommendations.
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
                © 2025 ANIOMICS. {t('allRightsReserved')}.
              </div>
              <div className="flex items-center gap-4 text-white/40 text-sm">
                <span>{t('poweredBy')}</span>
                <span>•</span>
                <span>{t('builtWith')}</span>
                <span>•</span>
                <span>{t('realTimeUpdates')}</span>
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
        <AdminModal 
          isOpen={adminModalOpen} 
          onClose={() => setAdminModalOpen(false)}
        />
        <DetailedContentModal 
          isOpen={detailedContentModalOpen} 
          onClose={() => setDetailedContentModalOpen(false)}
          content={selectedContent}
          type={activeTab === 'anime' ? 'anime' : 'webtoon'}
        />
      </div>
    </>
  );
}
