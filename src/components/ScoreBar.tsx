import React from 'react';
import { GameState } from '../types';
import { Award, Scan } from 'lucide-react';

interface ScoreBarProps {
  gameState: GameState;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ gameState }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-4 shadow-lg z-10">
      <div className="max-w-6xl mx-auto flex justify-around items-center">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-yellow-300" />
          <span className="text-lg font-semibold">Score:</span>
          <span className="text-xl font-bold text-white">{gameState.score}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Scan className="w-6 h-6 text-purple-300" />
          <span className="text-lg font-semibold">Detections:</span>
          <span className="text-xl font-bold text-white">{gameState.detections}</span>
        </div>
      </div>
    </footer>
  );
};

export default ScoreBar;