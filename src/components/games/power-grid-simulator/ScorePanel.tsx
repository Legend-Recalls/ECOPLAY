

import { Badge } from '@/components/ui/badge';
import { calculateScore } from '@/lib/score';

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

interface ScorePanelProps {
  simulationData: SimulationData;
}

export const ScorePanel = ({ simulationData }: ScorePanelProps) => {
  const frequency = simulationData.timeSeriesData.length > 0 
    ? simulationData.timeSeriesData[simulationData.timeSeriesData.length - 1].frequency 
    : 50.0;

  const {
    totalScore,
    totalRevenue,
    totalCost,
    profitMargin,
    renewablePercentage,
  } = calculateScore({ ...simulationData, frequency });

  const getGrade = (score: number) => {
    if (score >= 900) return { grade: 'A+', color: 'text-success', variant: 'default' as const };
    if (score >= 800) return { grade: 'A', color: 'text-success', variant: 'default' as const };
    if (score >= 700) return { grade: 'B', color: 'text-primary', variant: 'secondary' as const };
    if (score >= 600) return { grade: 'C', color: 'text-warning', variant: 'outline' as const };
    return { grade: 'D', color: 'text-destructive', variant: 'destructive' as const };
  };

  const performance = getGrade(totalScore);

  const supplyDemandBalance = Math.abs(Object.values(simulationData.generation).reduce((sum, val) => sum + Math.abs(val), 0) - Object.values(simulationData.demand).reduce((sum, val) => sum + val, 0)) / Math.max(Object.values(simulationData.demand).reduce((sum, val) => sum + val, 0), 1);
  const frequencyStability = Math.abs(frequency - 50.0);

  const getSystemStatus = () => {
    if (supplyDemandBalance < 0.05 && frequencyStability < 0.2) {
      return { status: 'Optimal', color: 'text-success', bg: 'bg-success/20 border-success/30' };
    }
    if (supplyDemandBalance < 0.1 && frequencyStability < 0.5) {
      return { status: 'Stable', color: 'text-success', bg: 'bg-success/20 border-success/30' };
    }
    if (supplyDemandBalance < 0.2) {
      return { status: 'Warning', color: 'text-warning', bg: 'bg-warning/20 border-warning/30' };
    }
    return { status: 'Critical', color: 'text-destructive', bg: 'bg-destructive/20 border-destructive/30' };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2">
      {/* Overall Score */}
      <div className="flex items-center gap-2">
        <div className="text-center">
          <div className={`text-lg font-bold ${performance.color}`}>{totalScore}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
        <Badge variant={performance.variant} className="text-xs">
          {performance.grade}
        </Badge>
      </div>

      <div className="w-px h-8 bg-border/50"></div>

      {/* Financial Metrics */}
      <div className="flex items-center gap-3 text-xs">
        <div className="text-center">
          <div className="text-success font-semibold">₹{Math.round(totalRevenue).toLocaleString()}</div>
          <div className="text-muted-foreground">Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-warning font-semibold">₹{Math.round(totalCost).toLocaleString()}</div>
          <div className="text-muted-foreground">Cost</div>
        </div>
        <div className="text-center">
          <div className={`${profitMargin >= 0 ? 'text-success' : 'text-destructive'} font-semibold`}>
            ₹{Math.round(profitMargin).toLocaleString()}
          </div>
          <div className="text-muted-foreground">Profit</div>
        </div>
      </div>

      <div className="w-px h-8 bg-border/50"></div>

      {/* Key Metrics */}
      <div className="flex items-center gap-3 text-xs">
        <div className="text-center">
          <div className="text-success font-semibold">{renewablePercentage.toFixed(1)}%</div>
          <div className="text-muted-foreground">Renewable</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground font-semibold">{frequency.toFixed(1)}Hz</div>
          <div className="text-muted-foreground">Frequency</div>
        </div>
      </div>

      <div className="w-px h-8 bg-border/50"></div>

      {/* Status Badge */}
      <Badge className={`${systemStatus.bg} ${systemStatus.color} border text-xs`}>
        {systemStatus.status}
      </Badge>
    </div>
  );
};
