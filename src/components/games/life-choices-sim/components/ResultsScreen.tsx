import React from 'react';
import { GameState } from '../types/game';
import { Trophy, RotateCcw, Heart, Smile, Leaf, DollarSign, Star } from 'lucide-react';

interface ResultsScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ gameState, onRestart }) => {
  const { parameters } = gameState;
  const totalScore = Math.round((parameters.health + parameters.satisfaction + parameters.environment + (100 - parameters.cost)) / 4);
  
  const getGrade = (score: number) => {
    if (score >= 90) return { letter: 'S', color: 'text-yellow-400', description: 'Perfect Life!', bg: 'from-yellow-400/20 to-orange-500/20' };
    if (score >= 80) return { letter: 'A', color: 'text-green-400', description: 'Excellent Day!', bg: 'from-green-400/20 to-emerald-500/20' };
    if (score >= 70) return { letter: 'B', color: 'text-blue-400', description: 'Good Choices!', bg: 'from-blue-400/20 to-cyan-500/20' };
    if (score >= 60) return { letter: 'C', color: 'text-purple-400', description: 'Decent Day', bg: 'from-purple-400/20 to-pink-500/20' };
    if (score >= 50) return { letter: 'D', color: 'text-orange-500', description: 'Room for Growth', bg: 'from-orange-400/20 to-red-500/20' };
    return { letter: 'F', color: 'text-red-500', description: 'Challenging Day', bg: 'from-red-400/20 to-pink-500/20' };
  };

  const grade = getGrade(totalScore);

  const getFeedback = () => {
    const messages = [];
    
    if (parameters.health < 40) {
      messages.push("🏃‍♀️ Your body needs more care. Consider healthier food choices and regular exercise.");
    } else if (parameters.health > 80) {
      messages.push("💪 Outstanding health management! Your body thanks you for the great choices.");
    }
    
    if (parameters.satisfaction < 40) {
      messages.push("😊 Life's too short to be unhappy. Seek more joy and fulfilling activities.");
    } else if (parameters.satisfaction > 80) {
      messages.push("🌟 You've mastered the art of happiness! Your positive choices shine through.");
    }
    
    if (parameters.environment < 40) {
      messages.push("🌱 Mother Earth needs your help. Consider more eco-friendly choices in your daily life.");
    } else if (parameters.environment > 80) {
      messages.push("🌍 You're an environmental champion! Your planet-conscious choices make a difference.");
    }
    
    if (parameters.cost > 80) {
      messages.push("💰 Your wallet is feeling light. Look for budget-friendly alternatives that don't compromise quality.");
    } else if (parameters.cost < 30) {
      messages.push("💎 Financial wisdom at its finest! You've mastered the art of smart spending.");
    }
    
    return messages.length > 0 ? messages : ["🎯 A balanced day with room for optimization. Every choice is a learning opportunity!"];
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto"> 
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-full p-4 sm:p-6"> 
        <div className="max-w-4xl w-full bg-black/50 backdrop-blur-md rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl my-8"> 
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4">
              <div className={`p-4 sm:p-6 rounded-full bg-gradient-to-br ${grade.bg} border-2 border-white/20`}>
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-wide">Journey Complete!</h1>
            <div className="text-7xl sm:text-8xl font-bold mb-3 sm:mb-4">
              <span className={grade.color}>{grade.letter}</span>
            </div>
            <p className="text-xl sm:text-2xl text-white/90 mb-2">{grade.description}</p>
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${i < Math.floor(totalScore / 20) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                />
              ))}
            </div>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl p-4 sm:p-6 text-center border border-red-500/30">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{Math.round(parameters.health)}</div>
              <div className="text-white/60 text-xs sm:text-sm font-medium">Health</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 sm:p-6 text-center border border-yellow-500/30">
              <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{Math.round(parameters.satisfaction)}</div>
              <div className="text-white/60 text-xs sm:text-sm font-medium">Satisfaction</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-4 sm:p-6 text-center border border-green-500/30">
              <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{Math.round(parameters.environment)}</div>
              <div className="text-white/60 text-xs sm:text-sm font-medium">Environment</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-4 sm:p-6 text-center border border-blue-500/30">
              <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{Math.round(100 - parameters.cost)}</div>
              <div className="text-white/60 text-xs sm:text-sm font-medium">Budget Left</div>
            </div>
          </div>

          {/* Overall score */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-4">Overall Score: {totalScore}/100</div>
            <div className="h-5 sm:h-6 bg-white/20 rounded-full overflow-hidden border border-white/20">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-3000 ease-out shadow-lg"
                style={{ width: `${totalScore}%` }}
              />
            </div>
          </div>

          {/* Feedback */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Your Life Story</h3>
            <div className="space-y-3 sm:space-y-4">
              {getFeedback().map((message, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-white/90 border border-white/20 leading-relaxed text-sm sm:text-base">
                  {message}
                </div>
              ))}
            </div>
          </div>

          {/* Restart button */}
          <div className="text-center">
            <button
              onClick={onRestart}
              className="group px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg sm:text-xl rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 flex items-center gap-3 sm:gap-4 mx-auto border-2 border-white/20 shadow-2xl"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
              Begin New Journey
            </button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsScreen;