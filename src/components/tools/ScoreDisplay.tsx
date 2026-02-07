import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  score: number;
  label: string;
  type?: 'ai-detection' | 'originality' | 'quality';
  className?: string;
}

export default function ScoreDisplay({
  score,
  label,
  type = 'ai-detection',
  className,
}: ScoreDisplayProps) {
  const getColorClass = () => {
    if (type === 'ai-detection') {
      // Green for low AI (0-30), Yellow for medium (31-70), Red for high (71-100)
      if (score <= 30) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      if (score <= 70) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
    }

    if (type === 'originality' || type === 'quality') {
      // Green for high score (71-100), Yellow for medium (31-70), Red for low (0-30)
      if (score >= 71) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      if (score >= 31) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
    }

    return 'text-muted-foreground bg-muted border-border';
  };

  const getProgressColor = () => {
    if (type === 'ai-detection') {
      if (score <= 30) return 'bg-green-500';
      if (score <= 70) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    if (type === 'originality' || type === 'quality') {
      if (score >= 71) return 'bg-green-500';
      if (score >= 31) return 'bg-yellow-500';
      return 'bg-red-500';
    }

    return 'bg-muted-foreground';
  };

  return (
    <div className={cn('rounded-lg border p-6', getColorClass(), className)}>
      <div className="text-center">
        <div className="text-5xl font-bold mb-2">{Math.round(score)}%</div>
        <div className="text-sm font-medium mb-4">{label}</div>
        <div className="relative">
          <Progress value={score} className="h-2" />
          <style>{`
            .score-progress [role="progressbar"] > div {
              background-color: ${getProgressColor()};
            }
          `}</style>
          <div className="score-progress">
            <Progress value={score} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
