import { Card } from '../../ui/card';

interface SimulationData {
  generation: {
    coal: number;
    gas: number;
    hydro: number;
    solar: number;
    wind: number;
    battery: number;
  };
  demand: {
    residential: number;
    commercial: number;
    industrial: number;
  };
  dsm: number;
  tariffs: {
    residential: number;
    commercial: number;
    industrial: number;
  };
  timeSeriesData: any[];
  currentTime: { hour: number; minute: number };
}

interface CityMapProps {
  simulationData: SimulationData;
}

export const CityMap = ({ simulationData }: CityMapProps) => {
  // Calculate grid balance for dynamic line coloring
  const totalSupply = Object.values(simulationData.generation).reduce((sum, val) => sum + Math.abs(val), 0);
  const totalDemand = Object.values(simulationData.demand).reduce((sum, val) => sum + val, 0);
  const imbalance = totalSupply - totalDemand;
  const imbalanceRatio = Math.abs(imbalance) / Math.max(totalDemand, 1);
  
  // Determine line color based on grid balance
  const getLineColor = (lineType: 'generation' | 'distribution') => {
    if (lineType === 'generation') {
      // Generator lines show source colors
      return 'source'; // Will be replaced with actual source colors
    } else {
      // Distribution lines change based on grid balance
      if (imbalanceRatio < 0.05) return 'stroke-success'; // Balanced (green)
      if (imbalance > 0) return 'stroke-warning'; // Oversupply (yellow)
      return 'stroke-destructive'; // Undersupply (red)
    }
  };
  
  const getLineAnimation = () => {
    if (imbalanceRatio > 0.1) return 'animate-pulse'; // High imbalance
    if (imbalanceRatio > 0.05) return 'opacity-80'; // Medium imbalance
    return 'opacity-60'; // Balanced
  };
  // Use real-time demand data
  const zones = [
    { 
      id: 'residential', 
      name: 'Residential', 
      demand: simulationData.demand.residential, 
      color: 'bg-residential', 
      x: 20, y: 20, width: 25, height: 20 
    },
    { 
      id: 'commercial', 
      name: 'Commercial', 
      demand: simulationData.demand.commercial, 
      color: 'bg-commercial', 
      x: 55, y: 15, width: 25, height: 25 
    },
    { 
      id: 'industrial', 
      name: 'Industrial', 
      demand: simulationData.demand.industrial, 
      color: 'bg-industrial', 
      x: 25, y: 60, width: 30, height: 25 
    }
  ];

  const powerPlants = [
    { id: 'coal1', name: 'Coal Plant', output: simulationData.generation.coal, color: 'bg-coal', x: 10, y: 45, icon: '🏭' },
    { id: 'gas1', name: 'Gas Plant', output: simulationData.generation.gas, color: 'bg-gas', x: 70, y: 50, icon: '🔥' },
    { id: 'hydro1', name: 'Hydro Dam', output: simulationData.generation.hydro, color: 'bg-hydro', x: 5, y: 10, icon: '🌊' },
    { id: 'solar1', name: 'Solar Farm', output: simulationData.generation.solar, color: 'bg-solar', x: 75, y: 20, icon: '☀️' },
    { id: 'wind1', name: 'Wind Farm', output: simulationData.generation.wind, color: 'bg-wind', x: 85, y: 35, icon: '💨' },
    { id: 'battery1', name: 'Battery Bank', output: Math.abs(simulationData.generation.battery), color: 'bg-battery', x: 60, y: 70, icon: simulationData.generation.battery > 0 ? '🔋⚡' : '🔋🔌' }
  ];

  // Main grid hub (central connection point)
  const gridHub = { x: 50, y: 40 };
  
  const transmissionLines = [
    // Connect power plants to grid hub - use source colors
    { from: { x: 10, y: 45 }, to: gridHub, color: 'stroke-coal', type: 'generation', source: 'coal' },
    { from: { x: 70, y: 50 }, to: gridHub, color: 'stroke-gas', type: 'generation', source: 'gas' },
    { from: { x: 5, y: 10 }, to: gridHub, color: 'stroke-hydro', type: 'generation', source: 'hydro' },
    { from: { x: 75, y: 20 }, to: gridHub, color: 'stroke-solar', type: 'generation', source: 'solar' },
    { from: { x: 85, y: 35 }, to: gridHub, color: 'stroke-wind', type: 'generation', source: 'wind' },
    { from: { x: 60, y: 70 }, to: gridHub, color: 'stroke-battery', type: 'generation', source: 'battery' },
    
    // Connect hub to demand zones - dynamic colors based on balance
    { from: gridHub, to: { x: 32, y: 30 }, color: getLineColor('distribution'), type: 'distribution' },
    { from: gridHub, to: { x: 67, y: 27 }, color: getLineColor('distribution'), type: 'distribution' },
    { from: gridHub, to: { x: 40, y: 72 }, color: getLineColor('distribution'), type: 'distribution' }
  ];

  return (
    <div className="h-full p-6 relative flex flex-col min-h-0">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">City Power Grid</h2>
        <p className="text-sm text-muted-foreground">Interactive grid visualization</p>
      </div>

      <Card className="flex-1 min-h-0 p-4 relative overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Grid Status Indicator */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Transmission Lines */}
          {transmissionLines.map((line, index) => {
            const isGenerationLine = line.type === 'generation';
            const isActive = isGenerationLine ? simulationData.generation[line.source as keyof typeof simulationData.generation] > 0 : true;
            const dynamicOpacity = isActive ? getLineAnimation() : 'opacity-20';
            
            return (
              <g key={index} className="animate-fade-in" style={{animationDelay: `${index * 50}ms`}}>
                <line
                  x1={`${line.from.x}%`}
                  y1={`${line.from.y}%`}
                  x2={`${line.to.x}%`}
                  y2={`${line.to.y}%`}
                  className={`${line.color} ${dynamicOpacity} transition-all duration-500`}
                  strokeWidth={isActive ? "3" : "1"}
                  strokeDasharray={isGenerationLine ? "5,5" : imbalanceRatio > 0.1 ? "10,5" : "5,5"}
                  filter={isActive && imbalanceRatio > 0.1 ? "url(#glow)" : "none"}
                />
                {/* Arrow marker with dynamic sizing */}
                <polygon
                  points={`${line.to.x - (isActive ? 1.5 : 0.8)},${line.to.y - (isActive ? 1.5 : 0.8)} ${line.to.x + (isActive ? 1.5 : 0.8)},${line.to.y} ${line.to.x - (isActive ? 1.5 : 0.8)},${line.to.y + (isActive ? 1.5 : 0.8)}`}
                  className={`fill-current ${line.color.replace('stroke-', 'text-')} ${dynamicOpacity} transition-all duration-500`}
                />
                
                {/* Power flow indicator for active generation lines */}
                {isActive && isGenerationLine && (
                  <circle
                    cx={`${(line.from.x + line.to.x) / 2}%`}
                    cy={`${(line.from.y + line.to.y) / 2}%`}
                    r="2"
                    className={`${line.color.replace('stroke-', 'fill-')} animate-pulse`}
                    opacity="0.8"
                  />
                )}
              </g>
            );
          })}
          
          {/* Grid status indicator */}
          <text x="10%" y="90%" className={`text-xs font-semibold transition-colors duration-300 ${
            imbalanceRatio < 0.05 ? 'fill-success' : 
            imbalance > 0 ? 'fill-warning' : 'fill-destructive'
          }`}>
            Grid: {imbalanceRatio < 0.05 ? 'Balanced' : imbalance > 0 ? 'Oversupply' : 'Undersupply'} 
            ({imbalance > 0 ? '+' : ''}{imbalance.toFixed(1)}MW)
          </text>
        </svg>

        {/* Zones */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`absolute ${zone.color} opacity-80 rounded-lg border-2 border-white/20 hover:opacity-90 transition-opacity cursor-pointer`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
              zIndex: 2
            }}
          >
            <div className="p-2 h-full flex flex-col justify-center items-center text-white text-center">
              <div className="text-sm font-semibold">{zone.name}</div>
              <div className="text-xs opacity-90">{zone.demand} MW</div>
            </div>
          </div>
        ))}

        {/* Power Plants */}
        {powerPlants.map((plant) => (
          <div
            key={plant.id}
            className={`absolute ${plant.color} rounded-full w-16 h-16 flex flex-col items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer border-2 border-white/20`}
            style={{
              left: `${plant.x}%`,
              top: `${plant.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 3
            }}
          >
            <div className="text-lg">{plant.icon}</div>
            <div className="text-xs font-semibold mt-1">{plant.output}MW</div>
          </div>
        ))}

        {/* Plant Labels */}
        {powerPlants.map((plant) => (
          <div
            key={`${plant.id}-label`}
            className="absolute bg-card/90 backdrop-blur-sm text-xs px-2 py-1 rounded border border-border/50"
            style={{
              left: `${plant.x}%`,
              top: `${plant.y + 8}%`,
              transform: 'translateX(-50%)',
              zIndex: 4
            }}
          >
            {plant.name}
          </div>
        ))}

        {/* Grid Hub Indicator */}
        <div
          className={`absolute w-6 h-6 rounded-full border-2 border-white/60 transition-all duration-300 ${
            imbalanceRatio < 0.05 
              ? 'bg-success/80 animate-pulse' 
              : imbalance > 0 
                ? 'bg-warning/80 animate-pulse' 
                : 'bg-destructive/80 animate-pulse'
          }`}
          style={{
            left: `${gridHub.x}%`,
            top: `${gridHub.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            boxShadow: imbalanceRatio > 0.1 ? '0 0 20px currentColor' : 'none'
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
            ⚡
          </div>
        </div>

      </Card>
    </div>
  );
};