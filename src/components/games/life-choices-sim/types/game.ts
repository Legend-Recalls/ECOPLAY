export interface Parameters {
  health: number;
  satisfaction: number;
  environment: number;
  cost: number;
}

export interface Choice {
  text: string;
  description: string;
  impact: Parameters;
}

export interface Decision {
  id: number;
  time: string;
  hour: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  title: string;
  description: string;
  choices: Choice[];
}

export interface ChoiceHistory {
  decisionId: number;
  choiceIndex: number;
  choice: string;
  impact: Parameters;
}

export interface GameState {
  gameStarted: boolean;
  parameters: Parameters;
  currentDecisionId: number;
  currentHour: number;
  choiceHistory: ChoiceHistory[];
  currentMood: string;
  isAnimating: boolean;
}