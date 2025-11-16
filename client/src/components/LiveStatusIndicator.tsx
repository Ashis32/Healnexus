import { Badge } from "@/components/ui/badge";
import { Wifi } from "lucide-react";

interface LiveStatusIndicatorProps {
  isConnected: boolean;
  lastUpdate?: Date;
}

export function LiveStatusIndicator({ isConnected, lastUpdate }: LiveStatusIndicatorProps) {
  return (
    <div className="flex items-center gap-3" data-testid="status-indicator">
      <Badge 
        variant={isConnected ? "default" : "secondary"} 
        className="px-3 py-1.5 gap-2"
        data-testid={`badge-status-${isConnected ? 'connected' : 'disconnected'}`}
      >
        <span className="relative flex h-2 w-2">
          {isConnected && (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </>
          )}
          {!isConnected && <span className="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground"></span>}
        </span>
        <Wifi className="w-3.5 h-3.5" />
        <span className="font-semibold text-sm">
          {isConnected ? "Live" : "Offline"}
        </span>
      </Badge>
      
      {lastUpdate && (
        <span className="text-xs text-muted-foreground" data-testid="text-last-update">
          Updated {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
