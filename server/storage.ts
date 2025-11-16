// Storage interface for HealNexus
// Using in-memory storage for session data if needed in the future

export interface IStorage {
  // Placeholder for future storage needs
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize any in-memory storage if needed
  }
}

export const storage = new MemStorage();
