import type { Express } from "express";
import { createServer, type Server } from "http";
import { firebaseService } from "./firebase";
import { healthDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health-check", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get current health data from Firebase
  app.get("/api/health/current", async (req, res) => {
    try {
      const data = await firebaseService.getCurrentHealthData();
      
      if (!data) {
        return res.status(404).json({ 
          error: "No health data available",
          message: "Unable to fetch data from Firebase Realtime Database"
        });
      }

      // Validate data with Zod schema
      const validatedData = healthDataSchema.parse(data);
      res.json(validatedData);
    } catch (error) {
      console.error("Error fetching current health data:", error);
      res.status(500).json({ 
        error: "Failed to fetch health data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get historical health data for charts
  app.get("/api/health/history", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;

      const data = await firebaseService.getHistoricalHealthData(start, end);
      res.json(data);
    } catch (error) {
      console.error("Error fetching historical health data:", error);
      res.status(500).json({ 
        error: "Failed to fetch historical data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get all historical data for export with date range filtering
  app.get("/api/health/export", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;

      const data = await firebaseService.getExportData(start, end);
      res.json(data);
    } catch (error) {
      console.error("Error fetching export data:", error);
      res.status(500).json({ 
        error: "Failed to fetch export data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
