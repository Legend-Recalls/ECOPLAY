import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { costPerMWh } from '@/lib/score';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

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

interface MetricsDashboardProps {
  simulationData: SimulationData;
}

export const MetricsDashboard = ({ simulationData }: MetricsDashboardProps) => {
  // Live metrics dashboard with real-time data
  const supplyDemandData = simulationData.timeSeriesData.length > 0 
    ? simulationData.timeSeriesData.slice(-12).map(point => ({
        time: point.time,
        supply: point.supply,
        demand: point.demand
      }))
    : [
        { time: '08:00', supply: Object.values(simulationData.generation).reduce((sum, val) => sum + Math.abs(val), 0), 
          demand: Object.values(simulationData.demand).reduce((sum, val) => sum + val, 0) }
      ];

  // Real-time generation mix
  const totalGeneration = Object.values(simulationData.generation).reduce((sum, val) => sum + Math.abs(val), 0);
  const generationMixData = totalGeneration > 0 ? [
    { name: 'Coal', value: Math.round((simulationData.generation.coal / totalGeneration) * 100), fill: 'hsl(15 25% 35%)' },
    { name: 'Gas', value: Math.round((simulationData.generation.gas / totalGeneration) * 100), fill: 'hsl(25 70% 50%)' },
    { name: 'Hydro', value: Math.round((Math.abs(simulationData.generation.hydro) / totalGeneration) * 100), fill: 'hsl(200 100% 50%)' },
    { name: 'Solar', value: Math.round((simulationData.generation.solar / totalGeneration) * 100), fill: 'hsl(50 100% 60%)' },
    { name: 'Wind', value: Math.round((simulationData.generation.wind / totalGeneration) * 100), fill: 'hsl(120 60% 50%)' }
  ].filter(item => item.value > 0) : [
    { name: 'Coal', value: 40, fill: 'hsl(15 25% 35%)' },
    { name: 'Gas', value: 20, fill: 'hsl(25 70% 50%)' },
    { name: 'Hydro', value: 15, fill: 'hsl(200 100% 50%)' },
    { name: 'Solar', value: 15, fill: 'hsl(50 100% 60%)' },
    { name: 'Wind', value: 10, fill: 'hsl(120 60% 50%)' }
  ];

  // Chart configurations
  const generationMixConfig = {
    coal: { label: 'Coal', color: 'hsl(15 25% 35%)' },
    gas: { label: 'Gas', color: 'hsl(25 70% 50%)' },
    hydro: { label: 'Hydro', color: 'hsl(200 100% 50%)' },
    solar: { label: 'Solar', color: 'hsl(50 100% 60%)' },
    wind: { label: 'Wind', color: 'hsl(120 60% 50%)' }
  };

  const costChartConfig = {
    cost: { label: 'Cost (₹)', color: 'hsl(195 100% 50%)' }
  };

  const emissionsChartConfig = {
    emissions: { label: 'CO₂ (kg)', color: 'hsl(0 70% 60%)' }
  };

  const tariffChartConfig = {
    demandShift: { label: 'Demand Shift (MW)', color: 'hsl(195 100% 50%)' }
  };

  

  const emissionFactors = {
    coal: 0.85,
    gas: 0.45,
    hydro: 0.02,
    solar: 0.05,
    wind: 0.01,
    battery: 0.0
  };

  // Calculate live costs based on current generation
  const liveCostData = Object.entries(simulationData.generation).map(([source, generation]) => ({
    source: source.charAt(0).toUpperCase() + source.slice(1),
    cost: Math.round(Math.abs(generation) * costPerMWh[source as keyof typeof costPerMWh]),
    generation: Math.abs(generation)
  })).filter(item => item.generation > 0);

  console.log('Raw generation data:', simulationData.generation);
  console.log('Processed liveCostData:', liveCostData);
  console.log('Cost per MWh:', costPerMWh);

  // Calculate live emissions based on current generation
  const liveEmissionsData = Object.entries(simulationData.generation).map(([source, generation]) => ({
    source: source.charAt(0).toUpperCase() + source.slice(1),
    emissions: Math.round(Math.abs(generation) * emissionFactors[source as keyof typeof emissionFactors] * 100) / 100,
    generation: Math.abs(generation)
  })).filter(item => item.generation > 0);

  // Total live calculations
  const totalGenerationCost = liveCostData.reduce((sum, item) => sum + item.cost, 0);
  const totalEmissions = liveEmissionsData.reduce((sum, item) => sum + item.emissions, 0);

  // DSM Impact Data - showing demand reduction over time
  const dsmImpactData = [
    { hour: '00:00', baseline: 320, withDSM: 320 * (1 - simulationData.dsm/100) },
    { hour: '06:00', baseline: 280, withDSM: 280 * (1 - simulationData.dsm/100) },
    { hour: '12:00', baseline: 380, withDSM: 380 * (1 - simulationData.dsm/100) },
    { hour: '18:00', baseline: 420, withDSM: 420 * (1 - simulationData.dsm/100) },
    { hour: '24:00', baseline: 350, withDSM: 350 * (1 - simulationData.dsm/100) }
  ];

  // Enhanced tariff impact with live demand response
  const baseTariffs = { residential: 4.0, commercial: 6.0, industrial: 5.5 };
  const tariffImpactData = [
    { 
      sector: 'Residential', 
      baseTariff: baseTariffs.residential, 
      currentTariff: simulationData.tariffs.residential, 
      demandShift: (simulationData.tariffs.residential - baseTariffs.residential) * -8, // Higher tariff = lower demand
      currentDemand: simulationData.demand.residential
    },
    { 
      sector: 'Commercial', 
      baseTariff: baseTariffs.commercial, 
      currentTariff: simulationData.tariffs.commercial, 
      demandShift: (simulationData.tariffs.commercial - baseTariffs.commercial) * -5,
      currentDemand: simulationData.demand.commercial
    },
    { 
      sector: 'Industrial', 
      baseTariff: baseTariffs.industrial, 
      currentTariff: simulationData.tariffs.industrial, 
      demandShift: (simulationData.tariffs.industrial - baseTariffs.industrial) * -12,
      currentDemand: simulationData.demand.industrial
    }
  ];

  const totalDemandShift = tariffImpactData.reduce((sum, item) => sum + item.demandShift, 0);

  // Debug logging
  console.log('Live Cost Data:', liveCostData);
  console.log('Live Emissions Data:', liveEmissionsData);
  console.log('Tariff Impact Data:', tariffImpactData);
  console.log('Generation Data:', simulationData.generation);
  console.log('Chart data length - Cost:', liveCostData.length, 'Tariff:', tariffImpactData.length);

  // Ensure we have data for charts or use fallbacks
  const costDataForChart = liveCostData.length > 0 ? liveCostData : [
    { source: 'Coal', cost: 0, generation: 0 },
    { source: 'Gas', cost: 0, generation: 0 },
    { source: 'Solar', cost: 0, generation: 0 },
    { source: 'Wind', cost: 0, generation: 0 },
    { source: 'Hydro', cost: 0, generation: 0 }
  ];

  const emissionsDataForChart = liveEmissionsData.length > 0 ? liveEmissionsData : [
    { source: 'Coal', emissions: 0, generation: 0 },
    { source: 'Gas', emissions: 0, generation: 0 },
    { source: 'Solar', emissions: 0, generation: 0 },
    { source: 'Wind', emissions: 0, generation: 0 },
    { source: 'Hydro', emissions: 0, generation: 0 }
  ];

  // Real-time computed values  
  const totalDemand = Object.values(simulationData.demand).reduce((sum, val) => sum + val, 0);
  const totalSupply = Object.values(simulationData.generation).reduce((sum, val) => sum + Math.abs(val), 0);
  const status = totalSupply >= totalDemand ? 'Stable' : 'Overloaded';
  const currentFrequency = simulationData.timeSeriesData.length > 0 
    ? simulationData.timeSeriesData[simulationData.timeSeriesData.length - 1].frequency 
    : 50.0;

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold text-center mb-6">System Metrics</div>

      {/* Grid Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Grid Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Total Demand:</span>
              <span className="font-semibold">{totalDemand} MW</span>
            </div>
            <div className="flex justify-between">
              <span>Total Supply:</span>
              <span className="font-semibold text-success">{totalSupply} MW</span>
            </div>
            <div className="flex justify-between">
              <span>Frequency:</span>
              <span className={`font-semibold ${Math.abs(currentFrequency - 50.0) < 0.2 ? 'text-success' : 'text-warning'}`}>{currentFrequency.toFixed(1)} Hz</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`px-2 py-1 rounded text-xs ${status === 'Stable' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>{status}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supply vs Demand Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Supply vs Demand (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={supplyDemandData}>
              <CartesianGrid strokeDasharray="3,3" className="opacity-30" />
              <XAxis dataKey="time" fontSize={10} />
              <YAxis fontSize={10} />
              <Line type="monotone" dataKey="supply" stroke="hsl(var(--success))" strokeWidth={2} dot={false} connectNulls={false} />
              <Line type="monotone" dataKey="demand" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-success rounded"></div>
              <span>Supply</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-primary rounded"></div>
              <span>Demand</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Mix Pie Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Generation Mix</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={generationMixConfig} className="h-[150px]">
            <PieChart>
              <Pie
                data={generationMixData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {generationMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
            {generationMixData.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded" style={{ backgroundColor: item.fill }}></div>
                <span>{item.name} {item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequency Gauge */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Grid Frequency</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-2">
            <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
            <div className="absolute inset-0 rounded-full border-8 border-success border-t-transparent transform rotate-45"></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-success">50.0</div>
                <div className="text-xs">Hz</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-success">Normal Range</div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Generation Costs (₹/MWh)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={liveCostData}>
              <CartesianGrid strokeDasharray="3,3" className="opacity-30" />
              <XAxis dataKey="source" fontSize={10} />
              <YAxis fontSize={10} />
              <Bar dataKey="generation" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-center">
            <div className="text-sm font-semibold">Total: ₹{totalGenerationCost.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Data points: {liveCostData.length}</div>
          </div>
        </CardContent>
      </Card>

       {/* Financial Summary */}
       <Card>
         <CardHeader className="pb-3">
           <CardTitle className="text-sm">Live Financial Summary</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-3 text-sm">
             <div className="flex justify-between">
               <span>Generation Cost:</span>
               <span className="font-semibold text-warning">₹{totalGenerationCost.toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Revenue (Est.):</span>
               <span className="font-semibold text-success">₹{Math.round(totalSupply * 45).toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
               <span>Carbon Tax:</span>
               <span className="font-semibold text-destructive">₹{Math.round(totalEmissions * 25).toLocaleString()}</span>
             </div>
             <div className="border-t pt-2 flex justify-between">
               <span className="font-semibold">Net Margin:</span>
               <span className={`font-bold ${(totalSupply * 45) - totalGenerationCost - (totalEmissions * 25) > 0 ? 'text-success' : 'text-destructive'}`}>
                 ₹{Math.round((totalSupply * 45) - totalGenerationCost - (totalEmissions * 25)).toLocaleString()}
               </span>
             </div>
           </div>
         </CardContent>
       </Card>

       {/* Carbon Emissions */}
       <Card>
         <CardHeader className="pb-3">
           <CardTitle className="text-sm">Live CO₂ Emissions</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="mb-3 p-2 bg-muted/50 rounded text-center">
             <div className="text-lg font-bold text-destructive">{totalEmissions.toFixed(1)} kg</div>
             <div className="text-xs text-muted-foreground">Total CO₂ per hour</div>
           </div>
            <ChartContainer config={emissionsChartConfig} className="h-[120px]">
              <BarChart data={emissionsDataForChart}>
                <CartesianGrid strokeDasharray="3,3" className="opacity-30" />
                <XAxis dataKey="source" fontSize={10} />
                <YAxis fontSize={10} />
                <Bar dataKey="emissions" fill="hsl(0 70% 60%)" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
         </CardContent>
       </Card>

      {/* DSM Impact */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">DSM Impact ({simulationData.dsm}% reduction)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={dsmImpactData}>
              <CartesianGrid strokeDasharray="3,3" className="opacity-30" />
              <XAxis dataKey="hour" fontSize={10} />
              <YAxis fontSize={10} />
              <Area type="monotone" dataKey="baseline" stackId="1" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted))" fillOpacity={0.6} />
              <Area type="monotone" dataKey="withDSM" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-muted-foreground rounded"></div>
              <span>Baseline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 bg-success rounded"></div>
              <span>With DSM</span>
            </div>
          </div>
        </CardContent>
      </Card>

       {/* Live Tariff Impact */}
       <Card className="animate-fade-in">
         <CardHeader className="pb-3">
           <CardTitle className="text-sm">Live Tariff Impact</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="mb-3 p-2 bg-muted/50 rounded animate-scale-in">
             <div className="flex justify-between text-sm">
               <span>Total Demand Shift:</span>
               <span className={`font-semibold transition-colors duration-300 ${totalDemandShift < 0 ? 'text-success' : 'text-warning'}`}>
                 {totalDemandShift > 0 ? '+' : ''}{totalDemandShift.toFixed(1)} MW
               </span>
             </div>
           </div>
           <div className="space-y-2 text-xs mb-3">
             {tariffImpactData.map((item, index) => (
               <div key={index} className="flex justify-between items-center animate-fade-in hover-scale p-2 rounded hover:bg-muted/20 transition-colors duration-200" style={{animationDelay: `${index * 100}ms`}}>
                 <span>{item.sector}:</span>
                 <div className="flex gap-2 items-center">
                   <span className="text-muted-foreground">₹{item.currentTariff.toFixed(2)}/kWh</span>
                   <span className="text-primary font-semibold">{item.currentDemand} MW</span>
                 </div>
               </div>
             ))}
           </div>
            <div className="animate-fade-in" style={{animationDelay: '300ms'}}>
               <ResponsiveContainer width="100%" height={120}>
                 <BarChart data={tariffImpactData}>
                   <CartesianGrid strokeDasharray="3,3" className="opacity-30" />
                   <XAxis dataKey="sector" fontSize={10} />
                   <YAxis fontSize={10} />
                   <Bar dataKey="demandShift" fill="hsl(195 100% 50%)" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
              <div className="text-xs text-muted-foreground mt-1 text-center">
                Tariff data points: {tariffImpactData.length}
              </div>
            </div>
           <div className="text-xs text-muted-foreground mt-2">
             Demand response to pricing changes (MW)
           </div>
         </CardContent>
       </Card>
    </div>
  );
};