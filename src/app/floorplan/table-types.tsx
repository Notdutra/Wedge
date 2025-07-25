import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { useRouter } from "next/navigation";

// TableType definition (should match the main app)
type TableType = {
  id: number;
  label: string;
  seats: number;
  shape: "square" | "rectangle";
  width: number;
  height: number;
  color: string;
  count: number;
};

// TODO: Load/save table types from persistent storage or context
const initialTableTypes: TableType[] = [
  {
    id: 1,
    label: "2-seat (square)",
    seats: 2,
    shape: "square",
    width: 48,
    height: 48,
    color: "#bef264",
    count: 0,
  },
  {
    id: 2,
    label: "4-seat (rectangle)",
    seats: 4,
    shape: "rectangle",
    width: 72,
    height: 40,
    color: "#86efac",
    count: 0,
  },
];

export default function TableTypesPage() {
  const [tableTypes, setTableTypes] = useState<TableType[]>(initialTableTypes);
  const router = useRouter();

  const handleSave = () => {
    // TODO: Persist tableTypes to global state or backend
    router.push("/floorplan");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Table Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-2 text-xs font-semibold text-neutral-500 mb-1">
              <span>Color</span>
              <span>Label</span>
              <span>Seats</span>
              <span>Width</span>
              <span>Height</span>
              <span>Delete</span>
            </div>
            {tableTypes.map((type, idx) => (
              <div
                key={type.id}
                className="grid grid-cols-6 gap-2 items-center"
              >
                <input
                  type="color"
                  value={type.color}
                  onChange={(e) =>
                    setTableTypes((tts) =>
                      tts.map((t, i) =>
                        i === idx ? { ...t, color: e.target.value } : t,
                      ),
                    )
                  }
                  className="w-8 h-8 border rounded"
                  aria-label="Table color"
                />
                <input
                  type="text"
                  value={type.label}
                  onChange={(e) =>
                    setTableTypes((tts) =>
                      tts.map((t, i) =>
                        i === idx ? { ...t, label: e.target.value } : t,
                      ),
                    )
                  }
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="e.g. 2-seat (square)"
                  aria-label="Table label"
                />
                <input
                  type="number"
                  min={1}
                  value={type.seats}
                  onChange={(e) =>
                    setTableTypes((tts) =>
                      tts.map((t, i) =>
                        i === idx
                          ? { ...t, seats: parseInt(e.target.value, 10) || 1 }
                          : t,
                      ),
                    )
                  }
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Seats"
                  aria-label="Seats"
                />
                <input
                  type="number"
                  min={24}
                  value={type.width}
                  onChange={(e) =>
                    setTableTypes((tts) =>
                      tts.map((t, i) =>
                        i === idx
                          ? { ...t, width: parseInt(e.target.value, 10) || 24 }
                          : t,
                      ),
                    )
                  }
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Width"
                  aria-label="Width"
                />
                <input
                  type="number"
                  min={16}
                  value={type.height}
                  onChange={(e) =>
                    setTableTypes((tts) =>
                      tts.map((t, i) =>
                        i === idx
                          ? { ...t, height: parseInt(e.target.value, 10) || 16 }
                          : t,
                      ),
                    )
                  }
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Height"
                  aria-label="Height"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500"
                  onClick={() =>
                    setTableTypes((tts) => tts.filter((_, i) => i !== idx))
                  }
                  aria-label="Delete table type"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={() =>
              setTableTypes((tts) => [
                ...tts,
                {
                  id: Date.now(),
                  label: "",
                  seats: 2,
                  shape: "square",
                  width: 48,
                  height: 48,
                  color: "#fef08a",
                  count: 0,
                },
              ])
            }
            variant="outline"
          >
            + Add Table Type
          </Button>
          <div className="flex gap-2 mt-8">
            <Button onClick={handleSave} className="flex-1">
              Save & Return
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/floorplan")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
