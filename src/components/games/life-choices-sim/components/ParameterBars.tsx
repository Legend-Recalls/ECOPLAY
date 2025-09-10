import React from 'react';
import { Heart, Smile, Leaf, DollarSign } from 'lucide-react';
import { Parameters } from '../types/game';

interface ParameterBarsProps {
  parameters: Parameters;
}

const ParameterBars: React.FC<ParameterBarsProps> = ({ parameters }) => {
  const parameterConfig = [
    { 
      key: 'health' as keyof Parameters, 
      label: 'Health', 
      icon: Heart, 
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/20'
    },
    { 
      key: 'satisfaction' as keyof Parameters, 
      label: 'Satisfaction', 
      icon: Smile, 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/20'
    },
    { 
      key: 'environment' as keyof Parameters, 
      label: 'Environment', 
      icon: Leaf, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20'
    },
    { 
      key: 'cost' as keyof Parameters, 
      label: 'Budget', 
      icon: DollarSign, 
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-500/20'
    }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-3 shadow-lg animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {parameterConfig.map(({ key, label, icon: Icon, color, bgColor }) => {
          const value = parameters[key];
          const displayValue = key === 'cost' ? 100 - value : value;
          const displayLabel = key === 'cost' ? 'Budget' : label;
          
          return (
            <div key={key} className="flex items-center gap-2">
              <div className="p-1.5 bg-white/5 rounded">
                <Icon className="w-4 h-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/60 truncate">{displayLabel}</div>
                <div className={`h-2 ${bgColor} rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full bg-gradient-to-r ${color} transition-all duration-800 ease-out`}
                    style={{ width: `${Math.max(0, Math.min(100, displayValue))}%` }}
                  />
                </div>
              </div>
              <span className="text-white/80 font-semibold text-sm min-w-[2.5rem] text-right">
                {Math.round(displayValue)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParameterBars;