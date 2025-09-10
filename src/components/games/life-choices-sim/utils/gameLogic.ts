import { GameState, Parameters } from '../types/game';

export const getInitialGameState = (): GameState => ({
  gameStarted: false,
  parameters: {
    health: 50,
    satisfaction: 50,
    environment: 50,
    cost: 50
  },
  currentDecisionId: 1,
  currentHour: 6,
  choiceHistory: [],
  currentMood: 'Neutral',
  isAnimating: false
});

export const calculateMood = (parameters: Parameters): string => {
  const avgScore = (parameters.health + parameters.satisfaction + parameters.environment + (100 - parameters.cost)) / 4;
  
  if (avgScore >= 80) return 'Excellent';
  if (avgScore >= 70) return 'Great';
  if (avgScore >= 60) return 'Good';
  if (avgScore >= 50) return 'Okay';
  if (avgScore >= 40) return 'Concerned';
  if (avgScore >= 30) return 'Worried';
  return 'Stressed';
};