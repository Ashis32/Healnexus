import { HealthData, HealthDataPoint } from "@shared/schema";

const FIREBASE_DB_URL = process.env.FIREBASE_PROJECT_ID 
  ? `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
  : 'https://healnexus-ea09f-default-rtdb.firebaseio.com';

export class FirebaseService {
  private dbUrl: string;
  private pollingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.dbUrl = FIREBASE_DB_URL;
    this.startPolling();
  }

  private startPolling() {
    // Poll Firebase every 3 seconds to collect and persist historical data
    this.pollingInterval = setInterval(async () => {
      try {
        const currentData = await this.fetchCurrentHealthData();
        if (currentData) {
          // Store this reading in Firebase history with timestamp
          await this.saveHistoricalDataPoint(currentData);
        }
      } catch (error) {
        console.error('Error polling and saving Firebase data:', error);
      }
    }, 3000);
  }

  private async fetchCurrentHealthData(): Promise<HealthData | null> {
    try {
      const response = await fetch(`${this.dbUrl}/health.json`);
      
      if (!response.ok) {
        throw new Error(`Firebase request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data) {
        return null;
      }

      return {
        accX: data.accX || 0,
        accY: data.accY || 0,
        accZ: data.accZ || 0,
        bpm: data.bpm || 0,
        ecg: data.ecg || 0,
        gyroX: data.gyroX || 0,
        gyroY: data.gyroY || 0,
        gyroZ: data.gyroZ || 0,
        lead_minus: data.lead_minus || 0,
        lead_plus: data.lead_plus || 0,
        steps: data.steps || 0,
        temperature: data.temperature || 0,
      };
    } catch (error) {
      console.error('Error fetching current health data:', error);
      throw error;
    }
  }

  private async saveHistoricalDataPoint(data: HealthData): Promise<void> {
    try {
      const timestamp = Date.now();
      const dataPoint: HealthDataPoint = {
        ...data,
        timestamp,
      };

      // Push to Firebase history collection
      const response = await fetch(`${this.dbUrl}/healthHistory.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPoint),
      });

      if (!response.ok) {
        throw new Error(`Failed to save historical data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error saving historical data point:', error);
      // Don't throw - we don't want to stop polling if save fails
    }
  }

  async getCurrentHealthData(): Promise<HealthData | null> {
    return this.fetchCurrentHealthData();
  }

  async getHistoricalHealthData(startDate?: Date, endDate?: Date): Promise<HealthDataPoint[]> {
    try {
      // Fetch all historical data from Firebase
      const response = await fetch(`${this.dbUrl}/healthHistory.json`);
      
      if (!response.ok) {
        throw new Error(`Firebase request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data) {
        // If no historical data exists yet, return current data as single point
        const currentData = await this.getCurrentHealthData();
        if (currentData) {
          return [{
            ...currentData,
            timestamp: Date.now(),
          }];
        }
        return [];
      }

      // Convert Firebase object to array of data points
      const dataPoints: HealthDataPoint[] = Object.values(data);

      // Sort by timestamp (newest first)
      dataPoints.sort((a, b) => b.timestamp - a.timestamp);

      // Filter by date range if provided
      let filteredData = dataPoints;
      if (startDate && endDate) {
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        filteredData = dataPoints.filter(point => 
          point.timestamp >= startTime && point.timestamp <= endTime
        );
      }

      // For charts, return last 60 points (or filtered data if less)
      // For export, return all filtered data
      return filteredData.slice(0, 200); // Limit to last 200 points for performance
    } catch (error) {
      console.error('Error fetching historical health data:', error);
      throw error;
    }
  }

  async getExportData(startDate?: Date, endDate?: Date): Promise<HealthDataPoint[]> {
    try {
      // Fetch all historical data from Firebase
      const response = await fetch(`${this.dbUrl}/healthHistory.json`);
      
      if (!response.ok) {
        throw new Error(`Firebase request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data) {
        return [];
      }

      // Convert Firebase object to array of data points
      const dataPoints: HealthDataPoint[] = Object.values(data);

      // Sort by timestamp (oldest first for export)
      dataPoints.sort((a, b) => a.timestamp - b.timestamp);

      // Filter by date range if provided
      if (startDate && endDate) {
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        return dataPoints.filter(point => 
          point.timestamp >= startTime && point.timestamp <= endTime
        );
      }

      // Return all data for export (no limit)
      return dataPoints;
    } catch (error) {
      console.error('Error fetching export data:', error);
      throw error;
    }
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

export const firebaseService = new FirebaseService();
