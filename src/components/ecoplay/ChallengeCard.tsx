import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
  delay?: number;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  icon: Icon,
  gradient,
  onClick,
  delay = 0,
}) => {
  return (
    <div
      className={`${gradient} p-8 rounded-3xl shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:-translate-y-2 group glassmorphism-dark relative overflow-hidden`}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-bounce-gentle"></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="flex flex-col items-center text-center">
        <div className="bg-white/20 p-6 rounded-full mb-6 group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
          <Icon size={48} className="text-white drop-shadow-lg" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg group-hover:scale-105 transition-transform duration-300">{title}</h3>
        <div className="w-16 h-1 bg-white/50 rounded-full group-hover:bg-white group-hover:w-20 transition-all duration-500"></div>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
};