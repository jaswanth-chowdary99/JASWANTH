import { useState } from "react";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Exercise } from "@shared/schema";

interface ExerciseModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onStartExercise?: (exercise: Exercise) => void;
}

export default function ExerciseModal({ 
  exercise, 
  isOpen, 
  onClose, 
  onStartExercise 
}: ExerciseModalProps) {
  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto h-full max-h-screen overflow-y-auto rounded-t-3xl border-0 p-0" aria-describedby="exercise-description">
        <DialogHeader className="sticky top-0 bg-white border-b border-gray-100 p-4 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {exercise.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-600" />
          </Button>
        </DialogHeader>
        
        <div className="p-4">
          <div id="exercise-description" className="sr-only">
            Exercise details and instructions for {exercise.name}
          </div>
          {/* Exercise Video/Image Placeholder */}
          <div className="w-full h-48 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center">
            <div className="text-center">
              <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Tap to play video</p>
            </div>
          </div>

          {/* Exercise Performance Info */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Performance</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-500">Sets</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">12-15</div>
                <div className="text-xs text-gray-500">Reps</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">60s</div>
                <div className="text-xs text-gray-500">Rest</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
            <div className="space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-6">
            <Button 
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 rounded-2xl"
              onClick={() => onStartExercise?.(exercise)}
            >
              Start Exercise
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
