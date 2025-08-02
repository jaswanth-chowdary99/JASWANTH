import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Heart, Zap, Trophy, ArrowRight, CheckCircle } from "lucide-react";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: Dumbbell,
      title: "Complete Exercise Library",
      description: "Hundreds of exercises with detailed instructions and video guides",
      color: "bg-primary-50 text-primary-500"
    },
    {
      icon: Heart,
      title: "Personalized Workouts",
      description: "Tailored workout plans based on your fitness level and equipment",
      color: "bg-success-50 text-success-500"
    },
    {
      icon: Zap,
      title: "Progress Tracking",
      description: "Track your workouts, streaks, and fitness journey over time",
      color: "bg-orange-50 text-orange-500"
    },
    {
      icon: Trophy,
      title: "Always Free",
      description: "No subscriptions, no premium features, no hidden costs ever",
      color: "bg-purple-50 text-purple-500"
    }
  ];

  const steps = [
    {
      title: "Welcome to Bodbot",
      description: "Your personal fitness trainer that's completely free"
    },
    {
      title: "No Subscriptions",
      description: "Unlike other fitness apps, Bodbot is free forever with no premium features"
    },
    {
      title: "Get Started",
      description: "Ready to begin your fitness journey? Let's go!"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLocation("/");
    }
  };

  const handleSkip = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 text-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Bodbot</h1>
          <p className="text-blue-100">Free Fitness Trainer</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">{steps[currentStep].title}</h2>
          <p className="text-blue-100 text-lg">{steps[currentStep].description}</p>
        </div>

        {/* Features Grid (only on first step) */}
        {currentStep === 0 && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-white">{feature.title}</h3>
                  <p className="text-xs text-blue-100">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Free Features Highlight (step 1) */}
        {currentStep === 1 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success-300" />
                <span className="text-white">All exercises completely free</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success-300" />
                <span className="text-white">No login or registration required</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success-300" />
                <span className="text-white">Full access to all workouts</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-success-300" />
                <span className="text-white">Progress tracking included</span>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-white text-primary-600 font-semibold py-4 rounded-2xl hover:bg-gray-50 text-lg"
          >
            {currentStep === steps.length - 1 ? (
              <>Start Training <ArrowRight className="w-5 h-5 ml-2" /></>
            ) : (
              <>Continue <ArrowRight className="w-5 h-5 ml-2" /></>
            )}
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-white/80 hover:text-white hover:bg-white/10 py-3 rounded-xl"
          >
            Skip Introduction
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-blue-200">
            Made with ❤️ for the fitness community
          </p>
        </div>
      </div>
    </div>
  );
}