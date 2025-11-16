import { Card } from "@/components/ui/card";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { HealthDataPoint } from "@shared/schema";
import { Thermometer } from "lucide-react";

interface TemperatureChartProps {
  data: HealthDataPoint[];
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const chartData = data.map(point => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    temperature: point.temperature,
  }));

  const normalTemp = 37.0;

  return (
    <Card className="p-4 md:p-6 hover-elevate transition-all duration-300" data-testid="card-temperature-chart">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-chart-4/10">
          <Thermometer className="w-6 h-6 text-chart-4" data-testid="icon-temperature" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Body Temperature</h3>
          <p className="text-sm text-muted-foreground">Temperature trend monitoring</p>
        </div>
      </div>
      
      <div className="h-48 md:h-64">
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
              stroke="hsl(var(--chart-4))"
              style={{ fontSize: '12px' }}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              label={{ value: '°C', angle: -90, position: 'insideLeft', fill: 'hsl(var(--chart-4))' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))'
              }}
              formatter={(value: number) => [`${value.toFixed(2)}°C`, 'Temperature']}
            />
            <ReferenceLine 
              y={normalTemp} 
              stroke="hsl(var(--accent-foreground))" 
              strokeDasharray="5 5" 
              label={{ value: 'Normal', position: 'right', fill: 'hsl(var(--muted-foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2.5}
              dot={{ fill: 'hsl(var(--chart-4))', r: 3 }}
              name="Temperature (°C)"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
