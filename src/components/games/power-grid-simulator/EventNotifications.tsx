import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, Zap, Battery, Cloud } from 'lucide-react';

interface Event {
  id: string;
  type: 'warning' | 'info' | 'alert';
  icon: React.ReactNode;
  title: string;
  message: string;
  timestamp: string;
}

export const EventNotifications = ({ isPlaying }: { isPlaying: boolean }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    const eventTemplates = [
      {
        type: 'warning' as const,
        icon: <Cloud className="h-4 w-4" />,
        title: 'Weather Alert',
        message: 'Cloudy conditions detected - Solar output reduced by 40%'
      },
      {
        type: 'alert' as const,
        icon: <AlertTriangle className="h-4 w-4" />,
        title: 'Maintenance Required',
        message: 'Gas Plant Unit 2 scheduled for maintenance - 1 unit offline'
      },
      {
        type: 'info' as const,
        icon: <Battery className="h-4 w-4" />,
        title: 'Battery Status',
        message: 'Battery storage system fully charged (100%)'
      },
      {
        type: 'warning' as const,
        icon: <Zap className="h-4 w-4" />,
        title: 'Peak Demand',
        message: 'High demand period detected - Consider activating reserves'
      }
    ];

    const addRandomEvent = () => {
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const newEvent: Event = {
        id: Date.now().toString(),
        ...template,
        timestamp: new Date().toLocaleTimeString()
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 2));
    };

    // Slow down events and only while playing
    const interval = setInterval(addRandomEvent, 40000);
    const timeout = setTimeout(addRandomEvent, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  if (events.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2 max-w-sm">
      {events.map((event) => (
        <Card 
          key={event.id} 
          className={`p-4 border-l-4 animate-fade-in shadow-md ${
            event.type === 'warning' ? 'border-l-warning bg-card' :
            event.type === 'alert' ? 'border-l-destructive bg-card' :
            'border-l-primary bg-card'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`p-1 rounded-full ${
                event.type === 'warning' ? 'text-warning' :
                event.type === 'alert' ? 'text-destructive' :
                'text-primary'
              }`}>
                {event.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{event.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{event.message}</div>
                <div className="text-xs text-muted-foreground mt-2">{event.timestamp}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEvent(event.id)}
              className="h-6 w-6 p-0 hover:bg-muted/50"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
