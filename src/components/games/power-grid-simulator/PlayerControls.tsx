import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface PlayerControlsProps {
  coalPower: number[];
  setCoalPower: (value: number[]) => void;
  gasPower: number[];
  setGasPower: (value: number[]) => void;
  hydroPower: number[];
  setHydroPower: (value: number[]) => void;
  solarPower: number[];
  setSolarPower: (value: number[]) => void;
  windPower: number[];
  setWindPower: (value: number[]) => void;
  batteryCharge: boolean;
  setBatteryCharge: (value: boolean) => void;
  batteryPower: number[];
  setBatteryPower: (value: number[]) => void;
  dsmLevel: number[];
  setDsmLevel: (value: number[]) => void;
  residentialTariff: string;
  setResidentialTariff: (value: string) => void;
  commercialTariff: string;
  setCommercialTariff: (value: string) => void;
  industrialTariff: string;
  setIndustrialTariff: (value: string) => void;
}

export const PlayerControls = ({
  coalPower, setCoalPower,
  gasPower, setGasPower,
  hydroPower, setHydroPower,
  solarPower, setSolarPower,
  windPower, setWindPower,
  batteryCharge, setBatteryCharge,
  batteryPower, setBatteryPower,
  dsmLevel, setDsmLevel,
  residentialTariff, setResidentialTariff,
  commercialTariff, setCommercialTariff,
  industrialTariff, setIndustrialTariff
}: PlayerControlsProps) => {
  const [generationExpanded, setGenerationExpanded] = useState(true);
  const [batteryExpanded, setBatteryExpanded] = useState(true);
  const [dsmExpanded, setDsmExpanded] = useState(true);
  const [tariffsExpanded, setTariffsExpanded] = useState(true);

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold text-center mb-6">Grid Controls</div>

      {/* Generation Controls */}
      <Collapsible open={generationExpanded} onOpenChange={setGenerationExpanded}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Card className="w-full p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">Power Generation</span>
              {generationExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          {/* Coal */}
          <Card className="p-4 border-l-4 border-l-coal">
            <Label className="text-sm font-medium mb-2 block">Coal Generation</Label>
            <Slider
              value={coalPower}
              onValueChange={setCoalPower}
              max={500}
              step={10}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">{coalPower[0]} MW / 500 MW</div>
          </Card>

          {/* Gas */}
          <Card className="p-4 border-l-4 border-l-gas">
            <Label className="text-sm font-medium mb-2 block">Gas Generation</Label>
            <Slider
              value={gasPower}
              onValueChange={setGasPower}
              max={300}
              step={10}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">{gasPower[0]} MW / 300 MW</div>
          </Card>

          {/* Hydro */}
          <Card className="p-4 border-l-4 border-l-hydro">
            <Label className="text-sm font-medium mb-2 block">Hydro Generation</Label>
            <Slider
              value={hydroPower}
              onValueChange={setHydroPower}
              max={200}
              step={5}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">{hydroPower[0]} MW / 200 MW</div>
          </Card>

          {/* Solar */}
          <Card className="p-4 border-l-4 border-l-solar">
            <Label className="text-sm font-medium mb-2 block">Solar Generation</Label>
            <Slider
              value={solarPower}
              onValueChange={setSolarPower}
              max={200}
              step={5}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">{solarPower[0]} MW / 200 MW</div>
          </Card>

          {/* Wind */}
          <Card className="p-4 border-l-4 border-l-wind">
            <Label className="text-sm font-medium mb-2 block">Wind Generation</Label>
            <Slider
              value={windPower}
              onValueChange={setWindPower}
              max={150}
              step={5}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">{windPower[0]} MW / 150 MW</div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Battery Storage */}
      <Collapsible open={batteryExpanded} onOpenChange={setBatteryExpanded}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Card className="w-full p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">Battery Storage</span>
              {batteryExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <Card className="p-4 border-l-4 border-l-battery">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Mode</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs">Discharge</span>
                <Switch checked={batteryCharge} onCheckedChange={setBatteryCharge} />
                <span className="text-xs">Charge</span>
              </div>
            </div>
            <Label className="text-sm font-medium mb-2 block">Power Level</Label>
            <Slider
              value={batteryPower}
              onValueChange={setBatteryPower}
              max={100}
              step={5}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">
              {batteryCharge ? 'Charging' : 'Discharging'} at {batteryPower[0]} MW
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Demand Side Management */}
      <Collapsible open={dsmExpanded} onOpenChange={setDsmExpanded}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Card className="w-full p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">Demand Management</span>
              {dsmExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <Card className="p-4">
            <Label className="text-sm font-medium mb-2 block">DSM Level</Label>
            <Slider
              value={dsmLevel}
              onValueChange={setDsmLevel}
              max={20}
              step={1}
              className="mb-2"
            />
            <div className="text-xs text-muted-foreground">{dsmLevel[0]}% demand reduction</div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Dynamic Pricing */}
      <Collapsible open={tariffsExpanded} onOpenChange={setTariffsExpanded}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <Card className="w-full p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">Dynamic Tariffs</span>
              {tariffsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <Card className="p-4 space-y-4">
            <div>
              <Label className="text-sm font-medium mb-1 block text-residential">Residential (₹/kWh)</Label>
              <Input
                type="number"
                value={residentialTariff}
                onChange={(e) => setResidentialTariff(e.target.value || '0')}
                step="0.1"
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1 block text-commercial">Commercial (₹/kWh)</Label>
              <Input
                type="number"
                value={commercialTariff}
                onChange={(e) => setCommercialTariff(e.target.value || '0')}
                step="0.1"
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1 block text-industrial">Industrial (₹/kWh)</Label>
              <Input
                type="number"
                value={industrialTariff}
                onChange={(e) => setIndustrialTariff(e.target.value || '0')}
                step="0.1"
                className="text-sm"
              />
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};