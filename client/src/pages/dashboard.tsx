import { useQuery } from "@tanstack/react-query";
import { HealthData, HealthDataPoint } from "@shared/schema";
import { LiveMetricCard } from "@/components/LiveMetricCard";
import { LiveStatusIndicator } from "@/components/LiveStatusIndicator";
import { StepsCounter } from "@/components/StepsCounter";
import { HeartRateChart } from "@/components/HeartRateChart";
import { TemperatureChart } from "@/components/TemperatureChart";
import { MotionChart } from "@/components/MotionChart";
import { ExportPanel } from "@/components/ExportPanel";
import { LoadingState } from "@/components/LoadingState";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Move, 
  RotateCw,
  Zap,
  TrendingUp,
  TrendingDown,
  Footprints
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Dashboard() {
  // Fetch current health data
  const { data: currentData, isLoading, error, isError } = useQuery<HealthData>({
    queryKey: ['/api/health/current'],
    refetchInterval: 2000, // Refresh every 2 seconds for real-time feel
  });

  // Fetch historical data for charts
  const { data: historicalData } = useQuery<HealthDataPoint[]>({
    queryKey: ['/api/health/history'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to connect to Firebase. Please check your connection and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const chartData = historicalData || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="w-8 h-8 text-primary" data-testid="icon-logo" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-app-title">
                  HealNexus
                </h1>
                <p className="text-sm text-muted-foreground">Health Monitoring Dashboard</p>
              </div>
            </div>
            
            <LiveStatusIndicator 
              isConnected={!!currentData} 
              lastUpdate={currentData ? new Date() : undefined}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Live Metrics Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 md:mb-6">Live Vital Signs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <LiveMetricCard
              label="Heart Rate"
              value={currentData?.bpm || 0}
              unit="BPM"
              icon={Heart}
              isLive={true}
              decimals={0}
            />
            <LiveMetricCard
              label="ECG"
              value={currentData?.ecg || 0}
              unit="mV"
              icon={Activity}
              isLive={true}
            />
            <LiveMetricCard
              label="Temperature"
              value={currentData?.temperature || 0}
              unit="°C"
              icon={Thermometer}
              isLive={true}
            />
            <LiveMetricCard
              label="Steps"
              value={currentData?.steps || 0}
              unit=""
              icon={Footprints}
              decimals={0}
            />
            <LiveMetricCard
              label="Acc X"
              value={currentData?.accX || 0}
              unit="g"
              icon={Move}
            />
            <LiveMetricCard
              label="Acc Y"
              value={currentData?.accY || 0}
              unit="g"
              icon={Move}
            />
            <LiveMetricCard
              label="Acc Z"
              value={currentData?.accZ || 0}
              unit="g"
              icon={Move}
            />
            <LiveMetricCard
              label="Gyro X"
              value={currentData?.gyroX || 0}
              unit="°/s"
              icon={RotateCw}
            />
            <LiveMetricCard
              label="Gyro Y"
              value={currentData?.gyroY || 0}
              unit="°/s"
              icon={RotateCw}
            />
            <LiveMetricCard
              label="Gyro Z"
              value={currentData?.gyroZ || 0}
              unit="°/s"
              icon={RotateCw}
            />
            <LiveMetricCard
              label="Lead +"
              value={currentData?.lead_plus || 0}
              unit="mV"
              icon={TrendingUp}
            />
            <LiveMetricCard
              label="Lead -"
              value={currentData?.lead_minus || 0}
              unit="mV"
              icon={TrendingDown}
            />
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 md:mb-6">Real-Time Analytics</h2>
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {chartData.length > 0 && <HeartRateChart data={chartData} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chartData.length > 0 && <TemperatureChart data={chartData} />}
              <StepsCounter steps={currentData?.steps || 0} />
            </div>

            {chartData.length > 0 && <MotionChart data={chartData} />}
            
            {chartData.length > 0 && <ExportPanel data={chartData} />}
          </div>
        </section>
      </main>
    </div>
  );
}
