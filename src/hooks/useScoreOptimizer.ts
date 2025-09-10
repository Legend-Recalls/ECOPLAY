import { useState, useCallback } from 'react';
import { calculateScore } from '@/lib/score';

interface GenerationParams {
  coal: number;
  gas: number;
  hydro: number;
  solar: number;
  wind: number;
  battery: number;
  batteryCharge: boolean;
}

interface DemandParams {
  residential: number;
  commercial: number;
  industrial: number;
}

interface TariffParams {
  residential: number;
  commercial: number;
  industrial: number;
}

interface OptimizationParams {
  generation: GenerationParams;
  demand: DemandParams;
  tariffs: TariffParams;
  dsm: number;
}

export const useScoreOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const evaluateCandidate = useCallback((params: OptimizationParams, currentTime: { hour: number; minute: number }) => {
    const timeOfDay = currentTime.hour + currentTime.minute / 60;
    const solarMultiplier = (timeOfDay < 6 || timeOfDay > 18) ? 0 : Math.max(0, Math.sin((timeOfDay - 6) * Math.PI / 12));
    const windVariability = 0.6 + Math.sin((currentTime.hour * 60 + currentTime.minute) / 1440 * 2 * Math.PI) * 0.4;

    const generationForScoring = {
      coal: params.generation.coal,
      gas: params.generation.gas,
      hydro: params.generation.hydro,
      solar: Math.round(params.generation.solar * solarMultiplier),
      wind: Math.round(params.generation.wind * windVariability),
      battery: params.generation.batteryCharge ? -params.generation.battery : params.generation.battery,
    };

    const demand = {
      residential: Math.round(params.demand.residential * (1 - params.dsm / 100)),
      commercial: Math.round(params.demand.commercial * (1 - params.dsm / 100)),
      industrial: Math.round(params.demand.industrial * (1 - params.dsm / 100)),
    };

    const scoreData = calculateScore({
      ...params,
      generation: generationForScoring,
      demand,
      frequency: 50.0, // Use simplified frequency for optimization
    });

    return scoreData.totalScore;
  }, []);

  const optimizeParameters = useCallback(async (
    currentParams: OptimizationParams,
    currentTime: { hour: number; minute: number },
    setters: any
  ) => {
    setIsOptimizing(true);

    const ranges = {
      coal: { min: 0, max: 500, step: 10 },
      gas: { min: 0, max: 300, step: 10 },
      hydro: { min: 0, max: 200, step: 5 },
      battery: { min: 0, max: 100, step: 5 },
      dsm: { min: 0, max: 20, step: 1 },
      residentialTariff: { min: 3.0, max: 7.0, step: 0.1 },
      commercialTariff: { min: 4.0, max: 8.0, step: 0.1 },
      industrialTariff: { min: 4.0, max: 8.0, step: 0.1 },
    };

    let overallBestSolution = JSON.parse(JSON.stringify(currentParams));
    let overallBestScore = evaluateCandidate(overallBestSolution, currentTime);

    const numRestarts = 3;
    for (let restart = 0; restart < numRestarts; restart++) {
      let currentSolution = JSON.parse(JSON.stringify(currentParams));
      if (restart > 0) { // Randomize starting point for subsequent restarts
        Object.keys(ranges).forEach(param => {
          const range = ranges[param as keyof typeof ranges];
          if (['coal', 'gas', 'hydro', 'battery'].includes(param)) {
            currentSolution.generation[param as keyof typeof currentSolution.generation] = range.min + Math.random() * (range.max - range.min);
          } else if (param === 'dsm') {
            currentSolution.dsm = range.min + Math.random() * (range.max - range.min);
          } else {
            currentSolution.tariffs[param as keyof typeof currentSolution.tariffs] = range.min + Math.random() * (range.max - range.min);
          }
        });
      }

      let temperature = 500.0;
      const coolingRate = 0.995;
      const iterations = 1000;

      for (let i = 0; i < iterations; i++) {
        const randomParam = Object.keys(ranges)[Math.floor(Math.random() * Object.keys(ranges).length)];
        const direction = Math.random() > 0.5 ? 1 : -1;

        const newSolution = JSON.parse(JSON.stringify(currentSolution));

        if (Math.random() < 0.1) {
          newSolution.generation.batteryCharge = !newSolution.generation.batteryCharge;
        } else {
          const range = ranges[randomParam as keyof typeof ranges];
          if (['coal', 'gas', 'hydro', 'battery'].includes(randomParam)) {
            newSolution.generation[randomParam as keyof typeof newSolution.generation] += direction * range.step;
            newSolution.generation[randomParam as keyof typeof newSolution.generation] = Math.max(range.min, Math.min(range.max, newSolution.generation[randomParam as keyof typeof newSolution.generation]));
          } else if (randomParam === 'dsm') {
            newSolution.dsm += direction * range.step;
            newSolution.dsm = Math.max(range.min, Math.min(range.max, newSolution.dsm));
          } else {
            newSolution.tariffs[randomParam as keyof typeof newSolution.tariffs] += direction * range.step;
            newSolution.tariffs[randomParam as keyof typeof newSolution.tariffs] = Math.max(range.min, Math.min(range.max, newSolution.tariffs[randomParam as keyof typeof newSolution.tariffs]));
          }
        }

        const currentScore = evaluateCandidate(currentSolution, currentTime);
        const newScore = evaluateCandidate(newSolution, currentTime);

        const acceptanceProbability = Math.exp((newScore - currentScore) / temperature);

        if (acceptanceProbability > Math.random()) {
          currentSolution = newSolution;
        }

        if (newScore > overallBestScore) {
          overallBestScore = newScore;
          overallBestSolution = newSolution;
        }

        temperature *= coolingRate;
      }
    }

    // Apply the best found parameters
    setters.setCoalPower([overallBestSolution.generation.coal]);
    setters.setGasPower([overallBestSolution.generation.gas]);
    setters.setHydroPower([overallBestSolution.generation.hydro]);
    setters.setBatteryPower([overallBestSolution.generation.battery]);
    setters.setBatteryCharge(overallBestSolution.generation.batteryCharge);
    setters.setDsmLevel([overallBestSolution.dsm]);
    setters.setResidentialTariff(overallBestSolution.tariffs.residential.toString());
    setters.setCommercialTariff(overallBestSolution.tariffs.commercial.toString());
    setters.setIndustrialTariff(overallBestSolution.tariffs.industrial.toString());

    setIsOptimizing(false);
    return overallBestScore;
  }, [evaluateCandidate]);

  return { optimizeParameters, isOptimizing };
};