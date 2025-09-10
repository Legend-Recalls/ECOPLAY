import { Button } from '@/components/ui/button';
import { useScoreOptimizer } from '@/hooks/useScoreOptimizer';
import { useToast } from '@/hooks/use-toast';
import { Settings, Loader2 } from 'lucide-react';

interface AutoAdjustButtonProps {
  simulationData: {
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
    currentTime: { hour: number; minute: number };
  };
  setters: {
    setCoalPower: (val: number[]) => void;
    setGasPower: (val: number[]) => void;
    setHydroPower: (val: number[]) => void;
    setSolarPower: (val: number[]) => void;
    setWindPower: (val: number[]) => void;
    setBatteryPower: (val: number[]) => void;
    setBatteryCharge: (val: boolean) => void;
    setDsmLevel: (val: number[]) => void;
    setResidentialTariff: (val: string) => void;
    setCommercialTariff: (val: string) => void;
    setIndustrialTariff: (val: string) => void;
  };
}

export const AutoAdjustButton = ({ simulationData, setters }: AutoAdjustButtonProps) => {
  const { optimizeParameters, isOptimizing } = useScoreOptimizer();
  const { toast } = useToast();

  const handleAutoAdjust = async () => {
    try {
      const currentParams = {
        generation: {
          coal: simulationData.generation.coal,
          gas: simulationData.generation.gas,
          hydro: simulationData.generation.hydro,
          solar: simulationData.generation.solar,
          wind: simulationData.generation.wind,
          battery: Math.abs(simulationData.generation.battery),
          batteryCharge: simulationData.generation.battery < 0
        },
        demand: simulationData.demand,
        tariffs: simulationData.tariffs,
        dsm: simulationData.dsm
      };

      const bestScore = await optimizeParameters(
        currentParams,
        simulationData.currentTime,
        setters
      );

      toast({
        title: "Parameters Optimized",
        description: `Optimized parameters for maximum score: ${bestScore}`,
      });
    } catch (error) {
      toast({
        title: "Auto-Adjustment Failed",
        description: "Could not optimize parameters.",
      });
    }
  };

  return (
    <Button
      onClick={handleAutoAdjust}
      disabled={isOptimizing}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border-primary/30"
    >
      {isOptimizing ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Settings className="h-4 w-4" />
      )}
      {isOptimizing ? 'Optimizing...' : 'Auto-Adjust'}
    </Button>
  );
};
