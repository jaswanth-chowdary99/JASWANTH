import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
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
  const [equipmentFilter, setEquipmentFilter] = useState("All");

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const categories = ["all", "strength", "cardio", "yoga", "sports"];
  const equipmentOptions = ["All", "Bodyweight", "Dumbbells", "Barbells"];

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter;
    const matchesEquipment = equipmentFilter === "All" || exercise.equipment === equipmentFilter;
    
    return matchesSearch && matchesCategory && matchesEquipment;
  });

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
      
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
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

          {/* Category Filter */}
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "secondary"}
                size="sm"
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  categoryFilter === category 
                    ? "bg-primary-500 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setCategoryFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {/* Equipment Filter */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {equipmentOptions.map((equipment) => (
              <Button
                key={equipment}
                variant={equipmentFilter === equipment ? "default" : "secondary"}
                size="sm"
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  equipmentFilter === equipment 
                    ? "bg-primary-500 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setEquipmentFilter(equipment)}
              >
                {equipment}
              </Button>
            ))}
          </div>
        </div>

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
