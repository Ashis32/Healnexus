import { Card } from "@/components/ui/card";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { HealthDataPoint } from "@shared/schema";
import { Activity, Heart } from "lucide-react";

interface HeartRateChartProps {
  data: HealthDataPoint[];
}

export function HeartRateChart({ data }: HeartRateChartProps) {
  const chartData = data.map(point => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    bpm: point.bpm,
    ecg: point.ecg,
  }));

  return (
    <Card className="p-4 md:p-6 col-span-full hover-elevate transition-all duration-300" data-testid="card-heart-rate-chart">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Heart className="w-6 h-6 text-primary" data-testid="icon-heart" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Heart Rate & ECG Monitor</h3>
          <p className="text-sm text-muted-foreground">Real-time cardiovascular metrics</p>
        </div>
      </div>
      
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--chart-1))"
              style={{ fontSize: '12px' }}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              label={{ value: 'BPM', angle: -90, position: 'insideLeft', fill: 'hsl(var(--chart-1))' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--chart-2))"
              style={{ fontSize: '12px' }}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              label={{ value: 'ECG', angle: 90, position: 'insideRight', fill: 'hsl(var(--chart-2))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="bpm" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2.5}
              dot={false}
              name="Heart Rate (BPM)"
              isAnimationActive={true}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="ecg" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2.5}
              dot={false}
              name="ECG Reading"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
