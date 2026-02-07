import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { INTENSITIES } from '@/lib/constants';
import type { Intensity } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface IntensitySliderProps {
  value: Intensity;
  onChange: (value: Intensity) => void;
}

export default function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">{t('paraphraser.intensity.label')}</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && onChange(val as Intensity)}
        className="grid grid-cols-3 gap-2"
      >
        {INTENSITIES.map((intensity) => (
          <ToggleGroupItem
            key={intensity.id}
            value={intensity.id}
            className="flex flex-col items-center h-auto p-3 data-[state=on]:bg-black data-[state=on]:text-white"
          >
            <span className="font-medium text-sm">{t(`paraphraser.intensity.${intensity.id}.label`)}</span>
            <span className="text-xs opacity-70 mt-1">{t(`paraphraser.intensity.${intensity.id}.desc`)}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
