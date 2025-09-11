import React, { useState } from 'react';
import { Footprints, Leaf, Headset as VrHeadset } from 'lucide-react';
import { ChallengeCard } from '../components/ecoplay/ChallengeCard';
import { Modal } from '../components/ecoplay/Modal';
import { CarbonFootprintModal } from '../components/ecoplay/CarbonFootprintModal';
import { EcoChallengesModal } from '../components/ecoplay/EcoChallengesModal';
import { ARVRModal } from '../components/ecoplay/ARVRModal';

type ModalType = 'carbon' | 'challenges' | 'arvr' | null;

function EcoPlay() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const challenges = [
    {
      id: 'carbon',
      title: 'Carbon Footprint Tracker',
      icon: Footprints,
      gradient: 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600',
    },
    {
      id: 'challenges',
      title: 'Eco-Challenges',
      icon: Leaf,
      gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600',
    },
    {
      id: 'arvr',
      title: 'Explore AR/VR',
      icon: VrHeadset,
      gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600',
    },
  ];

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getModalIllustration = (modalType: ModalType) => {
    switch (modalType) {
      case 'carbon':
        return (
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float shadow-2xl">
              <Footprints className="text-white" size={64} />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Track Your Impact</h4>
            <p className="text-gray-600">Every step counts towards a greener future</p>
          </div>
        );
      case 'challenges':
        return (
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float shadow-2xl">
              <Leaf className="text-white" size={64} />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Join the Movement</h4>
            <p className="text-gray-600">Complete challenges and earn rewards</p>
          </div>
        );
      case 'arvr':
        return (
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float shadow-2xl">
              <VrHeadset className="text-white" size={64} />
            </div>
            <h4 className="text-xl font-bold text-gray-800">Immersive Learning</h4>
            <p className="text-gray-600">Experience the future of education</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="glassmorphism shadow-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              EcoPlay
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Learn, play, and make a difference for our planet through interactive challenges
            </p>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            🌱 Challenges
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium">
            Join our environmental challenges, track your impact, and explore the world through AR/VR experiences. 
            Every action counts towards a sustainable future!
          </p>
        </div>

        {/* Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              icon={challenge.icon}
              gradient={challenge.gradient}
              onClick={() => openModal(challenge.id as ModalType)}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Fun Stats Section */}
        <div className="mt-20 glassmorphism rounded-3xl shadow-2xl p-10 border border-white/20">
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-10">
            Community Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">4,521 kg</div>
              <div className="text-gray-700 font-medium text-lg">CO₂ Saved This Month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">2,847</div>
              <div className="text-gray-700 font-medium text-lg">Active Eco-Warriors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">1,156</div>
              <div className="text-gray-700 font-medium text-lg">Trees Planted</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 pt-10 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">342</div>
              <div className="text-gray-700 font-medium text-lg">Plastic Items Avoided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">8,934 L</div>
              <div className="text-gray-700 font-medium text-lg">Water Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'carbon'}
        onClose={closeModal}
        title="🚶‍♂️🚴 Carbon Footprint Tracker"
        illustration={getModalIllustration('carbon')}
      >
        <CarbonFootprintModal />
      </Modal>

      <Modal
        isOpen={activeModal === 'challenges'}
        onClose={closeModal}
        title="🌏 Eco-Challenges"
        illustration={getModalIllustration('challenges')}
      >
        <EcoChallengesModal />
      </Modal>

      <Modal
        isOpen={activeModal === 'arvr'}
        onClose={closeModal}
        title="🥽 AR/VR Experiences"
        illustration={getModalIllustration('arvr')}
      >
        <ARVRModal />
      </Modal>
    </div>
  );
}

export default EcoPlay;
