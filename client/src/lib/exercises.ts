import type { Exercise } from "@shared/schema";

export const MUSCLE_GROUPS = [
  "Chest",
  "Back", 
  "Shoulders",
  "Biceps",
  "Triceps",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Core",
  "Full Body"
] as const;

export const EQUIPMENT_TYPES = [
  "Bodyweight",
  "Dumbbells",
  "Barbells", 
  "Resistance Bands",
  "Kettlebells",
  "Pull-up Bar",
  "Bench",
  "Cable Machine",
  "Medicine Ball",
  "Stability Ball"
] as const;

export const DIFFICULTY_LEVELS = [
  "beginner",
  "intermediate", 
  "advanced"
] as const;

export const EXERCISE_CATEGORIES = [
  "strength",
  "cardio",
  "yoga",
  "sports",
  "stretching"
] as const;

export function getExercisesByMuscleGroup(exercises: Exercise[], muscleGroup: string): Exercise[] {
  return exercises.filter(exercise => 
    exercise.muscleGroups.some(muscle => 
      muscle.toLowerCase().includes(muscleGroup.toLowerCase())
    )
  );
}

export function getExercisesByEquipment(exercises: Exercise[], equipment: string): Exercise[] {
  return exercises.filter(exercise => 
    exercise.equipment.toLowerCase() === equipment.toLowerCase()
  );
}

export function getExercisesByDifficulty(exercises: Exercise[], difficulty: string): Exercise[] {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
}

export function getExercisesByCategory(exercises: Exercise[], category: string): Exercise[] {
  return exercises.filter(exercise => exercise.category === category);
}

export function searchExercises(exercises: Exercise[], searchTerm: string): Exercise[] {
  const term = searchTerm.toLowerCase();
  return exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(term) ||
    exercise.description?.toLowerCase().includes(term) ||
    exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(term)) ||
    exercise.equipment.toLowerCase().includes(term)
  );
}
