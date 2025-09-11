import React, { useState } from 'react';
import { Award, Calendar, Droplets, Zap, Recycle, TreePine, Car, Utensils, ShoppingBag, Lightbulb, Sparkles, Crown } from 'lucide-react';

const challenges = [
  {
    id: 'plastic-free',
    title: 'Plastic-Free Week',
    description: 'Avoid single-use plastics for 7 days',
    icon: Recycle,
    progress: 3,
    maxProgress: 7,
    points: 150,
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 'tree-planting',
    title: 'Plant a Tree Challenge',
    description: 'Plant or sponsor a tree and track its growth',
    icon: TreePine,
    progress: 1,
    maxProgress: 1,
    points: 200,
    color: 'from-emerald-400 to-green-600',
  },
  {
    id: 'water-save',
    title: 'Save 10 Liters Water Today',
    description: 'Reduce water usage in daily activities',
    icon: Droplets,
    progress: 6,
    maxProgress: 10,
    points: 75,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint Reduction',
    description: 'Reduce daily CO₂ emissions by 2kg this week',
    icon: Car,
    progress: 4.2,
    maxProgress: 14,
    points: 180,
    color: 'from-gray-400 to-slate-600',
  },
  {
    id: 'sustainable-eating',
    title: 'Sustainable Eating Week',
    description: 'Choose plant-based meals for 5 days',
    icon: Utensils,
    progress: 2,
    maxProgress: 5,
    points: 120,
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'eco-shopping',
    title: 'Eco-Friendly Shopping',
    description: 'Use reusable bags and buy local products',
    icon: ShoppingBag,
    progress: 0,
    maxProgress: 3,
    points: 90,
    color: 'from-purple-400 to-indigo-500',
  },
  {
    id: 'energy-conservation',
    title: 'Energy Conservation Day',
    description: 'Reduce electricity usage by 30% today',
    icon: Lightbulb,
    progress: 0,
    maxProgress: 1,
    points: 100,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'no-electricity',
    title: 'No Electricity Hour',
    description: 'Turn off all non-essential electronics for 1 hour',
    icon: Zap,
    progress: 0,
    maxProgress: 1,
    points: 50,
    color: 'from-yellow-400 to-orange-500',
  },
];

export const EcoChallengesModal: React.FC = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(['tree-planting']);

  const joinChallenge = (challengeId: string) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
          Join Environmental Challenges
        </h3>
        <p className="text-gray-700 text-lg">Make a difference while earning points and badges</p>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => {
          const Icon = challenge.icon;
          const isJoined = joinedChallenges.includes(challenge.id);
          const isCompleted = completedChallenges.includes(challenge.id) || challenge.progress >= challenge.maxProgress;
          const progressPercentage = Math.min((challenge.progress / challenge.maxProgress) * 100, 100);
          const progressText = challenge.id === 'carbon-footprint' 
            ? `${challenge.progress}kg / ${challenge.maxProgress}kg` 
            : `${challenge.progress} / ${challenge.maxProgress}`;

          return (
            <div key={challenge.id} className={`glassmorphism rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-102 border ${isCompleted ? 'border-green-300/50 animate-glow' : 'border-gray-200/30'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${challenge.color} rounded-full flex items-center justify-center mr-6 shadow-lg ${isCompleted ? 'animate-bounce-gentle' : ''}`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{challenge.title}</h4>
                    <p className="text-gray-700">{challenge.description}</p>
                  </div>
                </div>
                <div className={`flex items-center ${isCompleted ? 'text-green-600' : 'text-amber-500'}`}>
                  {isCompleted ? <Crown size={20} className="mr-2" /> : <Award size={20} className="mr-2" />}
                  <span className="font-bold text-lg">{challenge.points} pts</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-gray-700 font-medium mb-3">
                  <span>Progress</span>
                  <span>{progressText}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${challenge.color} h-3 rounded-full transition-all duration-1000 animate-progress relative`}
                    style={{ width: `${progressPercentage}%` }}
                  >
                    {progressPercentage > 20 && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Icon className="text-white" size={10} />
                      </div>
                    )}
                  </div>
                </div>
                {isCompleted && (
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg animate-glow">
                      <Sparkles className="mr-2" size={16} />
                      Challenge Completed!
                      <Sparkles className="ml-2" size={16} />
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => joinChallenge(challenge.id)}
                className={`w-full py-3 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  isJoined
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white cursor-default shadow-lg'
                    : `bg-gradient-to-r ${challenge.color} text-white hover:opacity-90 hover:scale-105 hover:shadow-xl`
                }`}
                disabled={isJoined}
              >
                {isJoined ? (
                  <div className="flex items-center justify-center">
                    <Calendar size={20} className="mr-2" />
                    Challenge Joined!
                  </div>
                ) : (
                  'Join Challenge'
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 glassmorphism rounded-3xl p-6 text-center border border-purple-200/30">
        <p className="text-gray-700 mb-2 font-medium">Total Points Earned</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">1,285 Points</p>
      </div>

      <div className="mt-6 glassmorphism rounded-3xl p-6 border border-green-200/30">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">12</p>
            <p className="text-gray-700 font-medium">Challenges Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Level 3</p>
            <p className="text-gray-700 font-medium">Eco Warrior</p>
          </div>
        </div>
      </div>
    </div>
  );
};