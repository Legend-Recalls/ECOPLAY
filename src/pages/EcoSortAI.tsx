import React, { useState, useCallback } from 'react';
import CameraPanel from '../components/CameraPanel';
import ResultsPanel from '../components/ResultsPanel';
import ScoreBar from '../components/ScoreBar';
import { DetectionResult, GeminiResponse } from '../types';
import { getEcoGuidance } from '../utils/geminiAPI';
import { useGameState } from '../hooks/useGameState';
import { motion } from 'framer-motion';

function EcoSortAI() {
  const { gameState, addScore, incrementDetections } = useGameState();
  
  // State for Gemini API results
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);
  const [detectionHistory, setDetectionHistory] = useState<DetectionResult[]>([]);
  
  // Loading state
  const [isFetchingGuidance, setIsFetchingGuidance] = useState(false);
  
  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);

  const handleImageCapture = useCallback(async (imageUrl: string) => {
    try {
      // Reset states
      setGeminiResponse(null);
      setShowQuiz(false);
      setIsFetchingGuidance(true);

      // Get eco guidance from Gemini
      const guidance = await getEcoGuidance(imageUrl);
      setGeminiResponse(guidance);
      
      // Create a mock detection result for history
      const result: DetectionResult = {
        label: 'Analyzed by Gemini', // Or parse from guidance if available
        confidence: 1, // Gemini is confident!
        timestamp: new Date(),
        imageUrl: imageUrl
      };
      setDetectionHistory(prev => [...prev, result]);
      incrementDetections();
      addScore(10); // Base points for detection
      
      setIsFetchingGuidance(false);
      
      // Show quiz after a brief delay
      setTimeout(() => {
        setShowQuiz(true);
      }, 1000);

    } catch (error) {
      console.error('Guidance process failed:', error);
      setIsFetchingGuidance(false);
      alert('Failed to get guidance from Gemini. Check the console for details.');
    }
  }, [incrementDetections, addScore]);

  const handleCorrectAnswer = useCallback(() => {
    addScore(10); // Bonus points for correct quiz answer
  }, [addScore]);

  const handleQuizComplete = useCallback(() => {
    setShowQuiz(false);
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            EcoSort AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use your camera to identify waste items and get instant guidance on proper disposal and recycling.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 min-h-[calc(100vh-200px)]">
          <CameraPanel
            onImageCapture={handleImageCapture}
            isProcessing={isFetchingGuidance}
          />
          
          <ResultsPanel
            detectionResult={null} // Local detection is removed
            geminiResponse={geminiResponse}
            isDetecting={false} // Local detection is removed
            isFetchingGuidance={isFetchingGuidance}
            showQuiz={showQuiz}
            onCorrectAnswer={handleCorrectAnswer}
            onQuizComplete={handleQuizComplete}
            detectionHistory={detectionHistory}
          />
        </div>
        <ScoreBar gameState={gameState} />
      </div>
    </div>
  );
}

export default EcoSortAI;