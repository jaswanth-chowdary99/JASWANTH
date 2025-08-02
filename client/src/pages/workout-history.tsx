import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import type { UserProgress, Exercise } from "@shared/schema";

export default function WorkoutHistory() {
  const { data: progressData = [] } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  // Group progress by date
  const groupedProgress = progressData.reduce((acc, progress) => {
    const date = format(new Date(progress.completedAt), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(progress);
    return acc;
  }, {} as Record<string, UserProgress[]>);

  const sortedDates = Object.keys(groupedProgress).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const getExerciseName = (exerciseId: string) => {
    const exercise = exercises.find(e => e.id === exerciseId);
    return exercise?.name || 'Unknown Exercise';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Workout History</h1>

        {sortedDates.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No workouts yet</h3>
              <p className="text-gray-500">Start your first workout to see your progress here!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedDates.map((date) => {
              const dayProgress = groupedProgress[date];
              const totalDuration = dayProgress.reduce((sum, p) => sum + (p.duration || 0), 0);
              const uniqueExercises = new Set(dayProgress.map(p => p.exerciseId)).size;

              return (
                <Card key={date}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                        {format(new Date(date), 'EEEE, MMM d')}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {Math.round(totalDuration / 60)}min
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex space-x-4 text-sm">
                        <span className="text-gray-600">
                          {uniqueExercises} exercises
                        </span>
                        <span className="text-gray-600">
                          {dayProgress.length} sets
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Completed
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {dayProgress.slice(0, 3).map((progress, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-900 font-medium">
                            {getExerciseName(progress.exerciseId)}
                          </span>
                          <span className="text-gray-500">
                            {progress.sets && progress.reps ? 
                              `${progress.sets}×${progress.reps}` : 
                              `${Math.round((progress.duration || 0) / 60)}min`
                            }
                          </span>
                        </div>
                      ))}
                      {dayProgress.length > 3 && (
                        <div className="text-xs text-gray-500 pt-1">
                          +{dayProgress.length - 3} more exercises
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}