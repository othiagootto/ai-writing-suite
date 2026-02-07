import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, Send, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { TOOLS } from '@/lib/constants';
import { useTranslation } from '@/hooks/useTranslation';

interface ResultPanelProps {
  isLoading: boolean;
  error: string | null;
  result: string | null;
  onRetry?: () => void;
  className?: string;
}

export default function ResultPanel({
  isLoading,
  error,
  result,
  onRetry,
  className,
}: ResultPanelProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(result);
      toast.success(t('common.copiedToClipboard'));
    } catch {
      toast.error(t('common.failedToCopy'));
    } finally {
      setCopying(false);
    }
  };

  const handleSendTo = (toolPath: string) => {
    if (!result) return;
    navigate(`${toolPath}?text=${encodeURIComponent(result)}`);
    toast.success(t('common.textSentToTool'));
  };

  if (isLoading) {
    return (
      <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
        <LoadingSpinner />
        <p className="text-center text-sm text-muted-foreground mt-4">{t('common.processing')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('rounded-lg border border-destructive/20 bg-destructive/10 p-6', className)}>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-destructive mb-1">{t('common.error')}</h3>
            <p className="text-sm text-destructive/80">{error}</p>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="mt-4 border-destructive/30 hover:bg-destructive/20"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('common.tryAgain')}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={cn('rounded-lg border border-border bg-muted p-12', className)}>
        <div className="text-center text-muted-foreground">
          <p className="text-sm">{t('common.resultsWillAppear')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-sm">{t('common.result')}</h3>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            disabled={copying}
          >
            <Copy className="h-4 w-4 mr-2" />
            {copying ? t('common.copied') : t('common.copy')}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Send className="h-4 w-4 mr-2" />
                {t('common.sendTo')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {TOOLS.filter((tool) => tool.id !== 'chat' && tool.id !== 'citation').map((tool) => (
                <DropdownMenuItem
                  key={tool.id}
                  onClick={() => handleSendTo(tool.path)}
                >
                  {t(tool.nameKey)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-6">
        <p className="whitespace-pre-wrap text-foreground leading-relaxed">{result}</p>
      </div>
    </div>
  );
}
