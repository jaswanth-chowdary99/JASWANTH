import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  instructions: json("instructions").$type<string[]>().notNull(),
  muscleGroups: json("muscle_groups").$type<string[]>().notNull(),
  equipment: text("equipment").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  category: text("category").notNull(), // strength, cardio, yoga, sports
  videoUrl: text("video_url"),
});

export const workouts = pgTable("workouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  duration: integer("duration").notNull(), // minutes
  difficulty: text("difficulty").notNull(),
  exercises: json("exercises").$type<{
    exerciseId: string;
    sets: number;
    reps: string;
    restSeconds: number;
    weight?: number;
    duration?: number;
  }[]>().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workoutId: text("workout_id").notNull(),
  exerciseId: text("exercise_id").notNull(),
  completedAt: timestamp("completed_at").notNull(),
  sets: integer("sets"),
  reps: integer("reps"),
  weight: integer("weight"),
  duration: integer("duration"),
  notes: text("notes"),
});

export const userStats = pgTable("user_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalWorkouts: integer("total_workouts").default(0),
  currentStreak: integer("current_streak").default(0),
  weeklyGoal: integer("weekly_goal").default(3),
  weeklyProgress: integer("weekly_progress").default(0),
  lastWorkoutDate: timestamp("last_workout_date"),
});

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  availableEquipment: json("available_equipment").$type<string[]>().default([]),
  preferredDifficulty: text("preferred_difficulty").default("beginner"),
  timerEnabled: boolean("timer_enabled").default(true),
  soundEnabled: boolean("sound_enabled").default(true),
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
});

export const insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
