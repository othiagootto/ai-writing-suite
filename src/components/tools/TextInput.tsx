import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export default function TextInput({
  value,
  onChange,
  placeholder = 'Enter your text here...',
  maxLength = 10000,
  className,
}: TextInputProps) {
  const { t } = useTranslation();
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.9;

  return (
    <div className="space-y-2">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={cn(
            'min-h-[300px] resize-none focus-visible:ring-1 focus-visible:ring-ring',
            className
          )}
        />
        {value && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className={cn('text-muted-foreground', isNearLimit && 'text-orange-600 dark:text-orange-400 font-medium')}>
          {charCount.toLocaleString()} / {maxLength.toLocaleString()} {t('common.characters')}
        </span>
      </div>
    </div>
  );
}
