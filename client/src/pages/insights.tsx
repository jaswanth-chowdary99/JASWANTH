import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import ProgressRing from "@/components/progress/progress-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, Award, Target } from "lucide-react";
import type { UserStats, UserProgress } from "@shared/schema";

export default function Insights() {
  const { data: userStats } = useQuery<UserStats>({
    queryKey: ["/api/stats"],
  });

  const { data: progressData = [] } = useQuery<UserProgress[]>({
    queryKey: ["/api/progress"],
  });

  const weeklyProgress = userStats 
    ? Math.round(((userStats.weeklyProgress || 0) / (userStats.weeklyGoal || 1)) * 100) 
    : 75;

  const thisWeekWorkouts = progressData.filter(p => {
    const workoutDate = new Date(p.completedAt);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return workoutDate >= startOfWeek;
  }).length;

  const thisMonthWorkouts = progressData.filter(p => {
    const workoutDate = new Date(p.completedAt);
    const now = new Date();
    return workoutDate.getMonth() === now.getMonth() && 
           workoutDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h1>

        {/* Weekly Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-primary-500" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {userStats?.weeklyProgress || 3} / {userStats?.weeklyGoal || 4}
                </p>
                <p className="text-sm text-gray-500">workouts completed</p>
              </div>
              <ProgressRing progress={weeklyProgress} size={80} />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-success-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {userStats?.currentStreak || 5}
              </div>
              <p className="text-xs text-gray-500">Day Streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {thisWeekWorkouts}
              </div>
              <p className="text-xs text-gray-500">This Week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {userStats?.totalWorkouts || 12}
              </div>
              <p className="text-xs text-gray-500">Total Workouts</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {thisMonthWorkouts}
              </div>
              <p className="text-xs text-gray-500">This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {progressData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No workout data yet.</p>
                <p className="text-sm text-gray-400">Start your first workout to see your progress!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {progressData.slice(0, 5).map((progress, index) => (
                  <div key={progress.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Workout Completed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(progress.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {progress.sets && (
                        <p className="text-sm text-gray-600">{progress.sets} sets</p>
                      )}
                      {progress.reps && (
                        <p className="text-xs text-gray-500">{progress.reps} reps</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
