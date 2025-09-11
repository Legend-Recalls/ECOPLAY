import React, { useState, useEffect } from 'react';
import { DetectionResult, GeminiResponse } from '../types';
import { Loader2 } from 'lucide-react';

interface ResultsPanelProps {
  detectionResult: DetectionResult | null;
  geminiResponse: GeminiResponse | null;
  isDetecting: boolean;
  isFetchingGuidance: boolean;
  showQuiz: boolean;
  onCorrectAnswer: () => void;
  onQuizComplete: () => void;
  detectionHistory: DetectionResult[];
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  geminiResponse,
  isFetchingGuidance,
  showQuiz,
  onCorrectAnswer,
  onQuizComplete,
  detectionHistory
}) => {
  const [selection, setSelection] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset state when the quiz appears
  useEffect(() => {
    if (showQuiz) {
      setIsAnswered(false);
      setSelection(null);
    }
  }, [showQuiz]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setSelection(option);
    setIsAnswered(true);

    if (option === geminiResponse?.quiz.correctAnswer) {
      onCorrectAnswer();
    }

    setTimeout(() => {
      onQuizComplete();
    }, 2000); // Wait 2 seconds before hiding the quiz
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    }
    if (option === geminiResponse?.quiz.correctAnswer) {
      return "bg-green-500 text-white";
    }
    if (option === selection) {
      return "bg-red-500 text-white";
    }
    return "bg-gray-200 opacity-50 text-gray-800";
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Results & Guidance</h2>

      {isFetchingGuidance && (
        <div className="flex flex-col items-center justify-center h-full text-gray-600">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="text-xl">Analyzing image and fetching guidance...</p>
        </div>
      )}

      {!isFetchingGuidance && geminiResponse && (
        <div className="flex-grow flex flex-col">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Eco Guidance</h3>
            <p className="text-gray-700 leading-relaxed">{geminiResponse.guidance}</p>
          </div>

          {showQuiz && (
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-auto">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Quick Quiz!</h3>
              <p className="text-gray-700 mb-4">{geminiResponse.quiz.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {geminiResponse.quiz.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswered}
                    className={`px-5 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-sm ${getButtonClass(option)}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isFetchingGuidance && !geminiResponse && (
        <div className="flex flex-col items-center justify-center h-full text-gray-600">
          <p className="text-xl">Upload an image to get started!</p>
          <p className="text-md text-gray-500 mt-2">Guidance and quiz will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
