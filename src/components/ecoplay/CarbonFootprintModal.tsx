import React, { useState } from 'react';
import { Car, Bike, Bus, MapPin, Trophy, TrendingUp, Sparkles, Leaf } from 'lucide-react';

const transportOptions = [
  { id: 'walk', label: 'Walk', icon: MapPin, co2: 0, color: 'from-green-400 to-emerald-500' },
  { id: 'bicycle', label: 'Bicycle', icon: Bike, co2: 0, color: 'from-blue-400 to-cyan-500' },
  { id: 'bus', label: 'Bus', icon: Bus, co2: 89, color: 'from-yellow-400 to-orange-500' },
  { id: 'car', label: 'Car', icon: Car, co2: 404, color: 'from-red-400 to-pink-500' },
];

export const CarbonFootprintModal: React.FC = () => {
  const [selectedTransport, setSelectedTransport] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [weeklySavings] = useState(2.8); // kg CO2 saved this week

  const handleSubmit = () => {
    if (selectedTransport) {
      setSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const selectedOption = transportOptions.find(option => option.id === selectedTransport);
  const carOption = transportOptions.find(option => option.id === 'car');
  const savings = carOption && selectedOption ? carOption.co2 - selectedOption.co2 : 0;

  if (submitted && selectedOption) {
    return (
      <div className="text-center relative">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              >
                <Sparkles className="text-yellow-400" size={16} />
              </div>
            ))}
          </div>
        )}
        
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow shadow-2xl">
            <Trophy className="text-white" size={48} />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">Great Choice!</h3>
          <p className="text-gray-700 text-lg">You chose to {selectedOption.label.toLowerCase()} today</p>
        </div>

        <div className="glassmorphism rounded-3xl p-8 mb-8 border border-green-200/30">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="text-green-600 mr-3 animate-bounce-gentle" size={28} />
            <span className="text-xl font-semibold text-gray-800">CO₂ Impact</span>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            {savings > 0 ? `-${savings}g` : '0g'} CO₂
          </div>
          <p className="text-gray-700 text-lg">
            {savings > 0 ? 'Saved compared to car travel' : 'Your eco-friendly choice!'}
          </p>
        </div>

        <div className="glassmorphism rounded-3xl p-8 mb-8 border border-blue-200/30">
          <h4 className="font-semibold text-gray-800 mb-4 text-lg">Weekly Progress</h4>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 animate-progress relative"
              style={{ width: `${Math.min((weeklySavings / 5) * 100, 100)}%` }}
            >
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <MapPin className="text-white" size={12} />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-gray-700 font-medium">
            <span>{weeklySavings} kg CO₂ saved</span>
            <span>Goal: 5 kg</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          View Leaderboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
          How did you travel today?
        </h3>
        <p className="text-gray-700 text-lg">Track your daily carbon footprint</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {transportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setSelectedTransport(option.id)}
              className={`p-8 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                selectedTransport === option.id
                  ? 'border-blue-400 glassmorphism shadow-2xl'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-gentle`}>
                <Icon className="text-white" size={28} />
              </div>
              <div className="font-bold text-gray-800 text-lg mb-1">{option.label}</div>
              <div className="text-gray-600 font-medium">{option.co2}g CO₂</div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedTransport}
        className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
          selectedTransport
            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:scale-105 hover:shadow-2xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Submit Today's Travel
      </button>
    </div>
  );
};