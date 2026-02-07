import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

interface UsageBadgeProps {
  remaining: number;
  total: number;
}

export default function UsageBadge({ remaining, total }: UsageBadgeProps) {
  const { t } = useTranslation();

  if (remaining === Infinity) {
    return (
      <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
        {t('usage.unlimited')}
      </Badge>
    );
  }

  const percentage = (remaining / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-muted">
          {t('usage.remaining', { remaining, total })}
        </Badge>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
}
