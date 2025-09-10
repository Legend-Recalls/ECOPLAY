import React from 'react';
import { Parameters } from '../types/game';
import characterIdle from '../assets/character-portrait-idle.png';
import characterExercise from '../assets/character-portrait-exercise.png';
import characterEating from '../assets/character-portrait-eating.png';
import characterWorking from '../assets/character-portrait-working.png';
import characterRelaxing from '../assets/character-portrait-relaxing.png';
import characterTired from '../assets/character-tired.png';

interface CharacterSpriteProps {
  parameters: Parameters;
  activity?: string;
}

const CharacterSprite: React.FC<CharacterSpriteProps> = ({ parameters, activity }) => {
  const getCharacterSprite = () => {
    // Choose sprite based on activity context
    switch (activity) {
      case 'exercise':
      case 'gym':
      case 'workout':
        return characterExercise;
      case 'eat':
      case 'food':
      case 'meal':
      case 'restaurant':
        return characterEating;
      case 'work':
      case 'office':
      case 'meeting':
        return characterWorking;
      case 'rest':
      case 'sleep':
      case 'relax':
        return characterRelaxing;
      case 'tired':
        return characterTired;
      default:
        return characterIdle;
    }
  };

  const getCharacterState = () => {
    const avgScore = (parameters.health + parameters.satisfaction + parameters.environment + (100 - parameters.cost)) / 4;
    
    if (avgScore >= 80) {
      return {
        mood: 'Excellent',
        aura: 'from-green-400/40 to-emerald-500/40',
        scale: 'scale-105',
        bounce: '',
        glow: 'drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]'
      };
    } else if (avgScore >= 60) {
      return {
        mood: 'Good',
        aura: 'from-blue-400/30 to-cyan-500/30',
        scale: 'scale-100',
        bounce: '',
        glow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]'
      };
    } else if (avgScore >= 40) {
      return {
        mood: 'Okay',
        aura: 'from-yellow-400/30 to-orange-500/30',
        scale: 'scale-95',
        bounce: '',
        glow: ''
      };
    } else {
      return {
        mood: 'Struggling',
        aura: 'from-red-400/30 to-pink-500/30',
        scale: 'scale-90',
        bounce: '',
        glow: 'drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]'
      };
    }
  };

  const characterState = getCharacterState();

  return (
    <div className="relative flex flex-col items-center">
      {/* Character portrait sprite */}
      <div className={`relative ${characterState.scale} transition-all duration-1000`}>
        {/* Aura/glow background */}
        <div className={`absolute inset-0 bg-gradient-radial ${characterState.aura} rounded-full blur-2xl w-96 h-[30rem] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-60`} />
        
        {/* Main character portrait */}
        <div className={`relative w-96 h-auto ${characterState.glow}`}>
          <img 
            src={getCharacterSprite()} 
            alt="Character" 
            className="w-full h-full object-contain filter brightness-105"
          />
        </div>

        {/* Floating status effects */}
        {parameters.health < 30 && (
          <div className="absolute -top-4 -right-4 text-2xl animate-bounce">💔</div>
        )}
        {parameters.satisfaction > 80 && (
          <div className="absolute -top-4 -left-4 text-2xl animate-pulse">✨</div>
        )}
        {parameters.environment > 80 && (
          <div className="absolute -bottom-8 -right-4 text-2xl animate-bounce">🌱</div>
        )}
        {parameters.cost > 80 && (
          <div className="absolute -bottom-8 -left-4 text-2xl animate-pulse">💸</div>
        )}
      </div>

      {/* Character mood indicator */}
      <div className="mt-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium border border-white/10">
        {characterState.mood}
      </div>
    </div>
  );
};

export default CharacterSprite;