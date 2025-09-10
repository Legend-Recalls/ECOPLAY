import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Leaf, Droplets, Recycle, Zap, Globe, ArrowRight } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import EnvironmentalHub from '../components/EnvironmentalHub';
const Learning = () => {
  const topics = [
    {
      id: 'climate',
      title: 'Climate Change',
      description: 'Understanding global warming, greenhouse gases, and their impact on our planet.',
      icon: Globe,
      color: 'blue',
      facts: [
        'CO² levels have increased 40% since pre-industrial times',
        'The last decade was the warmest on record',
        'Arctic sea ice is declining at 13% per decade',
      ],
    },
    {
      id: 'water',
      title: 'Water Conservation',
      description: 'Learn about the water cycle, pollution, and conservation strategies.',
      icon: Droplets,
      color: 'cyan',
      facts: [
        'Less than 3% of Earth\'s water is fresh water',
        'A dripping faucet wastes 3,000 gallons per year',
        'Agriculture uses 70% of the world\'s fresh water',
      ],
    },
    {
      id: 'waste',
      title: 'Waste Management',
      description: 'Explore recycling, composting, and reducing waste in daily life.',
      icon: Recycle,
      color: 'emerald',
      facts: [
        'The average person produces 4.5 pounds of trash daily',
        'Recycling one aluminum can saves enough energy to run a TV for 3 hours',
        'Paper can be recycled up to 7 times',
      ],
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      description: 'Discover solar, wind, and other clean energy sources.',
      icon: Zap,
      color: 'yellow',
      facts: [
        'Solar energy could power the world 10,000 times over',
        'Wind power capacity has grown 75% in the last decade',
        'Hydroelectric power generates 16% of world electricity',
      ],
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity',
      description: 'Understanding ecosystems, endangered species, and habitat conservation.',
      icon: Leaf,
      color: 'green',
      facts: [
        'Earth hosts 8.7 million species',
        'Deforestation destroys 27,000 species annually',
        'Bees pollinate 1/3 of everything we eat',
      ],
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
            Environmental Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore key environmental topics and discover fascinating facts about our planet.
            Learn the science behind environmental challenges and solutions.
          </p>
        </motion.div>

      {/* Environmental Learning Hub */}
      </motion.div>
      
      {/* Quick Facts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Quick Environmental Facts
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className={`h-20 bg-gradient-to-r from-${topic.color}-400 to-${topic.color}-600 flex items-center justify-center`}>
                <topic.icon className="w-10 h-10 text-white" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {topic.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Did You Know?
                  </h4>
                  <ul className="space-y-2">
                    {topic.facts.map((fact, factIndex) => (
                      <li key={factIndex} className="text-sm text-gray-600 flex items-start">
                        <span className={`w-2 h-2 bg-${topic.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`} />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
        {/* Additional Learning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
            <p className="text-xl mb-6 opacity-90">
              Now that you've learned about environmental issues, put your knowledge to the test!
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learning;