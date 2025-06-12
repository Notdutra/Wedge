import React from "react";

export const HowToCard = React.memo(function HowToCard() {
  return (
    <div className="border-neutral-200 bg-white rounded shadow-sm p-4 mb-4">
      <h2 className="text-base font-medium text-neutral-900 mb-2">
        Quick Guide
      </h2>
      <ol className="text-sm text-neutral-700 space-y-2 list-decimal pl-4">
        <li>Choose an item from the elements section.</li>
        <li>Click anywhere on the floor to add it.</li>
        <li>Drag to move things around.</li>
        <li>Click an item to edit or remove it.</li>
        <li>
          Click outside the canvas or press <kbd>Esc</kbd> to stop adding.
        </li>
        <li>Click "Save & Return" when finished.</li>
      </ol>
    </div>
  );
});
