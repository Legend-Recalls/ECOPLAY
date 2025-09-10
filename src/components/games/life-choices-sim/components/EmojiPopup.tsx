import React, { useEffect, useState } from 'react';
import { Parameters } from '../types/game';

interface EmojiPopupProps {
  impact: Parameters;
  onComplete: () => void;
}

interface PopupEffect {
  id: string;
  emoji: string;
  text: string;
  x: number;
  y: number;  
  color: string;
  delay: number;
}

const EmojiPopup: React.FC<EmojiPopupProps> = ({ impact, onComplete }) => {
  const [effects, setEffects] = useState<PopupEffect[]>([]);

  useEffect(() => {
    const newEffects: PopupEffect[] = [];
    let id = 0;

    // Generate better spread positions - ensure no overlap
    const generatePosition = (index: number, total: number) => {
      if (total === 1) {
        // Single emoji in center area
        return {
          x: 0,
          y: -100,
        };
      }
      
      // Multiple emojis - spread them with guaranteed spacing
      const minRadius = 120; // Increased minimum radius for better spacing
      const radiusIncrement = 20; // Additional spacing per emoji
      const radius = minRadius + (total - 2) * radiusIncrement;
      
      // Even distribution around a circle
      const angleStep = (Math.PI * 2) / total;
      const angle = angleStep * index;
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius - 60, // Less upward bias
      };
    };

    // Count total effects first
    const totalEffects = 
      (impact.health !== 0 ? 1 : 0) +
      (impact.satisfaction !== 0 ? 1 : 0) +
      (impact.environment !== 0 ? 1 : 0) +
      (impact.cost !== 0 ? 1 : 0);

    let effectIndex = 0;

    // Health effects
    if (impact.health !== 0) {
      const pos = generatePosition(effectIndex, totalEffects);
      newEffects.push({
        id: `health-${id++}`,
        emoji: impact.health > 0 ? '❤️' : '💔',
        text: `${impact.health > 0 ? '+' : ''}${impact.health}`,
        x: pos.x,
        y: pos.y,
        color: impact.health > 0 ? 'text-green-400' : 'text-red-400',
        delay: effectIndex * 100
      });
      effectIndex++;
    }

    // Satisfaction effects
    if (impact.satisfaction !== 0) {
      const pos = generatePosition(effectIndex, totalEffects);
      newEffects.push({
        id: `satisfaction-${id++}`,
        emoji: impact.satisfaction > 0 ? '😊' : '😔',
        text: `${impact.satisfaction > 0 ? '+' : ''}${impact.satisfaction}`,
        x: pos.x,
        y: pos.y,
        color: impact.satisfaction > 0 ? 'text-yellow-400' : 'text-gray-400',
        delay: effectIndex * 100
      });
      effectIndex++;
    }

    // Environment effects
    if (impact.environment !== 0) {
      const pos = generatePosition(effectIndex, totalEffects);
      newEffects.push({
        id: `environment-${id++}`,
        emoji: impact.environment > 0 ? '🌱' : '🏭',
        text: `${impact.environment > 0 ? '+' : ''}${impact.environment}`,
        x: pos.x,
        y: pos.y,
        color: impact.environment > 0 ? 'text-green-400' : 'text-brown-400',
        delay: effectIndex * 100
      });
      effectIndex++;
    }

    // Cost effects
    if (impact.cost !== 0) {
      const pos = generatePosition(effectIndex, totalEffects);
      newEffects.push({
        id: `cost-${id++}`,
        emoji: impact.cost > 0 ? '💸' : '💰',
        text: `${impact.cost > 0 ? '+' : ''}${impact.cost}`,
        x: pos.x,
        y: pos.y,
        color: impact.cost > 0 ? 'text-red-400' : 'text-green-400',
        delay: effectIndex * 100
      });
      effectIndex++;
    }

    setEffects(newEffects);

    // Clear effects after smooth animation completes
    const maxDelay = newEffects.reduce((m, e) => Math.max(m, e.delay || 0), 0);
    const timer = setTimeout(() => {
      setEffects([]);
      onComplete();
    }, 2500 + maxDelay);

    return () => clearTimeout(timer);
  }, [impact, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${effect.x}px, ${effect.y}px)`,
            animationDelay: `${effect.delay}ms`
          }}
        >
          <div 
            className="flex flex-col items-center opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
            style={{ animationDelay: `${effect.delay}ms` }}
          >
            <div className="text-5xl mb-1 animate-[floatUp_2.5s_ease-out_forwards]" style={{ animationDelay: `${effect.delay}ms` }}>
              {effect.emoji}
            </div>
            <div className={`text-xl font-bold ${effect.color} drop-shadow-lg animate-[floatUp_2.5s_ease-out_forwards]`} style={{ animationDelay: `${effect.delay + 100}ms` }}>
              {effect.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmojiPopup;