import { useState, useCallback } from 'react';
import { GameState, Decision } from '../types/game';
import { gameDecisions } from '../data/gameData';
import { calculateMood, getInitialGameState } from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());

  const currentDecision: Decision | undefined = gameDecisions.find(
    decision => decision.id === gameState.currentDecisionId
  );

  const isGameComplete = gameState.currentDecisionId > gameDecisions.length;

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStarted: true }));
  }, []);

  const makeChoice = useCallback((choiceIndex: number) => {
    if (!currentDecision || gameState.isAnimating) return;

    const choice = currentDecision.choices[choiceIndex];
    
    setGameState(prev => ({ ...prev, isAnimating: true }));

    // Simulate animation delay
    setTimeout(() => {
      setGameState(prev => {
        const newParameters = {
          health: Math.max(0, Math.min(100, prev.parameters.health + choice.impact.health)),
          satisfaction: Math.max(0, Math.min(100, prev.parameters.satisfaction + choice.impact.satisfaction)),
          environment: Math.max(0, Math.min(100, prev.parameters.environment + choice.impact.environment)),
          cost: Math.max(0, Math.min(100, prev.parameters.cost + choice.impact.cost))
        };

        const newChoices = [...prev.choiceHistory, {
          decisionId: currentDecision.id,
          choiceIndex,
          choice: choice.text,
          impact: choice.impact
        }];

        return {
          ...prev,
          parameters: newParameters,
          currentDecisionId: prev.currentDecisionId + 1,
          currentHour: currentDecision.hour,
          choiceHistory: newChoices,
          currentMood: calculateMood(newParameters),
          isAnimating: false
        };
      });
    }, 1000);
  }, [currentDecision, gameState.isAnimating]);

  const restartGame = useCallback(() => {
    setGameState(getInitialGameState());
  }, []);

  return {
    gameState,
    currentDecision,
    makeChoice,
    restartGame,
    isGameComplete,
    startGame
  };
};