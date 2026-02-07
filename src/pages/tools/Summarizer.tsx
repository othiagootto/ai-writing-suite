import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ToolLayout from '@/components/tools/ToolLayout';
import TextInput from '@/components/tools/TextInput';
import ResultPanel from '@/components/tools/ResultPanel';
import UsageBadge from '@/components/shared/UsageBadge';
import UpgradeModal from '@/components/shared/UpgradeModal';
import { useTool } from '@/hooks/useTool';
import { useTranslation } from '@/hooks/useTranslation';
import { MAX_INPUT_CHARS, SUMMARY_LENGTHS } from '@/lib/constants';
import type { SummaryLength } from '@/types';
import { toast } from 'sonner';

export default function Summarizer() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [length, setLength] = useState<SummaryLength>('medium');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, reset, canUse, remaining } = useTool('summarizer');

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error(t('summarizer.enterText'));
      return;
    }

    if (!canUse) {
      setShowUpgrade(true);
      return;
    }

    await execute(text, { length });
  };

  const inputPanel = (
    <div className="space-y-6">
      <UsageBadge remaining={remaining} total={3} />
      <TextInput
        value={text}
        onChange={setText}
        placeholder={t('summarizer.placeholder')}
        maxLength={MAX_INPUT_CHARS}
      />
      <div className="space-y-3">
        <Label className="text-sm font-semibold">{t('summarizer.lengthLabel')}</Label>
        <ToggleGroup
          type="single"
          value={length}
          onValueChange={(val) => val && setLength(val as SummaryLength)}
          className="grid grid-cols-3 gap-2"
        >
          {SUMMARY_LENGTHS.map((len) => (
            <ToggleGroupItem
              key={len.id}
              value={len.id}
              className="flex flex-col items-center h-auto p-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <span className="font-medium text-sm">{t(`summarizer.length.${len.id}.label`)}</span>
              <span className="text-xs opacity-70 mt-1">{t(`summarizer.length.${len.id}.desc`)}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Button
        onClick={handleSummarize}
        disabled={isLoading || !text.trim()}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        {t('summarizer.submit')}
      </Button>
    </div>
  );

  const outputPanel = (
    <div className="space-y-6">
      <ResultPanel
        isLoading={isLoading}
        error={error}
        result={result?.result || null}
        onRetry={reset}
      />
      {result && (
        <>
          {result.highlights && result.highlights.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">{t('summarizer.keyPoints')}</h3>
              <ul className="space-y-2">
                {result.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground leading-relaxed">
                      {highlight.message || highlight.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.score !== undefined && (
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t('summarizer.compressionRatio')}</span>
                <Badge variant="outline">{Math.round(result.score)}%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {t('summarizer.compressionDesc', { score: Math.round(result.score) })}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <ToolLayout
        title={t('tools.summarizer.name')}
        description={t('tools.summarizer.description')}
        icon="FileText"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
