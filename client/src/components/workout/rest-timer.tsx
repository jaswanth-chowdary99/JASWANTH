import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

interface RestTimerProps {
  restSeconds: number;
  onComplete?: () => void;
  onSkip?: () => void;
  isActive?: boolean;
}

export default function RestTimer({ restSeconds, onComplete, onSkip, isActive = false }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(restSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(restSeconds);
    setIsRunning(isActive);
  }, [restSeconds, isActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(restSeconds);
  };

  const handleSkip = () => {
    setIsRunning(false);
    setTimeLeft(0);
    onSkip?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((restSeconds - timeLeft) / restSeconds) * 100;

  if (!isActive) return null;

  return (
    <Card className="bg-orange-50 border-orange-200">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Rest Time</h3>
          <div className="text-4xl font-bold text-orange-700 mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2 mb-4">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkip}
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}