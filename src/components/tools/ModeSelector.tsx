import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HUMANIZER_MODES } from '@/lib/constants';
import type { HumanizerMode } from '@/types';

interface ModeSelectorProps {
  value: HumanizerMode;
  onChange: (value: HumanizerMode) => void;
}

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">Humanizer Mode</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && onChange(val as HumanizerMode)}
        className="grid grid-cols-1 gap-2"
      >
        {HUMANIZER_MODES.map((mode) => (
          <ToggleGroupItem
            key={mode.id}
            value={mode.id}
            className="flex flex-col items-start h-auto p-3 text-left data-[state=on]:bg-black data-[state=on]:text-white"
          >
            <span className="font-medium text-sm">{mode.label}</span>
            <span className="text-xs opacity-70 mt-1">{mode.description}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
