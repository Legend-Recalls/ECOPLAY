import React, { useState } from 'react';
import { Camera, Eye, Play, Smartphone, Sparkles, Zap } from 'lucide-react';

export const ARVRModal: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<'ar' | 'vr' | null>(null);

  if (selectedExperience === 'ar') {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-28 h-28 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow shadow-2xl">
            <Camera className="text-white" size={56} />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">AR Biodiversity Scanner</h3>
          <p className="text-gray-700 text-lg">Point your camera at any leaf or natural object</p>
        </div>

        <div className="glassmorphism rounded-3xl p-10 mb-8 border border-green-200/30">
          <div className="border-4 border-dashed border-gray-300 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-4 right-4 animate-bounce-gentle">
              <Sparkles className="text-purple-400" size={20} />
            </div>
            <Smartphone className="mx-auto text-gray-400 mb-6" size={56} />
            <p className="text-gray-700 mb-6 text-lg">Camera view would appear here</p>
            <div className="glassmorphism rounded-2xl p-6 shadow-xl border border-white/30">
              <h4 className="font-bold text-gray-800 mb-3 text-xl">Oak Leaf Detected! 🍃</h4>
              <p className="text-gray-700">
                This is a White Oak leaf. These trees can live for over 200 years and support 
                over 500 species of caterpillars!
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setSelectedExperience(null)}
            className="flex-1 bg-gray-200 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            Back
          </button>
          <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Start Scanning
          </button>
        </div>
      </div>
    );
  }

  if (selectedExperience === 'vr') {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-28 h-28 bg-gradient-to-r from-blue-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow shadow-2xl">
            <Eye className="text-white" size={56} />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">VR City Experience</h3>
          <p className="text-gray-700 text-lg">Compare polluted vs. green cities in immersive VR</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-red-900 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h4 className="font-bold mb-4 text-xl">Polluted City</h4>
            <div className="aspect-video bg-gray-700 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
              <Play className="text-white opacity-70 hover:opacity-100 transition-opacity duration-300" size={40} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="opacity-90 text-lg">Experience the effects of pollution on urban life</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h4 className="font-bold mb-4 text-xl">Green City</h4>
            <div className="aspect-video bg-green-600 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
              <Play className="text-white opacity-70 hover:opacity-100 transition-opacity duration-300" size={40} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="opacity-90 text-lg">Discover sustainable urban environments</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setSelectedExperience(null)}
            className="flex-1 bg-gray-200 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            Back
          </button>
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Start VR Experience
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
          Immersive Learning Experiences
        </h3>
        <p className="text-gray-700 text-lg">Explore the environment through cutting-edge technology</p>
      </div>

      <div className="space-y-4">
        <div 
          onClick={() => setSelectedExperience('ar')}
          className="glassmorphism rounded-3xl p-8 cursor-pointer hover:border-purple-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group border border-gray-200/30"
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-6 shadow-lg group-hover:animate-bounce-gentle">
              <Camera className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 group-hover:text-purple-700 text-lg mb-1">AR Biodiversity Scanner</h4>
              <p className="text-gray-700">Scan leaves and objects to learn about nature</p>
            </div>
          </div>
          <div className="glassmorphism rounded-2xl p-4 text-purple-700 font-medium border border-purple-200/30">
            📱 Uses your device camera to identify and teach about biodiversity
          </div>
        </div>

        <div 
          onClick={() => setSelectedExperience('vr')}
          className="glassmorphism rounded-3xl p-8 cursor-pointer hover:border-blue-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group border border-gray-200/30"
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-6 shadow-lg group-hover:animate-bounce-gentle">
              <Eye className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 group-hover:text-blue-700 text-lg mb-1">VR City Comparison</h4>
              <p className="text-gray-700">Experience polluted vs. green cities in VR</p>
            </div>
          </div>
          <div className="glassmorphism rounded-2xl p-4 text-blue-700 font-medium border border-blue-200/30">
            🥽 Immersive virtual reality experience comparing urban environments
          </div>
        </div>
      </div>

      <div className="mt-8 glassmorphism rounded-3xl p-6 border border-yellow-200/30">
        <div className="flex items-center justify-center mb-2">
          <Zap className="text-yellow-500 mr-2 animate-bounce-gentle" size={24} />
          <span className="font-bold text-gray-800 text-lg">Pro Tip</span>
        </div>
        <p className="text-center text-gray-700">
          Complete AR/VR experiences to unlock special eco-badges!
        </p>
      </div>
    </div>
  );
};