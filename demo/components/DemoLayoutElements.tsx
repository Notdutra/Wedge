interface DemoLayoutElementsProps {
  isDemoMode: boolean;
}

export function DemoLayoutElements({ isDemoMode }: DemoLayoutElementsProps) {
  if (!isDemoMode) return null;

  return (
    <>
      {/* Kitchen Area */}
      <div className="absolute top-4 right-4 w-24 h-16 bg-neutral-200 rounded border-2 border-dashed border-neutral-400 flex items-center justify-center">
        <span className="text-xs text-neutral-600">Kitchen</span>
      </div>

      {/* Bar Area */}
      <div className="absolute bottom-4 left-4 w-32 h-12 bg-orange-100 rounded border-2 border-orange-300 flex items-center justify-center">
        <span className="text-xs text-orange-700">Bar</span>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg border border-neutral-200 shadow-sm">
        <h4 className="text-xs font-medium text-neutral-900 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span className="text-xs text-neutral-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-xs text-neutral-600">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-xs text-neutral-600">Reserved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-xs text-neutral-600">Cleaning</span>
          </div>
        </div>
      </div>
    </>
  );
}
