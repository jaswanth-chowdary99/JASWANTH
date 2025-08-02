import type { Workout, Exercise } from "@shared/schema";

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: string;
  restSeconds: number;
  weight?: number;
  duration?: number;
}

export function getWorkoutExercises(
  workout: Workout, 
  exercises: Exercise[]
): WorkoutExercise[] {
  return workout.exercises.map(workoutEx => {
    const exercise = exercises.find(ex => ex.id === workoutEx.exerciseId);
    if (!exercise) {
      throw new Error(`Exercise with id ${workoutEx.exerciseId} not found`);
    }
    
    return {
      exercise,
      sets: workoutEx.sets,
      reps: workoutEx.reps,
      restSeconds: workoutEx.restSeconds,
      weight: workoutEx.weight,
      duration: workoutEx.duration
    };
  });
}

export function calculateWorkoutDuration(workout: Workout): number {
  // Estimate based on sets, reps, and rest time
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const totalRestTime = workout.exercises.reduce((sum, ex) => 
    sum + (ex.restSeconds * (ex.sets - 1)), 0
  );
  
  // Estimate 30 seconds per set for exercise time
  const exerciseTime = totalSets * 30;
  
  return Math.round((exerciseTime + totalRestTime) / 60); // Return in minutes
}

export function getWorkoutsByDifficulty(workouts: Workout[], difficulty: string): Workout[] {
  return workouts.filter(workout => workout.difficulty === difficulty);
}

export function getWorkoutsByCategory(workouts: Workout[], category: string): Workout[] {
  return workouts.filter(workout => workout.category === category);
}

export function getWorkoutsByDuration(
  workouts: Workout[], 
  minDuration: number, 
  maxDuration: number
): Workout[] {
  return workouts.filter(workout => 
    workout.duration >= minDuration && workout.duration <= maxDuration
  );
}

export function searchWorkouts(workouts: Workout[], searchTerm: string): Workout[] {
  const term = searchTerm.toLowerCase();
  return workouts.filter(workout =>
    workout.name.toLowerCase().includes(term) ||
    workout.description?.toLowerCase().includes(term) ||
    workout.category.toLowerCase().includes(term)
  );
}

export const WORKOUT_CATEGORIES = [
  {
    id: "strength",
    name: "Strength",
    description: "Build muscle and increase strength",
    color: "blue"
  },
  {
    id: "cardio", 
    name: "Cardio",
    description: "Improve cardiovascular health",
    color: "green"
  },
  {
    id: "yoga",
    name: "Yoga", 
    description: "Increase flexibility and mindfulness",
    color: "purple"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Sport-specific training",
    color: "orange"
  }
] as const;
