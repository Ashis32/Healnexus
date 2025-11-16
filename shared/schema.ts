import { z } from "zod";

// Health data from Firebase Realtime Database
export const healthDataSchema = z.object({
  accX: z.number(),
  accY: z.number(),
  accZ: z.number(),
  bpm: z.number(),
  ecg: z.number(),
  gyroX: z.number(),
  gyroY: z.number(),
  gyroZ: z.number(),
  lead_minus: z.number(),
  lead_plus: z.number(),
  steps: z.number(),
  temperature: z.number(),
});

export type HealthData = z.infer<typeof healthDataSchema>;

// Historical data point with REQUIRED timestamp for graphs and exports
export const healthDataPointSchema = healthDataSchema.extend({
  timestamp: z.number().int().positive(),
});

export type HealthDataPoint = z.infer<typeof healthDataPointSchema>;

// Export parameters
export const exportParamsSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  format: z.enum(['xlsx', 'csv']),
});

export type ExportParams = z.infer<typeof exportParamsSchema>;
