import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Flame, Calendar, Star } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

interface AchievementBadgesProps {
  workoutCount?: number;
  streak?: number;
}

export default function AchievementBadges({ workoutCount = 0, streak = 0 }: AchievementBadgesProps) {
  const achievements: Achievement[] = [
    {
      id: "first-workout",
      name: "Getting Started",
      description: "Complete your first workout",
      icon: Star,
      unlocked: workoutCount >= 1,
    },
    {
      id: "week-streak",
      name: "Consistent",
      description: "Maintain a 7-day workout streak",
      icon: Flame,
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      target: 7,
    },
    {
      id: "ten-workouts",
      name: "Dedicated",
      description: "Complete 10 workouts",
      icon: Target,
      unlocked: workoutCount >= 10,
      progress: Math.min(workoutCount, 10),
      target: 10,
    },
    {
      id: "month-active",
      name: "Monthly Warrior",
      description: "Work out for 30 days",
      icon: Calendar,
      unlocked: workoutCount >= 30,
      progress: Math.min(workoutCount, 30),
      target: 30,
    },
    {
      id: "champion",
      name: "Fitness Champion",
      description: "Complete 100 workouts",
      icon: Trophy,
      unlocked: workoutCount >= 100,
      progress: Math.min(workoutCount, 100),
      target: 100,
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Achievements
          </div>
          <Badge variant="secondary" className="text-xs">
            {unlockedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {achievements.slice(0, 6).map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`text-center p-3 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    achievement.unlocked
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p className={`text-xs font-medium ${
                  achievement.unlocked ? "text-yellow-700" : "text-gray-500"
                }`}>
                  {achievement.name}
                </p>
                {achievement.progress !== undefined && achievement.target && !achievement.unlocked && (
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-yellow-500 h-1 rounded-full transition-all"
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {achievement.progress}/{achievement.target}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}