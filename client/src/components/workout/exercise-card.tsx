import { Play, ChevronRight } from "lucide-react";
import type { Exercise } from "@shared/schema";

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

export default function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-primary-50 text-primary-600";
      case "intermediate":
        return "bg-success-50 text-success-600";
      case "advanced":
        return "bg-orange-50 text-orange-500";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div 
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Play className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{exercise.name}</h4>
          <p className="text-sm text-gray-500 mb-2">
            {exercise.muscleGroups.join(", ")}
          </p>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-lg ${getDifficultyColor(exercise.difficulty)}`}>
              {capitalizeFirst(exercise.difficulty)}
            </span>
            <span className="text-xs text-gray-400">{exercise.equipment}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
    </div>
  );
}
