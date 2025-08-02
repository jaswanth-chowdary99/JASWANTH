import { useState, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Exercise } from "@shared/schema";

interface TimerProps {
  exercise: Exercise | null;
  isActive: boolean;
  onComplete?: () => void;
  onNext?: () => void;
  onPause?: () => void;
}

export default function Timer({ 
  exercise, 
  isActive, 
  onComplete, 
  onNext, 
  onPause 
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    onPause?.();
  };

  if (!isActive || !exercise) return null;

  return (
    <section className="max-w-md mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-2xl p-6 text-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Exercise Timer</h3>
          <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <p className="text-green-100 mb-4">{exercise.name}</p>
          
          <div className="flex space-x-3 justify-center">
            <Button
              variant="ghost"
              className="bg-white/20 hover:bg-white/30 rounded-xl px-6 py-2 font-medium text-white"
              onClick={handlePause}
            >
              {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              className="bg-white text-success-600 hover:bg-gray-50 rounded-xl px-6 py-2 font-medium"
              onClick={onNext}
            >
              Next <SkipForward className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
