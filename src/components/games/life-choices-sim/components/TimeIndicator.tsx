import React from 'react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface TimeIndicatorProps {
  time: string;
  timeOfDay: string;
  currentHour: number;
}

const TimeIndicator: React.FC<TimeIndicatorProps> = ({ time, timeOfDay }) => {
  const getTimeIcon = () => {
    switch (timeOfDay) {
      case 'morning':
        return <Sunrise className="w-6 h-6 text-orange-400" />;
      case 'afternoon':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'evening':
        return <Sunset className="w-6 h-6 text-orange-500" />;
      case 'night':
        return <Moon className="w-6 h-6 text-blue-300" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center gap-3">
        {getTimeIcon()}
        <div className="text-white font-semibold text-lg">{time}</div>
      </div>
    </div>
  );
};

export default TimeIndicator;