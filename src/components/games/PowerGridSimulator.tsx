
import { useState, useEffect, useRef } from 'react';
import { PlayerControls } from './power-grid-simulator/PlayerControls';
import { CityMap } from './power-grid-simulator/CityMap';
import { MetricsDashboard } from './power-grid-simulator/MetricsDashboard';
import { TimelineControls } from './power-grid-simulator/TimelineControls';
import { EventNotifications } from './power-grid-simulator/EventNotifications';
import { ScorePanel } from './power-grid-simulator/ScorePanel';
import { AutoAdjustButton } from './power-grid-simulator/AutoAdjustButton';

const PowerGridSimulator = () => {
  // Timeline state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('08:00');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Generation state
  const [coalPower, setCoalPower] = useState([250]);
  const [gasPower, setGasPower] = useState([180]);
  const [hydroPower, setHydroPower] = useState([120]);
  const [solarPower, setSolarPower] = useState([90]);
  const [windPower, setWindPower] = useState([75]);

  // Battery state
  const [batteryCharge, setBatteryCharge] = useState(false);
  const [batteryPower, setBatteryPower] = useState([50]);

  // DSM state
  const [dsmLevel, setDsmLevel] = useState([10]);

  // Tariff state
  const [residentialTariff, setResidentialTariff] = useState('4.5');
  const [commercialTariff, setCommercialTariff] = useState('6.2');
  const [industrialTariff, setIndustrialTariff] = useState('5.8');

  // Real-time simulation data
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [currentHour, setCurrentHour] = useState(8);
  const [currentMinute, setCurrentMinute] = useState(0);
  const simulationRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time simulation logic
  useEffect(() => {
    if (isPlaying) {
      simulationRef.current = setInterval(() => {
        setCurrentMinute(prev => {
          const newMinute = prev + 15;
          if (newMinute >= 60) {
            setCurrentHour(prevHour => (prevHour + 1) % 24);
            return 0;
          }
          return newMinute;
        });
      }, 1000 / playbackSpeed); // Update every second, scaled by playback speed
    } else {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
        simulationRef.current = null;
      }
    }

    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  // Update current time display
  useEffect(() => {
    setCurrentTime(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
  }, [currentHour, currentMinute]);

  // Generate realistic time-based values
  const getTimeBasedSolar = () => {
    const baseOutput = solarPower[0];
    const timeOfDay = currentHour + currentMinute / 60;
    if (timeOfDay < 6 || timeOfDay > 18) return 0;
    const solarMultiplier = Math.max(0, Math.sin((timeOfDay - 6) * Math.PI / 12));
    return Math.round(baseOutput * solarMultiplier);
  };

  const getTimeBasedWind = () => {
    const baseOutput = windPower[0];
    const windVariability = 0.6 + Math.sin((currentHour * 60 + currentMinute) / 1440 * 2 * Math.PI) * 0.4; // Use simulation time for deterministic wind
    return Math.round(baseOutput * windVariability);
  };

  const getTimeBasedDemand = () => {
    const baseDemands = { residential: 120, commercial: 85, industrial: 180 };
    const timeOfDay = currentHour + currentMinute / 60;
    
    // Demand curves - peak in evening for residential, business hours for commercial
    const residentialMultiplier = timeOfDay < 6 ? 0.6 : timeOfDay < 9 ? 0.8 : 
                                 timeOfDay < 17 ? 0.7 : timeOfDay < 22 ? 1.2 : 0.8;
    const commercialMultiplier = timeOfDay < 8 ? 0.4 : timeOfDay < 18 ? 1.0 : 0.3;
    const industrialMultiplier = timeOfDay < 6 ? 0.9 : timeOfDay < 22 ? 1.0 : 0.8;
    
    return {
      residential: Math.round(baseDemands.residential * residentialMultiplier * (1 - dsmLevel[0]/100)),
      commercial: Math.round(baseDemands.commercial * commercialMultiplier * (1 - dsmLevel[0]/100)),
      industrial: Math.round(baseDemands.industrial * industrialMultiplier * (1 - dsmLevel[0]/100))
    };
  };

  // Real-time generation values
  const realTimeGeneration = {
    coal: coalPower[0],
    gas: gasPower[0],
    hydro: hydroPower[0],
    solar: getTimeBasedSolar(),
    wind: getTimeBasedWind(),
    battery: batteryCharge ? -batteryPower[0] : batteryPower[0]
  };

  const realTimeDemand = getTimeBasedDemand();

  // Update time series data
  useEffect(() => {
    if (isPlaying) {
      const newDataPoint = {
        time: `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`,
        hour: currentHour + currentMinute / 60,
        supply: Object.values(realTimeGeneration).reduce((sum, val) => sum + Math.abs(val), 0),
        demand: Object.values(realTimeDemand).reduce((sum, val) => sum + val, 0),
        coal: realTimeGeneration.coal,
        gas: realTimeGeneration.gas,
        hydro: realTimeGeneration.hydro,
        solar: realTimeGeneration.solar,
        wind: realTimeGeneration.wind,
        battery: realTimeGeneration.battery,
        residentialDemand: realTimeDemand.residential,
        commercialDemand: realTimeDemand.commercial,
        industrialDemand: realTimeDemand.industrial,
        frequency: 50.0,
        carbonEmissions: realTimeGeneration.coal * 0.9 + realTimeGeneration.gas * 0.4,
        cost: realTimeGeneration.coal * 5 + realTimeGeneration.gas * 4 + realTimeGeneration.hydro * 1.5 + realTimeGeneration.solar * 2 + realTimeGeneration.wind * 1.8
      };

      setTimeSeriesData(prev => [...prev.slice(-23), newDataPoint]); // Keep last 24 data points
    }
  }, [currentHour, currentMinute, isPlaying, coalPower, gasPower, hydroPower, solarPower, windPower, batteryPower, batteryCharge, dsmLevel]);

  // Simulation data for other components
  const simulationData = {
    generation: realTimeGeneration,
    demand: realTimeDemand,
    dsm: dsmLevel[0],
    tariffs: {
      residential: parseFloat(residentialTariff),
      commercial: parseFloat(commercialTariff),
      industrial: parseFloat(industrialTariff)
    },
    timeSeriesData,
    currentTime: { hour: currentHour, minute: currentMinute }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-xl font-bold">Power Grid Simulator</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <AutoAdjustButton 
            simulationData={simulationData}
            setters={{
              setCoalPower,
              setGasPower,
              setHydroPower,
              setSolarPower,
              setWindPower,
              setBatteryPower,
              setBatteryCharge,
              setDsmLevel,
              setResidentialTariff,
              setCommercialTariff,
              setIndustrialTariff
            }}
          />
          <ScorePanel simulationData={simulationData} />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Player Controls */}
        <div className="w-80 bg-sidebar border-r border-border overflow-y-auto">
          <PlayerControls 
            coalPower={coalPower}
            setCoalPower={setCoalPower}
            gasPower={gasPower}
            setGasPower={setGasPower}
            hydroPower={hydroPower}
            setHydroPower={setHydroPower}
            solarPower={solarPower}
            setSolarPower={setSolarPower}
            windPower={windPower}
            setWindPower={setWindPower}
            batteryCharge={batteryCharge}
            setBatteryCharge={setBatteryCharge}
            batteryPower={batteryPower}
            setBatteryPower={setBatteryPower}
            dsmLevel={dsmLevel}
            setDsmLevel={setDsmLevel}
            residentialTariff={residentialTariff}
            setResidentialTariff={setResidentialTariff}
            commercialTariff={commercialTariff}
            setCommercialTariff={setCommercialTariff}
            industrialTariff={industrialTariff}
            setIndustrialTariff={setIndustrialTariff}
          />
        </div>

        {/* Main Center Panel - City Map */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 min-h-0 bg-muted/20 overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
            <CityMap simulationData={simulationData} />
          </div>
          
          {/* Bottom Panel - Timeline Controls */}
          <div className="h-20 bg-card border-t border-border">
            <TimelineControls 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
            />
          </div>
        </div>

        {/* Right Sidebar - Metrics Dashboard */}
        <div className="w-96 bg-sidebar border-l border-border overflow-y-auto">
          <MetricsDashboard simulationData={simulationData} />
        </div>
      </div>

      {/* Event Notifications */}
      <EventNotifications isPlaying={isPlaying} />
    </div>
  );
};

export default PowerGridSimulator;
