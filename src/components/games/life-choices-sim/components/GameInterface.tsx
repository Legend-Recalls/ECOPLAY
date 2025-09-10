import React, { useEffect, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useDialogue } from '../hooks/useDialogue';
import ParameterBars from './ParameterBars';
import VisualNovelScene from './VisualNovelScene';
import TimeIndicator from './TimeIndicator';

import DialogueBox from './DialogueBox';
import ResultsScreen from './ResultsScreen';
import StartScreen from './StartScreen';
import EmojiPopup from './EmojiPopup';
import { Parameters } from '../types/game';

const GameInterface: React.FC = () => {
  const {
    gameState,
    currentDecision,
    makeChoice,
    restartGame,
    isGameComplete,
    startGame
  } = useGameState();

  const { dialogueState, showDialogue, hideDialogue, completeDialogue } = useDialogue();
  const lastDecisionId = useRef<number | null>(null);
  const [showEmojiEffects, setShowEmojiEffects] = useState(false);
  const [lastChoiceImpact, setLastChoiceImpact] = useState<Parameters | null>(null);

  // Show dialogue when decision changes (only once per decision)
  useEffect(() => {
    if (currentDecision && currentDecision.id !== lastDecisionId.current) {
      lastDecisionId.current = currentDecision.id;
      showDialogue(currentDecision.description, 'Narrator');
    }
  }, [currentDecision, showDialogue]);

  const handleChoice = (choiceIndex: number) => {
    if (!currentDecision || gameState.isAnimating || showEmojiEffects) return;

    const choice = currentDecision.choices[choiceIndex];
    
    // Show emoji effects for this choice
    setLastChoiceImpact(choice.impact);
    setShowEmojiEffects(true);
    
    // Delay making the actual choice to prevent double firing
    setTimeout(() => {
      makeChoice(choiceIndex);
    }, 100);
  };

  const handleEmojiComplete = () => {
    setShowEmojiEffects(false);
    setLastChoiceImpact(null);
  };

  if (!gameState.gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  if (isGameComplete) {
    return <ResultsScreen gameState={gameState} onRestart={restartGame} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Visual Novel Scene */}
      <VisualNovelScene 
        decision={currentDecision}
        parameters={gameState.parameters}
        currentHour={gameState.currentHour}
        isAnimating={gameState.isAnimating}
      />
      
      {/* HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="grid grid-cols-3 items-start p-4">
          <div className="pointer-events-auto">
            <ParameterBars parameters={gameState.parameters} />
          </div>
          <div className="flex justify-center pointer-events-auto">
            {currentDecision && (
              <TimeIndicator 
                time={currentDecision.time}
                timeOfDay={currentDecision.timeOfDay}
                currentHour={gameState.currentHour}
              />
            )}
          </div>
          <div className="pointer-events-auto flex justify-end">
            <button
              onClick={restartGame}
              className="px-3 py-1.5 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-black/50 transition-all duration-300 border border-white/10 text-sm"
            >
              Restart
            </button>
          </div>
        </div>
      </div>

      {/* Pokemon-style Dialogue Box */}
      <DialogueBox
        characterName={dialogueState.characterName}
        dialogue={dialogueState.currentDialogue}
        onDialogueComplete={completeDialogue}
        isVisible={dialogueState.isDialogueActive}
        choices={dialogueState.isDialogueCompleted ? currentDecision?.choices : undefined}
        onChoice={handleChoice}
      />

      {/* Emoji Feedback Effects */}
      {showEmojiEffects && lastChoiceImpact && (
        <EmojiPopup
          impact={lastChoiceImpact}
          onComplete={handleEmojiComplete}
        />
      )}
    </div>
  );
};

export default GameInterface;