import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TONES } from '@/lib/constants';
import type { Tone } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface ToneSelectorProps {
  value: Tone;
  onChange: (value: Tone) => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">{t('paraphraser.tone.label')}</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => val && onChange(val as Tone)}
        className="grid grid-cols-2 gap-2"
      >
        {TONES.map((tone) => {
          const toneKey = tone.id === 'remove-plagiarism' ? 'removePlagiarism' : tone.id;
          return (
            <ToggleGroupItem
              key={tone.id}
              value={tone.id}
              className="flex flex-col items-start h-auto p-3 text-left data-[state=on]:bg-black data-[state=on]:text-white"
            >
              <span className="font-medium text-sm">{t(`paraphraser.tone.${toneKey}.label`)}</span>
              <span className="text-xs opacity-70 mt-1">{t(`paraphraser.tone.${toneKey}.desc`)}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
