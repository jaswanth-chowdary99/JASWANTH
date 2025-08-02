import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import Timer from "@/components/workout/timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Check, SkipForward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Workout, Exercise, InsertUserProgress } from "@shared/schema";

export default function WorkoutPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const [workoutStartTime] = useState(new Date());

  const { data: workout } = useQuery<Workout>({
    queryKey: ["/api/workouts", id],
  });

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const createProgressMutation = useMutation({
    mutationFn: async (progress: InsertUserProgress) => {
      return apiRequest("POST", "/api/progress", progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const currentWorkoutExercise = workout?.exercises[currentExerciseIndex];
  const currentExercise = currentWorkoutExercise 
    ? exercises.find(ex => ex.id === currentWorkoutExercise.exerciseId)
    : null;

  const isWorkoutComplete = currentExerciseIndex >= (workout?.exercises.length || 0);

  const handleStartSet = () => {
    setIsTimerActive(true);
  };

  const handleCompleteSet = () => {
    if (!currentWorkoutExercise || !currentExercise) return;

    const setKey = `${currentExerciseIndex}-${currentSet}`;
    setCompletedSets(prev => new Set(prev).add(setKey));

    // Record progress
    createProgressMutation.mutate({
      workoutId: workout!.id,
      exerciseId: currentExercise.id,
      completedAt: new Date(),
      sets: 1,
      reps: parseInt(currentWorkoutExercise.reps) || 0,
      weight: currentWorkoutExercise.weight,
      duration: currentWorkoutExercise.duration,
    });

    if (currentSet < currentWorkoutExercise.sets) {
      setCurrentSet(prev => prev + 1);
    } else {
      handleNextExercise();
    }
    
    setIsTimerActive(false);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < (workout?.exercises.length || 0) - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsTimerActive(false);
    } else {
      // Workout complete
      toast({
        title: "Workout Complete!",
        description: "Great job finishing your workout!",
      });
      setLocation("/");
    }
  };

  const handleFinishWorkout = () => {
    toast({
      title: "Workout Complete!",
      description: "Great job finishing your workout!",
    });
    setLocation("/");
  };

  if (!workout || !currentExercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading workout...</h2>
        </div>
      </div>
    );
  }

  if (isWorkoutComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Workout Complete!</h2>
            <p className="text-gray-600 mb-6">
              You've successfully completed {workout.name}. Great job!
            </p>
            <Button 
              onClick={handleFinishWorkout}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl"
            >
              Finish Workout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Workout Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{workout.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Exercise {currentExerciseIndex + 1} of {workout.exercises.length}</span>
            <span>•</span>
            <span>Set {currentSet} of {currentWorkoutExercise?.sets || 1}</span>
          </div>
        </div>

        {/* Current Exercise */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentExercise.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentExercise.muscleGroups.join(", ")}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentWorkoutExercise?.sets || 3}</div>
                <div className="text-xs text-gray-500">Sets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentWorkoutExercise?.reps || "12"}</div>
                <div className="text-xs text-gray-500">Reps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{currentWorkoutExercise?.restSeconds || 60}s</div>
                <div className="text-xs text-gray-500">Rest</div>
              </div>
            </div>

            <div className="space-y-3">
              {!isTimerActive ? (
                <Button
                  onClick={handleStartSet}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Set {currentSet}
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteSet}
                  className="w-full bg-success-500 hover:bg-success-600 text-white font-semibold py-4 rounded-xl"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Complete Set
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={handleNextExercise}
                className="w-full border-gray-200 rounded-xl"
              >
                <SkipForward className="w-5 h-5 mr-2" />
                Skip Exercise
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
            <div className="space-y-3">
              {currentExercise.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timer Component */}
        <Timer 
          exercise={currentExercise}
          isActive={isTimerActive}
          onComplete={handleCompleteSet}
          onNext={handleNextExercise}
          onPause={() => setIsTimerActive(false)}
        />
      </div>

      <BottomNavigation />
    </div>
  );
}
