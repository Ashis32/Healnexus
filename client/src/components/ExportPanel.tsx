import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, FileSpreadsheet } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { HealthDataPoint } from "@shared/schema";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";

interface ExportPanelProps {
  data: HealthDataPoint[];
}

export function ExportPanel({ data }: ExportPanelProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Fetch export data from API with date range
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString());
      if (endDate) params.append('endDate', endDate.toISOString());
      
      const response = await fetch(`/api/health/export?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch export data');
      }
      
      const exportData: HealthDataPoint[] = await response.json();

      if (exportData.length === 0) {
        toast({
          title: "No data available",
          description: "No health data found for the selected date range.",
          variant: "destructive",
        });
        setIsExporting(false);
        return;
      }

      // Format data for Excel
      const formattedData = exportData.map(point => ({
        'Timestamp': new Date(point.timestamp).toLocaleString(),
        'Heart Rate (BPM)': point.bpm,
        'ECG (mV)': point.ecg,
        'Temperature (°C)': point.temperature,
        'Steps': point.steps,
        'Acc X (g)': point.accX,
        'Acc Y (g)': point.accY,
        'Acc Z (g)': point.accZ,
        'Gyro X (°/s)': point.gyroX,
        'Gyro Y (°/s)': point.gyroY,
        'Gyro Z (°/s)': point.gyroZ,
        'Lead + (mV)': point.lead_plus,
        'Lead - (mV)': point.lead_minus,
      }));

      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Health Data');

      // Generate filename with date range
      const dateRangeStr = startDate && endDate
        ? `${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}`
        : format(new Date(), 'yyyy-MM-dd');
      const fileName = `HealNexus_Export_${dateRangeStr}.xlsx`;
      
      // Download file
      XLSX.writeFile(workbook, fileName);

      toast({
        title: "Export successful",
        description: `Downloaded ${exportData.length} health records to ${fileName}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to export health data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="p-4 md:p-6 hover-elevate transition-all duration-300" data-testid="card-export-panel">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/30">
          <FileSpreadsheet className="w-6 h-6 text-accent-foreground" data-testid="icon-export" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Export Data</h3>
          <p className="text-sm text-muted-foreground">Download health records</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                  data-testid="button-start-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                  data-testid="button-end-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button 
          onClick={handleExport} 
          className="w-full gap-2" 
          size="lg"
          disabled={isExporting}
          data-testid="button-export-download"
        >
          <Download className="w-5 h-5" />
          {isExporting ? "Exporting..." : "Download Excel Report"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {startDate && endDate 
            ? `Exporting data from ${format(startDate, "MMM d, yyyy")} to ${format(endDate, "MMM d, yyyy")}`
            : "Select date range or export all available data"
          }
        </p>
      </div>
    </Card>
  );
}
