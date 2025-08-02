import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import ExerciseFilters from "@/components/exercise/exercise-filters";
import ExerciseCard from "@/components/workout/exercise-card";
import ExerciseModal from "@/components/workout/exercise-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Exercise } from "@shared/schema";

export default function ExerciseLibrary() {
  const [, setLocation] = useLocation();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [equipmentFilter, setEquipmentFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter;
    const matchesEquipment = equipmentFilter === "all" || exercise.equipment === equipmentFilter;
    const matchesDifficulty = difficultyFilter === "all" || exercise.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesEquipment && matchesDifficulty;
  });

  const categories = ["all", "strength", "cardio", "flexibility", "sports"];
  const equipmentOptions = ["all", "bodyweight", "dumbbells", "barbell", "resistance_bands", "machine"];

  const clearFilters = () => {
    setCategoryFilter("all");
    setEquipmentFilter("all");  
    setDifficultyFilter("all");
    setSearchTerm("");
  };

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsExerciseModalOpen(true);
  };

  const handleStartExercise = (exercise: Exercise) => {
    setIsExerciseModalOpen(false);
    // Could redirect to a workout session with this exercise
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Exercise Library</h1>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Filters */}
      <ExerciseFilters
        selectedCategory={categoryFilter}
        selectedEquipment={equipmentFilter}
        selectedDifficulty={difficultyFilter}
        onCategoryChange={setCategoryFilter}
        onEquipmentChange={setEquipmentFilter}
        onDifficultyChange={setDifficultyFilter}
        onClearFilters={clearFilters}
      />

      <div className="max-w-md mx-auto px-4 pb-24">

        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No exercises found matching your criteria.</p>
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={() => handleExerciseClick(exercise)}
              />
            ))
          )}
        </div>
      </div>

      <ExerciseModal
        exercise={selectedExercise}
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        onStartExercise={handleStartExercise}
      />

      <BottomNavigation />
    </div>
  );
}
