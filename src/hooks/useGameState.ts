import { useState, useCallback } from 'react';
import { GameState } from '../types';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({ score: 0, detections: 0 });

  const addScore = useCallback((points: number) => {
    setGameState(prev => ({ ...prev, score: prev.score + points }));
  }, []);

  const incrementDetections = useCallback(() => {
    setGameState(prev => ({ ...prev, detections: prev.detections + 1 }));
  }, []);

  return { gameState, addScore, incrementDetections };
};