import { Card } from "@/components/ui/card";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { HealthDataPoint } from "@shared/schema";
import { Move, RotateCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MotionChartProps {
  data: HealthDataPoint[];
}

export function MotionChart({ data }: MotionChartProps) {
  const chartData = data.map(point => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }),
    accX: point.accX,
    accY: point.accY,
    accZ: point.accZ,
    gyroX: point.gyroX,
    gyroY: point.gyroY,
    gyroZ: point.gyroZ,
  }));

  return (
    <Card className="p-4 md:p-6 hover-elevate transition-all duration-300" data-testid="card-motion-chart">
      <Tabs defaultValue="accelerometer" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-3/10">
              <Move className="w-6 h-6 text-chart-3" data-testid="icon-motion" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">Motion Analysis</h3>
              <p className="text-sm text-muted-foreground">3-axis movement tracking</p>
            </div>
          </div>
          
          <TabsList data-testid="tabs-motion">
            <TabsTrigger value="accelerometer" data-testid="tab-accelerometer">
              <Move className="w-4 h-4 mr-2" />
              Accelerometer
            </TabsTrigger>
            <TabsTrigger value="gyroscope" data-testid="tab-gyroscope">
              <RotateCw className="w-4 h-4 mr-2" />
              Gyroscope
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="accelerometer" className="mt-0">
          <div className="h-64">
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
                  stroke="hsl(var(--chart-3))"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ value: 'g', angle: -90, position: 'insideLeft', fill: 'hsl(var(--chart-3))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="accX" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} name="X-axis" />
                <Line type="monotone" dataKey="accY" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Y-axis" />
                <Line type="monotone" dataKey="accZ" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} name="Z-axis" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="gyroscope" className="mt-0">
          <div className="h-64">
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
                  stroke="hsl(var(--chart-3))"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ value: '°/s', angle: -90, position: 'insideLeft', fill: 'hsl(var(--chart-3))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="gyroX" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} name="X-axis" />
                <Line type="monotone" dataKey="gyroY" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="Y-axis" />
                <Line type="monotone" dataKey="gyroZ" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} name="Z-axis" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
