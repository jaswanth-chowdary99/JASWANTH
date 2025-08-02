import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ExerciseFiltersProps {
  selectedCategory: string;
  selectedEquipment: string;
  selectedDifficulty: string;
  onCategoryChange: (value: string) => void;
  onEquipmentChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function ExerciseFilters({
  selectedCategory,
  selectedEquipment,
  selectedDifficulty,
  onCategoryChange,
  onEquipmentChange,
  onDifficultyChange,
  onClearFilters,
}: ExerciseFiltersProps) {
  const hasFilters = selectedCategory !== "all" || selectedEquipment !== "all" || selectedDifficulty !== "all";

  return (
    <div className="bg-white border-b border-gray-100 p-4">
      <div className="flex flex-wrap gap-3 mb-3">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="strength">Strength</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
            <SelectItem value="flexibility">Flexibility</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedEquipment} onValueChange={onEquipmentChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Equipment</SelectItem>
            <SelectItem value="bodyweight">Bodyweight</SelectItem>
            <SelectItem value="dumbbells">Dumbbells</SelectItem>
            <SelectItem value="barbell">Barbell</SelectItem>
            <SelectItem value="resistance_bands">Resistance Bands</SelectItem>
            <SelectItem value="machine">Machine</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {selectedCategory}
                <button
                  onClick={() => onCategoryChange("all")}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedEquipment !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {selectedEquipment.replace("_", " ")}
                <button
                  onClick={() => onEquipmentChange("all")}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedDifficulty !== "all" && (
              <Badge variant="secondary" className="text-xs">
                {selectedDifficulty}
                <button
                  onClick={() => onDifficultyChange("all")}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs">
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}