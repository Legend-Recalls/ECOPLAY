import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplets, Recycle, Zap, Users, Star, BookText, Leaf } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const InteractiveLessons = () => {
  const { state } = useGame();

  const lessons = [
    
    {
      id: 'trash-sorting',
      title: 'Waste Sorting Challenge',
      description: 'Learn to sort waste correctly through drag & drop',
      icon: Recycle,
      difficulty: 'Beginner',
      duration: '5 mins',
      points: 30,
      path: '/interactive/trash-sorting',
      color: 'emerald',
      ageGroup: 'Kids',
    },
    {
      id: 'power-grid',
      title: 'Power Grid Simulator',
      description: 'Manage energy sources and keep the grid stable',
      icon: Zap,
      difficulty: 'Advanced',
      duration: '15 mins',
      points: 75,
      path: '/interactive/power-grid',
      color: 'yellow',
      ageGroup: 'Adults',
    },
    {
      id: 'eco-vocab',
      title: 'Eco Vocab Challenge',
      description: 'A Wordle/Hangman hybrid for environmental science terms',
      icon: BookText, // You might need to import this icon
      difficulty: 'Medium',
      duration: '10 mins',
      points: 60,
      path: '/interactive/eco-vocab',
      color: 'green',
      ageGroup: 'Teens & Adults',
    },
    {
      id: 'recycle-rush',
      title: 'Recycle Rush',
      description: 'Catch the trash and avoid recyclables in this fast-paced arcade game!',
      icon: Recycle, // Using the existing Recycle icon
      difficulty: 'Medium',
      duration: '5 mins',
      points: 40,
      path: '/interactive/recycle-rush',
      color: 'green',
      ageGroup: 'Kids & Adults',
    },
    {
      id: 'nutrient-cycle',
      title: 'Nutrient Cycle',
      description: 'Learn about the nutrient cycle in this interactive lesson!',
      icon: Leaf,
      difficulty: 'Beginner',
      duration: '10 mins',
      points: 50,
      path: '/interactive/nutrient-cycle',
      color: 'green',
      ageGroup: 'Kids & Adults',
    },
    {
      id: 'life-choices-sim',
      title: 'Life Choices Sim',
      description: 'Simulate life choices and see their environmental impact.',
      icon: Users,
      difficulty: 'Medium',
      duration: '15 mins',
      points: 80,
      path: '/interactive/life-choices-sim',
      color: 'blue',
      ageGroup: 'Teens & Adults',
    },
  ];

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
            Interactive Lessons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn through hands-on activities and games designed to make environmental education engaging and fun!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = state.user.completedLessons.includes(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className={`h-32 bg-gradient-to-br from-${lesson.color}-400 to-${lesson.color}-600 flex items-center justify-center relative`}>
                  <lesson.icon className="w-16 h-16 text-white" />
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
                      <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {lesson.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${lesson.color}-100 text-${lesson.color}-700 font-medium`}>
                      {lesson.ageGroup}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{lesson.difficulty}</span>
                      </span>
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-emerald-600">
                      <span className="font-semibold">+{lesson.points}</span>
                      <span>🌱</span>
                    </div>
                  </div>
                  
                  <Link to={lesson.path}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : `bg-${lesson.color}-500 text-white hover:bg-${lesson.color}-600`
                      }`}
                    >
                      {isCompleted ? 'Play Again' : 'Start Lesson'}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {state.user.completedLessons.length}
              </div>
              <div className="text-blue-700">Lessons Completed</div>
            </div>
            
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round((state.user.completedLessons.length / lessons.length) * 100)}%
              </div>
              <div className="text-emerald-700">Progress</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {state.user.badges.filter(b => b.earned).length}
              </div>
              <div className="text-purple-700">Badges Earned</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveLessons;