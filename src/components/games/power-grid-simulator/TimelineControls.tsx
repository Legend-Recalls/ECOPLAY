import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, FastForward, SkipForward } from 'lucide-react';

interface TimelineControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: string;
  setCurrentTime: (time: string) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
}

export const TimelineControls = ({
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  playbackSpeed,
  setPlaybackSpeed
}: TimelineControlsProps) => {
  const handleSpeedChange = () => {
    const nextSpeed = playbackSpeed === 1 ? 2 : playbackSpeed === 2 ? 4 : 1;
    setPlaybackSpeed(nextSpeed);
  };

  return (
    <div className="h-full flex items-center justify-center px-6">
      <Card className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-card to-muted/20">
        {/* Play/Pause Button */}
        <Button
          variant={isPlaying ? "secondary" : "default"}
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Play
            </>
          )}
        </Button>

        {/* Speed Control */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSpeedChange}
          className="flex items-center gap-2"
        >
          <FastForward className="h-4 w-4" />
          {playbackSpeed}x
        </Button>

        {/* Current Time Display */}
        <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium">Simulation Time:</div>
          <div className="text-lg font-bold text-primary">{currentTime}</div>
          <div className="text-xs text-muted-foreground">hrs</div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
          <div className="text-xs text-muted-foreground">
            {isPlaying ? 'Running' : 'Paused'}
          </div>
        </div>

        {/* Step Forward */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const [hours, minutes] = currentTime.split(':').map(Number);
            const newMinutes = minutes + 15;
            const newHours = hours + Math.floor(newMinutes / 60);
            const finalMinutes = newMinutes % 60;
            const finalHours = newHours % 24;
            setCurrentTime(`${finalHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`);
          }}
          className="flex items-center gap-2"
        >
          <SkipForward className="h-4 w-4" />
          +15min
        </Button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs">
          <div className="text-xs text-muted-foreground mb-1">Day Progress</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1])) / (24 * 60)) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </Card>
    </div>
  );
};
