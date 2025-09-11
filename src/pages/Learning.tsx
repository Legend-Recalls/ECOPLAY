import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Leaf, Droplets, Recycle, Zap, Globe, ArrowRight, TrendingUp } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import EnvironmentalHub from '../components/EnvironmentalHub';

const Learning = () => {
  const { state } = useGame();

  return (
    <div className="min-h-screen py-8">
      {/* Environmental Learning Hub Component */}
      <EnvironmentalHub />
      
      {/* User Progress Section */}
      {state.user.ecoPoints > 0 && (
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Learning Journey</h2>
              <p className="text-gray-600">Track your progress and achievements</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-emerald-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {state.user.ecoPoints}
                </div>
                <div className="text-emerald-700 font-medium">Eco Points</div>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Object.keys(state.user.quizScores).length}
                </div>
                <div className="text-blue-700 font-medium">Quizzes Taken</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {state.user.badges.filter(b => b.earned).length}
                </div>
                <div className="text-purple-700 font-medium">Badges Earned</div>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {state.user.completedLessons.length}
                </div>
                <div className="text-orange-700 font-medium">Lessons Done</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
          <p className="text-xl mb-6 opacity-90">
            Now that you've explored environmental topics, put your knowledge to the test!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/quizzes">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Take a Quiz
              </motion.button>
            </a>
            <a href="/interactive">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Play Games
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learning;