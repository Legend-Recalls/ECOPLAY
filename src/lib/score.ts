
interface SimulationDataForScoring {
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
  frequency: number;
}

export const costPerMWh = { 
  coal: 1200,    // ₹1200/MWh (₹1.2/kWh) - Cheaper
  gas: 1800,     // ₹1800/MWh (₹1.8/kWh) - Cheaper
  hydro: 2800,   // ₹2800/MWh (₹2.8/kWh)
  solar: 3200,   // ₹3200/MWh (₹3.2/kWh)
  wind: 3000,    // ₹3000/MWh (₹3.0/kWh)
  battery: 4500  // ₹4500/MWh (₹4.5/kWh)
};

export const calculateScore = (data: SimulationDataForScoring) => {
  // Calculate real-time metrics
  const { battery, ...otherGeneration } = data.generation;
  const totalSupply = Object.values(otherGeneration).reduce((sum, val) => sum + Math.abs(val), 0) + battery;
  const totalDemand = Object.values(data.demand).reduce((sum, val) => sum + val, 0);
  const frequency = data.frequency;

  // Cost calculations (₹/MWh) - Realistic Indian power market values
  const totalCost = Object.entries(data.generation).reduce((sum, [source, generation]) => 
    sum + (Math.abs(generation) * costPerMWh[source as keyof typeof costPerMWh]), 0) * 0.25; // 15-minute interval cost
  
  // Revenue calculations - tariffs are in ₹/kWh, generation in MW
  const avgTariff = (data.tariffs.residential + data.tariffs.commercial + data.tariffs.industrial) / 3;
  // Revenue = MW × 1000 kW/MW × ₹/kWh × time_fraction (15min = 0.25h)
  const totalRevenue = totalSupply * avgTariff * 1000 * 0.25; // 15-minute interval revenue

  // Carbon emissions (kg CO₂/MWh)
  const emissionFactors = { coal: 0.85, gas: 0.45, hydro: 0.02, solar: 0.05, wind: 0.01, battery: 0.0 };
  const totalEmissions = Object.entries(data.generation).reduce((sum, [source, generation]) => 
    sum + (Math.abs(generation) * emissionFactors[source as keyof typeof emissionFactors]), 0);

  // Renewable percentage
  const renewableGeneration = data.generation.hydro + data.generation.solar + data.generation.wind;
  const renewablePercentage = totalSupply > 0 ? (renewableGeneration / totalSupply) * 100 : 0;

  // Score Components (out of 1000 total) - FIXED REALISTIC SCORING
  
  // 1. Grid Stability (0-350 points) - MOST CRITICAL
  const supplyDemandBalance = Math.abs(totalSupply - totalDemand) / Math.max(totalDemand, 1);
  const frequencyStability = Math.abs(frequency - 50.0);
  
  let stabilityScore = 350;
  if (supplyDemandBalance > 0.03) { // Widen tolerance to 3%
    stabilityScore = Math.max(0, 350 - (supplyDemandBalance * 1500)); // Reduced penalty
  }
  stabilityScore = Math.max(0, stabilityScore - (frequencyStability * 100)); // Reduced frequency penalty

  // 2. Economic Efficiency (0-250 points)
  const profitMargin = totalRevenue - totalCost;
  const costEfficiency = totalSupply > 0 ? totalCost / totalSupply : 5000;
  const economicScore = Math.max(0, Math.min(250, 
    (profitMargin > 0 ? 120 : 0) +      // Increased base for profit
    Math.max(0, profitMargin / 150) +   // Increased profit bonus
    Math.max(0, (100 - costEfficiency) * 2.5) // Easier cost efficiency bonus
  ));

  // 3. Environmental Impact (0-250 points)
  const carbonPenalty = totalEmissions * 1.8; // Slightly reduced penalty
  const renewableBonus = Math.min(120, renewablePercentage * 1.2); // Slightly increased bonus cap
  const environmentalScore = Math.max(0, Math.min(250, 75 + renewableBonus - carbonPenalty));

  // 4. Demand Management (0-150 points)
  const dsmBonus = Math.min(75, data.dsm * 7.5); // Increased DSM bonus
  const tariffOptimization = Math.max(0, Math.min(40, (avgTariff - 4.0) * 20)); // Increased tariff bonus
  const demandScore = Math.max(0, Math.min(150, 35 + dsmBonus + tariffOptimization));

  // Total Score (max 1000, but realistic max around 800-850)
  const totalScore = Math.round(stabilityScore + economicScore + environmentalScore + demandScore);
  
  return {
    totalScore,
    totalSupply,
    totalDemand,
    frequency,
    totalCost,
    totalRevenue,
    profitMargin,
    renewablePercentage,
    totalEmissions
  };
};
