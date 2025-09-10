import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const LifeChoicesSimLanding = () => {
  const lessonDetails = [
    {
      id: 'life-choices-sim',
      title: 'Life Choices Sim',
      description: 'Simulate life choices and see their environmental impact.',
      icon: Users,
      path: '/interactive/life-choices-sim/play',
      color: 'blue',
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
            Life Choices Sim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Begin your interactive journey into the world of life choices and their environmental impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessonDetails.map((lesson, index) => (
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
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {lesson.description}
                </p>
                
                <Link to={lesson.path}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors bg-${lesson.color}-500 text-white hover:bg-${lesson.color}-600`}
                  >
                    Start Lesson
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifeChoicesSimLanding;
