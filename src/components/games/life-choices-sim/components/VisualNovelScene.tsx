import React, { useState, useEffect } from 'react';
import { Decision, Parameters } from '../types/game';
import CharacterSprite from './CharacterSprite';

import bedroomMorning from '../assets/bedroom-morning.jpg';
import cityStreet from '../assets/city-street.jpg';
import officeBreakroom from '../assets/office-breakroom.jpg';
import cafeInterior from '../assets/cafe-interior.jpg';
import officeWorkspace from '../assets/office-workspace.jpg';
import parkScene from '../assets/park-scene.jpg';

interface VisualNovelSceneProps {
  decision?: Decision;
  parameters: Parameters;
  currentHour: number;
  isAnimating: boolean;
}

const sceneBackgrounds = {
  1: bedroomMorning,
  2: cityStreet,
  3: officeBreakroom,
  4: cafeInterior,
  5: officeWorkspace,
  6: parkScene,
  7: cafeInterior,
  8: bedroomMorning,
  9: bedroomMorning,
  10: bedroomMorning,
};

const VisualNovelScene: React.FC<VisualNovelSceneProps> = ({
  decision,
  parameters,
  isAnimating,
}) => {
  const [currentBg, setCurrentBg] = useState(bedroomMorning);
  const [prevBg, setPrevBg] = useState<string | null>(null);

  useEffect(() => {
    const newBg = decision
      ? sceneBackgrounds[decision.id as keyof typeof sceneBackgrounds] || bedroomMorning
      : bedroomMorning;

    if (newBg !== currentBg) {
      setPrevBg(currentBg);
      setCurrentBg(newBg);
    }
  }, [decision, currentBg]);

  const getActivityContext = () => {
    if (!decision) return 'idle';
    const activityMap = {
      1: 'idle', 2: 'work', 3: 'work', 4: 'eat', 5: 'tired',
      6: 'exercise', 7: 'eat', 8: 'idle', 9: 'relax', 10: 'sleep',
    };
    return activityMap[decision.id as keyof typeof activityMap] || 'idle';
  };

  const getTimeOverlay = () => {
    if (!decision) return 'from-blue-900/40 to-purple-900/40';
    switch (decision.timeOfDay) {
      case 'morning': return 'from-orange-300/30 via-yellow-200/20 to-blue-300/30';
      case 'afternoon': return 'from-blue-400/20 via-cyan-200/10 to-yellow-300/20';
      case 'evening': return 'from-purple-500/40 via-pink-400/30 to-orange-400/30';
      case 'night': return 'from-indigo-900/60 via-purple-900/50 to-blue-900/60';
      default: return 'from-blue-400/20 via-cyan-200/10 to-yellow-300/20';
    }
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
      {prevBg && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${prevBg}')`,
          }}
        />
      )}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${currentBg}')`,
        }}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-br ${getTimeOverlay()} transition-all duration-2000`} />
      
      <div className="absolute inset-0">
        {decision?.timeOfDay === 'morning' && (
          <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
        )}
        {decision?.timeOfDay === 'night' && (
          <>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 30}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="absolute bottom-0 left-8 z-20">
        <CharacterSprite
          parameters={parameters}
          activity={getActivityContext()}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
    </div>
  );
};

export default VisualNovelScene;
