import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">💪</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">Bodbot</h1>
        </div>
        <Button variant="ghost" size="sm" className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
}
