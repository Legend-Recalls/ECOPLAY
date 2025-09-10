import React from 'react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface EnvironmentProps {
  timeOfDay: string;
}

const Environment: React.FC<EnvironmentProps> = ({ timeOfDay }) => {
  const getEnvironmentStyle = () => {
    switch (timeOfDay) {
      case 'morning':
        return {
          gradient: 'from-orange-300 via-yellow-300 to-blue-300',
          icon: <Sunrise className="w-16 h-16 text-orange-400" />,
          particles: '☀️'
        };
      case 'afternoon':
        return {
          gradient: 'from-blue-400 via-cyan-300 to-yellow-300',
          icon: <Sun className="w-16 h-16 text-yellow-500" />,
          particles: '☁️'
        };
      case 'evening':
        return {
          gradient: 'from-purple-500 via-pink-500 to-orange-400',
          icon: <Sunset className="w-16 h-16 text-orange-500" />,
          particles: '🌅'
        };
      case 'night':
        return {
          gradient: 'from-indigo-900 via-purple-900 to-blue-900',
          icon: <Moon className="w-16 h-16 text-blue-300" />,
          particles: '⭐'
        };
      default:
        return {
          gradient: 'from-blue-400 via-cyan-300 to-yellow-300',
          icon: <Sun className="w-16 h-16 text-yellow-500" />,
          particles: '☁️'
        };
    }
  };

  const { gradient, icon, particles } = getEnvironmentStyle();

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-2000 ease-out`}>
      {/* Sky icon */}
      <div className="absolute top-20 right-20 opacity-30">
        {icon}
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-float text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            {particles}
          </div>
        ))}
      </div>

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

export default Environment;