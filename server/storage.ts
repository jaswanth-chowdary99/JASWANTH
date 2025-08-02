import { 
  type Exercise, 
  type InsertExercise,
  type Workout,
  type InsertWorkout,
  type UserProgress,
  type InsertUserProgress,
  type UserStats,
  type InsertUserStats,
  type UserPreferences,
  type InsertUserPreferences
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Exercises
  getExercises(): Promise<Exercise[]>;
  getExerciseById(id: string): Promise<Exercise | undefined>;
  getExercisesByCategory(category: string): Promise<Exercise[]>;
  getExercisesByEquipment(equipment: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Workouts
  getWorkouts(): Promise<Workout[]>;
  getWorkoutById(id: string): Promise<Workout | undefined>;
  getWorkoutsByCategory(category: string): Promise<Workout[]>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;

  // User Progress
  getUserProgress(): Promise<UserProgress[]>;
  getProgressByWorkout(workoutId: string): Promise<UserProgress[]>;
  createProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // User Stats
  getUserStats(): Promise<UserStats | undefined>;
  updateUserStats(stats: Partial<UserStats>): Promise<UserStats>;

  // User Preferences
  getUserPreferences(): Promise<UserPreferences | undefined>;
  updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences>;
}

export class MemStorage implements IStorage {
  private exercises: Map<string, Exercise> = new Map();
  private workouts: Map<string, Workout> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private userStats: UserStats | undefined;
  private userPreferences: UserPreferences | undefined;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with comprehensive exercise data
    const exercises: Exercise[] = [
      {
        id: "1",
        name: "Push-ups",
        description: "Classic bodyweight exercise for chest, triceps, and shoulders",
        instructions: [
          "Start in a plank position with your hands slightly wider than shoulder-width apart",
          "Lower your body until your chest nearly touches the floor",
          "Push yourself back up to the starting position",
          "Keep your body in a straight line throughout the movement"
        ],
        muscleGroups: ["Chest", "Triceps", "Shoulders", "Core"],
        equipment: "Bodyweight",
        difficulty: "beginner",
        category: "strength",
        videoUrl: null
      },
      {
        id: "2",
        name: "Squats",
        description: "Fundamental lower body exercise",
        instructions: [
          "Stand with feet shoulder-width apart",
          "Lower your body by bending your knees and pushing your hips back",
          "Keep your chest up and knees in line with your toes",
          "Return to standing position by driving through your heels"
        ],
        muscleGroups: ["Quadriceps", "Glutes", "Hamstrings", "Calves"],
        equipment: "Bodyweight",
        difficulty: "beginner",
        category: "strength",
        videoUrl: null
      },
      {
        id: "3",
        name: "Dumbbell Rows",
        description: "Back strengthening exercise",
        instructions: [
          "Hold a dumbbell in one hand and place the other hand on a bench",
          "Keep your back straight and core engaged",
          "Pull the dumbbell up to your ribcage",
          "Lower the weight with control"
        ],
        muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Biceps"],
        equipment: "Dumbbells",
        difficulty: "intermediate",
        category: "strength",
        videoUrl: null
      },
      {
        id: "4",
        name: "Burpees",
        description: "Full-body cardio exercise",
        instructions: [
          "Start in a standing position",
          "Drop down into a squat position and place hands on the ground",
          "Jump your feet back into a plank position",
          "Do a push-up, then jump feet back to squat",
          "Jump up with arms overhead"
        ],
        muscleGroups: ["Full Body"],
        equipment: "Bodyweight",
        difficulty: "advanced",
        category: "cardio",
        videoUrl: null
      },
      {
        id: "5",
        name: "Downward Dog",
        description: "Classic yoga pose for flexibility and strength",
        instructions: [
          "Start on hands and knees",
          "Tuck your toes and lift your hips up",
          "Straighten your legs and arms",
          "Hold the position while breathing deeply"
        ],
        muscleGroups: ["Shoulders", "Hamstrings", "Calves", "Core"],
        equipment: "Bodyweight",
        difficulty: "beginner",
        category: "yoga",
        videoUrl: null
      },
      {
        id: "6",
        name: "Jumping Jacks",
        description: "Classic cardio warm-up exercise",
        instructions: [
          "Start with feet together and arms at your sides",
          "Jump while spreading legs shoulder-width apart",
          "Simultaneously raise arms overhead",
          "Jump back to starting position"
        ],
        muscleGroups: ["Full Body"],
        equipment: "Bodyweight",
        difficulty: "beginner",
        category: "cardio",
        videoUrl: null
      },
      {
        id: "7",
        name: "Plank",
        description: "Core strengthening exercise",
        instructions: [
          "Start in a push-up position",
          "Lower down to your forearms",
          "Keep your body in a straight line",
          "Hold the position while breathing normally"
        ],
        muscleGroups: ["Core", "Shoulders", "Glutes"],
        equipment: "Bodyweight",
        difficulty: "beginner",
        category: "strength",
        videoUrl: null
      },
      {
        id: "8",
        name: "Deadlifts",
        description: "Compound exercise for posterior chain",
        instructions: [
          "Stand with feet hip-width apart, barbell over mid-foot",
          "Bend at hips and knees to grip the bar",
          "Keep chest up and back straight",
          "Drive through heels to stand up straight"
        ],
        muscleGroups: ["Hamstrings", "Glutes", "Lower Back", "Traps"],
        equipment: "Barbells",
        difficulty: "intermediate",
        category: "strength",
        videoUrl: null
      }
    ];

    exercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });

    // Initialize workouts
    const workouts: Workout[] = [
      {
        id: "w1",
        name: "Upper Body Strength",
        description: "Focus on building upper body strength",
        category: "strength",
        duration: 45,
        difficulty: "intermediate",
        exercises: [
          { exerciseId: "1", sets: 3, reps: "12-15", restSeconds: 60 },
          { exerciseId: "3", sets: 3, reps: "10-12", restSeconds: 90 },
          { exerciseId: "7", sets: 3, reps: "30-60s", restSeconds: 60 }
        ]
      },
      {
        id: "w2",
        name: "Lower Body Power",
        description: "Build lower body strength and power",
        category: "strength",
        duration: 40,
        difficulty: "beginner",
        exercises: [
          { exerciseId: "2", sets: 3, reps: "15-20", restSeconds: 60 },
          { exerciseId: "8", sets: 3, reps: "8-10", restSeconds: 120 }
        ]
      },
      {
        id: "w3",
        name: "HIIT Cardio Blast",
        description: "High-intensity interval training",
        category: "cardio",
        duration: 25,
        difficulty: "advanced",
        exercises: [
          { exerciseId: "4", sets: 4, reps: "45s", restSeconds: 15 },
          { exerciseId: "6", sets: 4, reps: "30s", restSeconds: 30 }
        ]
      },
      {
        id: "w4",
        name: "Morning Yoga Flow",
        description: "Gentle yoga sequence to start your day",
        category: "yoga",
        duration: 30,
        difficulty: "beginner",
        exercises: [
          { exerciseId: "5", sets: 1, reps: "60s", restSeconds: 10 }
        ]
      }
    ];

    workouts.forEach(workout => {
      this.workouts.set(workout.id, workout);
    });

    // Initialize user stats
    this.userStats = {
      id: "stats1",
      totalWorkouts: 12,
      currentStreak: 5,
      weeklyGoal: 4,
      weeklyProgress: 3,
      lastWorkoutDate: new Date()
    };

    // Initialize user preferences
    this.userPreferences = {
      id: "prefs1",
      availableEquipment: ["Bodyweight", "Dumbbells"],
      preferredDifficulty: "beginner",
      timerEnabled: true,
      soundEnabled: true
    };
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExerciseById(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(ex => ex.category === category);
  }

  async getExercisesByEquipment(equipment: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(ex => ex.equipment === equipment);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { 
      id,
      name: insertExercise.name,
      description: insertExercise.description || null,
      instructions: insertExercise.instructions,
      muscleGroups: insertExercise.muscleGroups,
      equipment: insertExercise.equipment,
      difficulty: insertExercise.difficulty,
      category: insertExercise.category,
      videoUrl: insertExercise.videoUrl || null
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async getWorkouts(): Promise<Workout[]> {
    return Array.from(this.workouts.values());
  }

  async getWorkoutById(id: string): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async getWorkoutsByCategory(category: string): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(w => w.category === category);
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = randomUUID();
    const workout: Workout = { 
      id,
      name: insertWorkout.name,
      description: insertWorkout.description || null,
      category: insertWorkout.category,
      duration: insertWorkout.duration,
      difficulty: insertWorkout.difficulty,
      exercises: insertWorkout.exercises
    };
    this.workouts.set(id, workout);
    return workout;
  }

  async getUserProgress(): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values());
  }

  async getProgressByWorkout(workoutId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(p => p.workoutId === workoutId);
  }

  async createProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      sets: insertProgress.sets || null,
      reps: insertProgress.reps || null,
      weight: insertProgress.weight || null,
      duration: insertProgress.duration || null,
      notes: insertProgress.notes || null
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async getUserStats(): Promise<UserStats | undefined> {
    return this.userStats;
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    if (this.userStats) {
      this.userStats = { ...this.userStats, ...stats };
    } else {
      const id = randomUUID();
      this.userStats = { 
        id,
        totalWorkouts: 0,
        currentStreak: 0,
        weeklyGoal: 3,
        weeklyProgress: 0,
        lastWorkoutDate: null,
        ...stats 
      };
    }
    return this.userStats;
  }

  async getUserPreferences(): Promise<UserPreferences | undefined> {
    return this.userPreferences;
  }

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    if (this.userPreferences) {
      this.userPreferences = { ...this.userPreferences, ...preferences };
    } else {
      const id = randomUUID();
      this.userPreferences = {
        id,
        availableEquipment: [],
        preferredDifficulty: "beginner",
        timerEnabled: true,
        soundEnabled: true,
        ...preferences
      };
    }
    return this.userPreferences;
  }
}

export const storage = new MemStorage();
