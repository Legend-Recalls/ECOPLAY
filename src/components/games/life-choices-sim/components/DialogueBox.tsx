import React from 'react';
import { Decision } from '../types/game';

interface DialogueBoxProps {
  characterName: string;
  dialogue: string;
  onDialogueComplete: () => void;
  isVisible: boolean;
  choices?: Decision['choices'];
  onChoice?: (choiceIndex: number) => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  characterName,
  dialogue,
  onDialogueComplete,
  isVisible,
  choices,
  onChoice,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 animate-fade-in p-4">
      <div className="bg-black/70 backdrop-blur-sm rounded-lg border-t-2 border-white/20 shadow-2xl p-4">
        <div className="mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-t-lg inline-block text-lg font-bold">
            {characterName}
          </div>
        </div>
        <div className="text-white text-xl leading-relaxed font-serif mb-6">
          {dialogue}
        </div>

        {choices ? (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onChoice?.(index)}
                className="bg-white/10 hover:bg-white/20 text-white text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center"
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={onDialogueComplete}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-lg font-bold transition-colors duration-200 flex items-center gap-2"
            >
              Continue <span className="animate-pulse">▶</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueBox;