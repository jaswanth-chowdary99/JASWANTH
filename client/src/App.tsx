import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ExerciseLibrary from "@/pages/exercise-library";
import Workout from "@/pages/workout";
import Insights from "@/pages/insights";
import Settings from "@/pages/settings";
import Nutrition from "@/pages/nutrition";
import Welcome from "@/pages/welcome";
import CustomWorkout from "@/pages/custom-workout";
import WorkoutHistory from "@/pages/workout-history";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/exercises" component={ExerciseLibrary} />
      <Route path="/workout/:id" component={Workout} />
      <Route path="/insights" component={Insights} />
      <Route path="/nutrition" component={Nutrition} />
      <Route path="/custom-workout" component={CustomWorkout} />
      <Route path="/history" component={WorkoutHistory} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 pb-20">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
