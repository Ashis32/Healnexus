import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveMetricCardProps {
  label: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  isLive?: boolean;
  decimals?: number;
  className?: string;
}

export function LiveMetricCard({
  label,
  value,
  unit,
  icon: Icon,
  isLive = false,
  decimals = 2,
  className,
}: LiveMetricCardProps) {
  const formattedValue = typeof value === 'number' 
    ? value.toFixed(decimals) 
    : value;

  return (
    <Card className={cn("p-4 md:p-6 hover-elevate transition-all duration-300", className)} data-testid={`card-metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" data-testid={`icon-${label.toLowerCase().replace(/\s+/g, '-')}`} />
          </div>
          {isLive && (
            <div className="flex items-center gap-1.5" data-testid="status-live">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-muted-foreground font-medium">Live</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide" data-testid={`label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono tabular-nums" data-testid={`value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {formattedValue}
          </span>
          <span className="text-lg md:text-xl text-muted-foreground font-medium" data-testid={`unit-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {unit}
          </span>
        </div>
      </div>
    </Card>
  );
}
