import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Search, BarChart3, Plus } from "lucide-react";

export default function QuickActions() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/exercises">
            <Button variant="outline" className="w-full h-16 flex-col space-y-1">
              <Search className="w-5 h-5" />
              <span className="text-xs">Browse Exercises</span>
            </Button>
          </Link>
          
          <Link href="/custom-workout">
            <Button variant="outline" className="w-full h-16 flex-col space-y-1">
              <Plus className="w-5 h-5" />
              <span className="text-xs">Custom Workout</span>
            </Button>
          </Link>
          
          <Link href="/insights">
            <Button variant="outline" className="w-full h-16 flex-col space-y-1">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">View Progress</span>
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full h-16 flex-col space-y-1">
            <Play className="w-5 h-5" />
            <span className="text-xs">Quick Start</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}