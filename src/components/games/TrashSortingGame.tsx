import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useGame } from '../../contexts/GameContext';

interface TrashItem {
  id: string;
  name: string;
  emoji: string;
  category: 'recyclable' | 'organic' | 'hazardous' | 'general';
}

const trashItems: TrashItem[] = [
  { id: '1', name: 'Plastic Bottle', emoji: '🍶', category: 'recyclable' },
  { id: '2', name: 'Banana Peel', emoji: '🍌', category: 'organic' },
  { id: '3', name: 'Battery', emoji: '🔋', category: 'hazardous' },
  { id: '4', name: 'Newspaper', emoji: '📰', category: 'recyclable' },
  { id: '5', name: 'Apple Core', emoji: '🍎', category: 'organic' },
  { id: '6', name: 'Light Bulb', emoji: '💡', category: 'hazardous' },
  { id: '7', name: 'Food Wrapper', emoji: '🍬', category: 'general' },
  { id: '8', name: 'Glass Jar', emoji: '🫙', category: 'recyclable' },
];

const bins = [
  { category: 'recyclable', name: 'Recyclable', color: 'blue', emoji: '♻️' },
  { category: 'organic', name: 'Organic', color: 'green', emoji: '🌱' },
  { category: 'hazardous', name: 'Hazardous', color: 'red', emoji: '⚠️' },
  { category: 'general', name: 'General', color: 'gray', emoji: '🗑️' },
];

const TrashSortingGame = () => {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [currentItems, setCurrentItems] = useState<TrashItem[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: '',
  });
  const [draggedItem, setDraggedItem] = useState<TrashItem | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCurrentItems([...trashItems]);
    setScore(0);
    setGameCompleted(false);
    setFeedback({ show: false, correct: false, message: '' });
  };

  const handleDrop = (category: string) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.category === category;
    
    if (isCorrect) {
      setScore(score + 10);
      setCurrentItems(currentItems.filter(item => item.id !== draggedItem.id));
      showFeedback(true, `Correct! ${draggedItem.name} goes in ${category}!`);
      
      if (currentItems.length === 1) {
        setTimeout(() => {
          setGameCompleted(true);
          dispatch({ type: 'ADD_ECO_POINTS', payload: 30 });
          dispatch({ type: 'COMPLETE_LESSON', payload: 'trash-sorting' });
        }, 1000);
      }
    } else {
      showFeedback(false, `Oops! ${draggedItem.name} should not go in ${category}`)
    }
    
    setDraggedItem(null);
  };

  const showFeedback = (correct: boolean, message: string) => {
    setFeedback({ show: true, correct, message });
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: '' });
    }, 2000);
  };

  const handleTouchStart = (item: TrashItem) => {
    setDraggedItem(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/interactive')}
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lessons</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full px-4 py-2 shadow-md">
              <span className="text-emerald-600 font-bold">Score: {score}</span>
            </div>
            <button
              onClick={resetGame}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            🗂️ Waste Sorting Challenge
          </h1>
          <p className="text-lg text-gray-600">
            Drag each item to the correct bin to learn about waste management!
          </p>
        </motion.div>

        {/* Game Area */}
        {!gameCompleted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Items to Sort */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Items to Sort</h2>
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence>
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, x: 100 }}
                      transition={{ delay: index * 0.1 }}
                      draggable
                      onDragStart={() => setDraggedItem(item)}
                      onTouchStart={() => handleTouchStart(item)}
                      className="bg-white rounded-xl p-4 shadow-md cursor-move hover:shadow-lg transition-shadow border-2 border-transparent hover:border-emerald-200"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <div className="font-medium text-gray-800">{item.name}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Bins */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sort Into Bins</h2>
              <div className="grid grid-cols-2 gap-4">
                {bins.map((bin) => (
                  <motion.div
                    key={bin.category}
                    whileHover={{ scale: 1.02 }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(bin.category)}
                    onClick={() => draggedItem && handleDrop(bin.category)}
                    className={`bg-${bin.color}-100 border-2 border-dashed border-${bin.color}-300 rounded-xl p-6 text-center cursor-pointer hover:border-${bin.color}-500 transition-colors min-h-32 flex flex-col items-center justify-center`}
                  >
                    <div className="text-3xl mb-2">{bin.emoji}</div>
                    <div className={`font-bold text-${bin.color}-700`}>{bin.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-emerald-600 mb-4">
              Congratulations!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              You've successfully sorted all items! You earned 30 eco-points.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetGame}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => navigate('/interactive')}
                className="bg-white text-emerald-600 border-2 border-emerald-500 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                More Lessons
              </button>
            </div>
          </motion.div>
        )}

        {/* Feedback */}
        <AnimatePresence>
          {feedback.show && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg ${
                feedback.correct ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {feedback.correct ? 
                  <CheckCircle className="w-5 h-5" /> : 
                  <XCircle className="w-5 h-5" />
                }
                <span className="font-medium">{feedback.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrashSortingGame;