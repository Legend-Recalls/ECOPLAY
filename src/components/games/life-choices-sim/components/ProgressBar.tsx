import React from 'react';

interface ProgressBarProps {
  currentHour: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentHour }) => {
  const progress = ((currentHour - 6) / 18) * 100; // 6 AM to 12 AM = 18 hours
  
  const getTimeLabel = () => {
    if (currentHour === 24) return '12:00 AM';
    if (currentHour === 12) return '12:00 PM';
    if (currentHour > 12) return `${currentHour - 12}:00 PM`;
    return `${currentHour}:00 AM`;
  };

  return (
    <div className="px-6 pb-4">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
        <div className="flex items-center justify-between text-white text-sm mb-2 px-2">
          <span>6:00 AM</span>
          <span className="font-semibold">{getTimeLabel()}</span>
          <span>12:00 AM</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-purple-400 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;