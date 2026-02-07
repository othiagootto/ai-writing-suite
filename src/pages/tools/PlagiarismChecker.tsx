import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ToolLayout from '@/components/tools/ToolLayout';
import TextInput from '@/components/tools/TextInput';
import ScoreDisplay from '@/components/tools/ScoreDisplay';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import UsageBadge from '@/components/shared/UsageBadge';
import UpgradeModal from '@/components/shared/UpgradeModal';
import { useTool } from '@/hooks/useTool';
import { useTranslation } from '@/hooks/useTranslation';
import { MAX_INPUT_CHARS } from '@/lib/constants';
import { AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function PlagiarismChecker() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, canUse, remaining } = useTool('plagiarism');

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleCheck = async () => {
    if (!text.trim()) {
      toast.error(t('plagiarism.enterText'));
      return;
    }

    if (!canUse) {
      setShowUpgrade(true);
      return;
    }

    await execute(text);
  };

  const inputPanel = (
    <div className="space-y-6">
      <UsageBadge remaining={remaining} total={3} />
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-medium mb-1">{t('plagiarism.note.title')}</p>
            <p className="text-blue-700 dark:text-blue-400">
              {t('plagiarism.note.desc')}
            </p>
          </div>
        </div>
      </div>
      <TextInput
        value={text}
        onChange={setText}
        placeholder={t('plagiarism.placeholder')}
        maxLength={MAX_INPUT_CHARS}
      />
      <Button
        onClick={handleCheck}
        disabled={isLoading || !text.trim()}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        {t('plagiarism.submit')}
      </Button>
    </div>
  );

  const outputPanel = (
    <>
      {isLoading && (
        <div className="rounded-lg border border-border bg-card p-6">
          <LoadingSpinner />
          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('plagiarism.analyzing')}
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive mb-1">{t('common.error')}</h3>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && !result && (
        <div className="rounded-lg border border-border bg-muted p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">{t('plagiarism.emptyResult')}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <ScoreDisplay
            score={result.score || 0}
            label={t('plagiarism.scoreLabel')}
            type="originality"
          />

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-3">{t('plagiarism.summary')}</h3>
            <p className="text-foreground leading-relaxed">{result.result}</p>
          </div>

          {result.highlights && result.highlights.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">{t('plagiarism.suggestions')}</h3>
              <ul className="space-y-3">
                {result.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center text-xs font-medium">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground leading-relaxed">
                      {highlight.message || t('plagiarism.defaultSuggestion')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      <ToolLayout
        title={t('tools.plagiarism.name')}
        description={t('tools.plagiarism.description')}
        icon="ShieldCheck"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
