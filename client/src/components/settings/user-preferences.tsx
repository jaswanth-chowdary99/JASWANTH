import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UserPreferencesProps {
  preferences?: {
    notifications: boolean;
    units: "metric" | "imperial";
    defaultRest: number;
    weeklyGoal: number;
  };
}

export default function UserPreferences({ preferences }: UserPreferencesProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: preferences?.notifications ?? true,
    units: preferences?.units ?? "metric",
    defaultRest: preferences?.defaultRest ?? 60,
    weeklyGoal: preferences?.weeklyGoal ?? 3,
  });

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="text-sm font-medium">
            Workout Reminders
          </Label>
          <Switch
            id="notifications"
            checked={settings.notifications}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, notifications: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Units</Label>
          <Select 
            value={settings.units} 
            onValueChange={(value: "metric" | "imperial") => 
              setSettings(prev => ({ ...prev, units: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Default Rest Time</Label>
          <Select 
            value={settings.defaultRest.toString()} 
            onValueChange={(value) => 
              setSettings(prev => ({ ...prev, defaultRest: parseInt(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">1 minute</SelectItem>
              <SelectItem value="90">1.5 minutes</SelectItem>
              <SelectItem value="120">2 minutes</SelectItem>
              <SelectItem value="180">3 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Weekly Workout Goal</Label>
          <Select 
            value={settings.weeklyGoal.toString()} 
            onValueChange={(value) => 
              setSettings(prev => ({ ...prev, weeklyGoal: parseInt(value) }))
            }
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
              <SelectItem value="7">Daily workouts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}