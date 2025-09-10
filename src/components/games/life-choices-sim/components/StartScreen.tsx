import React from 'react';
import { Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center max-w-2xl mx-auto px-8">
          {/* Title with cinematic styling */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl">
              LIFE
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-6 tracking-wide">
              A 24-Hour Journey
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
          </div>

          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light">
            Every choice shapes your destiny.<br />
            Navigate through a single day and discover<br />
            how your decisions impact your life.
          </p>

          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-xl rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-500 transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              Begin Your Journey
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StartScreen;