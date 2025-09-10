import { useState, useCallback } from 'react';

export interface DialogueState {
  isDialogueActive: boolean;
  currentDialogue: string;
  characterName: string;
  isDialogueCompleted: boolean;
}

export const useDialogue = () => {
  const [dialogueState, setDialogueState] = useState<DialogueState>({
    isDialogueActive: false,
    currentDialogue: '',
    characterName: '',
    isDialogueCompleted: false,
  });

  const showDialogue = useCallback((dialogue: string, characterName: string = 'You') => {
    setDialogueState({
      isDialogueActive: true,
      currentDialogue: dialogue,
      characterName,
      isDialogueCompleted: false,
    });
  }, []);

  const hideDialogue = useCallback(() => {
    setDialogueState(prev => ({
      ...prev,
      isDialogueActive: false,
    }));
  }, []);

  const completeDialogue = useCallback(() => {
    setDialogueState(prev => ({
      ...prev,
      isDialogueCompleted: true,
    }));
  }, []);

  return {
    dialogueState,
    showDialogue,
    hideDialogue,
    completeDialogue,
  };
};
