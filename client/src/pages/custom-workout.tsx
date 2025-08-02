import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Save, Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Exercise } from "@shared/schema";

interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: string;
  restSeconds: number;
  weight?: number;
}

export default function CustomWorkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter;
    const notAlreadySelected = !selectedExercises.some(we => we.exercise.id === exercise.id);
    
    return matchesSearch && matchesCategory && notAlreadySelected;
  });

  const addExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      exercise,
      sets: 3,
      reps: "12",
      restSeconds: 60
    };
    setSelectedExercises([...selectedExercises, workoutExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(we => we.exercise.id !== exerciseId));
  };

  const updateExercise = (exerciseId: string, field: keyof Omit<WorkoutExercise, 'exercise'>, value: any) => {
    setSelectedExercises(selectedExercises.map(we => 
      we.exercise.id === exerciseId ? { ...we, [field]: value } : we
    ));
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      toast({
        title: "Missing workout name",
        description: "Please enter a name for your workout.",
        variant: "destructive"
      });
      return;
    }

    if (selectedExercises.length === 0) {
      toast({
        title: "No exercises selected",
        description: "Please add at least one exercise to your workout.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to backend
    toast({
      title: "Workout saved!",
      description: `${workoutName} has been saved to your custom workouts.`,
    });

    // Redirect to home
    setLocation("/");
  };

  const totalDuration = selectedExercises.reduce((total, we) => {
    const exerciseTime = we.sets * (45 + we.restSeconds); // Assuming 45 seconds per set
    return total + exerciseTime;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Custom Workout</h1>
          
          {/* Workout Name */}
          <div className="mb-4">
            <Label htmlFor="workout-name" className="text-sm font-medium text-gray-700">
              Workout Name
            </Label>
            <Input
              id="workout-name"
              type="text"
              placeholder="My Awesome Workout"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Workout Summary */}
          {selectedExercises.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center text-sm">
                  <span>{selectedExercises.length} exercises</span>
                  <span>~{Math.round(totalDuration / 60)} minutes</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Selected Exercises */}
        {selectedExercises.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Exercises</h3>
            <div className="space-y-3">
              {selectedExercises.map((workoutExercise, index) => (
                <Card key={workoutExercise.exercise.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{workoutExercise.exercise.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {workoutExercise.exercise.muscleGroups.map((muscle) => (
                            <Badge key={muscle} variant="secondary" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(workoutExercise.exercise.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs text-gray-500">Sets</Label>
                        <Input
                          type="number"
                          min="1"
                          value={workoutExercise.sets}
                          onChange={(e) => updateExercise(workoutExercise.exercise.id, 'sets', parseInt(e.target.value))}
                          className="text-center"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Reps</Label>
                        <Input
                          type="text"
                          value={workoutExercise.reps}
                          onChange={(e) => updateExercise(workoutExercise.exercise.id, 'reps', e.target.value)}
                          className="text-center"
                          placeholder="12"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Rest (s)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="15"
                          value={workoutExercise.restSeconds}
                          onChange={(e) => updateExercise(workoutExercise.exercise.id, 'restSeconds', parseInt(e.target.value))}
                          className="text-center"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Exercise Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Exercises</h3>
          
          {/* Search and Filter */}
          <div className="space-y-3 mb-4">
            <Input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Exercise List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredExercises.slice(0, 10).map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              >
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{exercise.name}</h4>
                  <p className="text-xs text-gray-500">{exercise.muscleGroups.join(", ")}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addExercise(exercise)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setLocation("/")}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={saveWorkout}
            disabled={!workoutName.trim() || selectedExercises.length === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Workout
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}