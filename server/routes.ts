import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema, insertUserStatsSchema, insertUserPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Exercise routes
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });

  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exercise = await storage.getExerciseById(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exercise" });
    }
  });

  app.get("/api/exercises/category/:category", async (req, res) => {
    try {
      const exercises = await storage.getExercisesByCategory(req.params.category);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exercises by category" });
    }
  });

  app.get("/api/exercises/equipment/:equipment", async (req, res) => {
    try {
      const exercises = await storage.getExercisesByEquipment(req.params.equipment);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exercises by equipment" });
    }
  });

  // Workout routes
  app.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await storage.getWorkouts();
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workouts" });
    }
  });

  app.get("/api/workouts/:id", async (req, res) => {
    try {
      const workout = await storage.getWorkoutById(req.params.id);
      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }
      res.json(workout);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workout" });
    }
  });

  app.get("/api/workouts/category/:category", async (req, res) => {
    try {
      const workouts = await storage.getWorkoutsByCategory(req.params.category);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workouts by category" });
    }
  });

  // User progress routes
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress();
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.get("/api/progress/workout/:workoutId", async (req, res) => {
    try {
      const progress = await storage.getProgressByWorkout(req.params.workoutId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch workout progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.createProgress(validatedData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid progress data" });
    }
  });

  // User stats routes
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.put("/api/stats", async (req, res) => {
    try {
      const stats = await storage.updateUserStats(req.body);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to update stats" });
    }
  });

  // User preferences routes
  app.get("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.getUserPreferences();
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.put("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.updateUserPreferences(req.body);
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
