import { Card } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Footprints } from "lucide-react";

interface StepsCounterProps {
  steps: number;
  goal?: number;
}

export function StepsCounter({ steps, goal = 10000 }: StepsCounterProps) {
  const percentage = Math.min((steps / goal) * 100, 100);

  return (
    <Card className="p-6 md:p-8 hover-elevate transition-all duration-300" data-testid="card-steps-counter">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Footprints className="w-6 h-6 text-primary" data-testid="icon-steps" />
          <h3 className="text-xl md:text-2xl font-semibold">Daily Steps</h3>
        </div>
        
        <div className="w-48 h-48 md:w-64 md:h-64">
          <CircularProgressbar
            value={percentage}
            text={`${steps.toLocaleString()}`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `hsl(var(--primary))`,
              textColor: `hsl(var(--foreground))`,
              trailColor: `hsl(var(--muted))`,
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground" data-testid="text-steps-goal">
            Goal: {goal.toLocaleString()} steps
          </p>
          <p className="text-lg font-semibold text-primary" data-testid="text-steps-percentage">
            {percentage.toFixed(1)}% Complete
          </p>
        </div>
      </div>
    </Card>
  );
}
