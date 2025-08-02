import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import ExerciseCard from "@/components/workout/exercise-card";
import ExerciseModal from "@/components/workout/exercise-modal";
import Timer from "@/components/workout/timer";
import ProgressRing from "@/components/progress/progress-ring";
import { Button } from "@/components/ui/button";
import { Dumbbell, Heart, Leaf, Target } from "lucide-react";
import type { Exercise, UserStats, Workout } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Exercise | null>(null);
  const [equipmentFilter, setEquipmentFilter] = useState("All");

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const { data: workouts = [] } = useQuery<Workout[]>({
    queryKey: ["/api/workouts"],
  });

  const { data: userStats } = useQuery<UserStats>({
    queryKey: ["/api/stats"],
  });

  const todaysWorkout = workouts.find(w => w.category === "strength");
  const filteredExercises = equipmentFilter === "All" 
    ? exercises.slice(0, 3) 
    : exercises.filter(ex => ex.equipment === equipmentFilter).slice(0, 3);

  const equipmentOptions = ["All", "Bodyweight", "Dumbbells", "Barbells"];

  const workoutCategories = [
    { 
      type: "strength", 
      name: "Strength", 
      description: "Build muscle", 
      icon: Dumbbell, 
      bgColor: "bg-primary-50", 
      iconColor: "text-primary-500" 
    },
    { 
      type: "cardio", 
      name: "Cardio", 
      description: "Heart health", 
      icon: Heart, 
      bgColor: "bg-success-50", 
      iconColor: "text-success-500" 
    },
    { 
      type: "yoga", 
      name: "Yoga", 
      description: "Flexibility", 
      icon: Leaf, 
      bgColor: "bg-purple-50", 
      iconColor: "text-purple-500" 
    },
    { 
      type: "sports", 
      name: "Sports", 
      description: "Performance", 
      icon: Target, 
      bgColor: "bg-orange-50", 
      iconColor: "text-orange-500" 
    },
  ];

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsExerciseModalOpen(true);
  };

  const handleStartExercise = (exercise: Exercise) => {
    setActiveWorkout(exercise);
    setIsExerciseModalOpen(false);
  };

  const handleStartTodaysWorkout = () => {
    if (todaysWorkout) {
      setLocation(`/workout/${todaysWorkout.id}`);
    }
  };

  const weeklyProgress = userStats 
    ? Math.round(((userStats.weeklyProgress || 0) / (userStats.weeklyGoal || 1)) * 100) 
    : 75;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Welcome Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Ready to Train?</h2>
            <p className="text-blue-100 text-sm">100% free fitness training • No subscriptions ever</p>
          </div>
          
          {/* Today's Workout Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Today's Workout</h3>
                <p className="text-blue-100 text-sm">
                  {todaysWorkout?.name || "Upper Body Strength"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {todaysWorkout?.duration || 45}
                </div>
                <div className="text-xs text-blue-100">minutes</div>
              </div>
            </div>
            <Button 
              className="w-full bg-white text-primary-600 font-semibold py-3 rounded-xl hover:bg-gray-50"
              onClick={handleStartTodaysWorkout}
            >
              Start Workout
            </Button>
          </div>
        </div>
      </section>

      {/* Workout Categories Grid */}
      <section className="max-w-md mx-auto px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          {workoutCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.type}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setLocation(`/exercises?category=${category.type}`)}
              >
                <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h4>
                <p className="text-xs text-gray-500">{category.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="max-w-md mx-auto px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <ProgressRing progress={weeklyProgress} className="mx-auto mb-2" />
              <p className="text-xs text-gray-500">Weekly Goal</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {userStats?.totalWorkouts || 12}
              </div>
              <p className="text-xs text-gray-500">Workouts Done</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {userStats?.currentStreak || 5}
              </div>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timer Component */}
      <Timer 
        exercise={activeWorkout}
        isActive={!!activeWorkout}
        onComplete={() => setActiveWorkout(null)}
        onNext={() => setActiveWorkout(null)}
        onPause={() => {}}
      />

      {/* Exercise Library Section */}
      <section className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Exercise Library</h3>
          <Button 
            variant="ghost"
            className="text-primary-500 text-sm font-medium p-0 h-auto"
            onClick={() => setLocation("/exercises")}
          >
            View All
          </Button>
        </div>
        
        {/* Equipment Filter */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
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

        {/* Exercise Cards */}
        <div className="space-y-3">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => handleExerciseClick(exercise)}
            />
          ))}
        </div>
      </section>

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
