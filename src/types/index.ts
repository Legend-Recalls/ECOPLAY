export interface DetectionResult {
  label: string;
  confidence: number;
  timestamp: Date;
  imageUrl: string;
}

export interface GeminiResponse {
  guidance: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
}

export interface GameState {
  score: number;
  detections: number;
}
