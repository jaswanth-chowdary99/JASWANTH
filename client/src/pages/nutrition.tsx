import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Utensils, TrendingUp } from "lucide-react";

export default function Nutrition() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Nutrition</h1>

        {/* Coming Soon Card */}
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Apple className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nutrition Tracking
            </h2>
            <p className="text-gray-600 mb-4">
              Track your meals, calories, and nutrition goals. This feature is coming soon!
            </p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                ✓ Completely free, no subscriptions<br/>
                ✓ Meal logging and tracking<br/>
                ✓ Nutrition insights and goals
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Utensils className="w-5 h-5 mr-2 text-success-500" />
              Quick Nutrition Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Stay Hydrated</p>
                  <p className="text-xs text-gray-500">Aim for 8 glasses of water daily</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Balanced Meals</p>
                  <p className="text-xs text-gray-500">Include protein, carbs, and healthy fats</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Post-Workout Fuel</p>
                  <p className="text-xs text-gray-500">Eat within 30 minutes after exercise</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}