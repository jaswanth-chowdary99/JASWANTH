import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import UserPreferencesComponent from "@/components/settings/user-preferences";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Settings as SettingsIcon, User, Dumbbell, Bell, Target } from "lucide-react";
import type { UserPreferences as UserPreferencesType, UserStats } from "@shared/schema";

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: preferences } = useQuery<UserPreferencesType>({
    queryKey: ["/api/preferences"],
  });

  const { data: userStats } = useQuery<UserStats>({
    queryKey: ["/api/stats"],
  });

  const [localPreferences, setLocalPreferences] = useState(preferences);

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: Partial<UserPreferencesType>) => {
      return apiRequest("PUT", "/api/preferences", updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated.",
      });
    },
  });

  const updateStatsMutation = useMutation({
    mutationFn: async (updates: Partial<UserStats>) => {
      return apiRequest("PUT", "/api/stats", updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Goal updated",
        description: "Your weekly goal has been updated.",
      });
    },
  });

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    const updates = { [key]: value };
    setLocalPreferences(prev => prev ? { ...prev, ...updates } : undefined);
    updatePreferencesMutation.mutate(updates);
  };

  const handleWeeklyGoalChange = (goal: string) => {
    updateStatsMutation.mutate({ weeklyGoal: parseInt(goal) });
  };

  const equipmentOptions = [
    "Bodyweight",
    "Dumbbells", 
    "Barbells",
    "Resistance Bands",
    "Kettlebells",
    "Pull-up Bar",
    "Bench",
    "Cable Machine"
  ];

  const availableEquipment = localPreferences?.availableEquipment || [];

  const handleEquipmentToggle = (equipment: string) => {
    const newEquipment = availableEquipment.includes(equipment)
      ? availableEquipment.filter(e => e !== equipment)
      : [...availableEquipment, equipment];
    
    handlePreferenceChange("availableEquipment", newEquipment);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        {/* Workout Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Dumbbell className="w-5 h-5 mr-2 text-primary-500" />
              Workout Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700 mb-2 block">
                Preferred Difficulty
              </Label>
              <Select 
                value={localPreferences?.preferredDifficulty || "beginner"}
                onValueChange={(value) => handlePreferenceChange("preferredDifficulty", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Available Equipment
              </Label>
              <div className="space-y-2">
                {equipmentOptions.map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment}
                      checked={availableEquipment.includes(equipment)}
                      onCheckedChange={() => handleEquipmentToggle(equipment)}
                    />
                    <Label htmlFor={equipment} className="text-sm text-gray-700">
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-success-500" />
              Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="weekly-goal" className="text-sm font-medium text-gray-700 mb-2 block">
                Weekly Workout Goal
              </Label>
              <Select 
                value={(userStats?.weeklyGoal || 3).toString()}
                onValueChange={handleWeeklyGoalChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 workout per week</SelectItem>
                  <SelectItem value="2">2 workouts per week</SelectItem>
                  <SelectItem value="3">3 workouts per week</SelectItem>
                  <SelectItem value="4">4 workouts per week</SelectItem>
                  <SelectItem value="5">5 workouts per week</SelectItem>
                  <SelectItem value="6">6 workouts per week</SelectItem>
                  <SelectItem value="7">7 workouts per week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <SettingsIcon className="w-5 h-5 mr-2 text-gray-500" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="timer-enabled" className="text-sm font-medium text-gray-700">
                  Exercise Timer
                </Label>
                <p className="text-xs text-gray-500">Show timer during workouts</p>
              </div>
              <Switch
                id="timer-enabled"
                checked={localPreferences?.timerEnabled || false}
                onCheckedChange={(checked) => handlePreferenceChange("timerEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound-enabled" className="text-sm font-medium text-gray-700">
                  Sound Effects
                </Label>
                <p className="text-xs text-gray-500">Play sounds for timers and notifications</p>
              </div>
              <Switch
                id="sound-enabled"
                checked={localPreferences?.soundEnabled || false}
                onCheckedChange={(checked) => handlePreferenceChange("soundEnabled", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="w-5 h-5 mr-2 text-purple-500" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Bodbot Fitness Trainer</strong>
              </p>
              <p>
                A completely free fitness training app with workout routines, 
                exercise library, and progress tracking.
              </p>
              <p className="text-xs text-success-600 font-medium">
                ✓ No login required • No subscriptions • Always free
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Preferences */}
        <UserPreferencesComponent />
      </div>

      <BottomNavigation />
    </div>
  );
}
