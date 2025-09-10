import React from 'react';
import { Parameters } from '../types/game';

interface CharacterProps {
  parameters: Parameters;
  mood: string;
}

const Character: React.FC<CharacterProps> = ({ parameters, mood }) => {
  const getCharacterAppearance = () => {
    const avgScore = (parameters.health + parameters.satisfaction + parameters.environment + (100 - parameters.cost)) / 4;
    
    let size = 'w-32 h-32';
    let bgColor = 'from-gray-400 to-gray-600';
    let expression = '😐';
    
    if (avgScore >= 80) {
      bgColor = 'from-green-400 to-emerald-500';
      expression = '😊';
      size = 'w-36 h-36';
    } else if (avgScore >= 60) {
      bgColor = 'from-yellow-400 to-orange-500';
      expression = '🙂';
    } else if (avgScore >= 40) {
      bgColor = 'from-orange-400 to-red-500';
      expression = '😕';
    } else {
      bgColor = 'from-red-400 to-red-600';
      expression = '😟';
    }

    return { size, bgColor, expression };
  };

  const { size, bgColor, expression } = getCharacterAppearance();

  return (
    <div className="relative">
      <div className={`${size} rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center text-4xl transition-all duration-1000 ease-out shadow-2xl border-4 border-white/20`}>
        <span className="text-5xl filter drop-shadow-lg">{expression}</span>
      </div>
      
      {/* Mood indicator */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium border border-white/30">
        {mood}
      </div>
      
      {/* Parameter effects */}
      {parameters.health < 30 && (
        <div className="absolute -top-8 -right-2 text-2xl animate-bounce">💔</div>
      )}
      {parameters.satisfaction > 80 && (
        <div className="absolute -top-8 -left-2 text-2xl animate-pulse">⭐</div>
      )}
      {parameters.environment > 80 && (
        <div className="absolute -bottom-4 -right-2 text-2xl animate-bounce">🌱</div>
      )}
      {parameters.cost > 80 && (
        <div className="absolute -bottom-4 -left-2 text-2xl animate-pulse">💸</div>
      )}
    </div>
  );
};

export default Character;