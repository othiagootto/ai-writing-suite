import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ToolLayout from '@/components/tools/ToolLayout';
import TextInput from '@/components/tools/TextInput';
import ScoreDisplay from '@/components/tools/ScoreDisplay';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import UsageBadge from '@/components/shared/UsageBadge';
import UpgradeModal from '@/components/shared/UpgradeModal';
import { useTool } from '@/hooks/useTool';
import { MAX_INPUT_CHARS } from '@/lib/constants';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function GrammarChecker() {
  const [text, setText] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, canUse, remaining } = useTool('grammar');

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleCheck = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to check');
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
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Paste or type your text here to check for grammar and spelling errors..."
        maxLength={MAX_INPUT_CHARS}
      />
      <Button
        onClick={handleCheck}
        disabled={isLoading || !text.trim()}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        Check Grammar
      </Button>
    </div>
  );

  const outputPanel = (
    <>
      {isLoading && (
        <div className="rounded-lg border border-border bg-card p-6">
          <LoadingSpinner />
          <p className="text-center text-sm text-muted-foreground mt-4">
            Checking grammar and spelling...
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive mb-1">Error</h3>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !error && !result && (
        <div className="rounded-lg border border-border bg-muted p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Check results will appear here</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {result.score !== undefined && (
            <ScoreDisplay
              score={result.score}
              label="Writing Quality Score"
              type="quality"
            />
          )}

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Corrected Text
            </h3>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {result.result}
            </p>
          </div>

          {result.corrections && result.corrections.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">
                Corrections ({result.corrections.length})
              </h3>
              <div className="space-y-4">
                {result.corrections.map((correction, idx) => (
                  <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs',
                              correction.type === 'spelling' && 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
                              correction.type === 'grammar' && 'bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
                              correction.type === 'punctuation' && 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
                              correction.type === 'style' && 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                            )}
                          >
                            {correction.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground mb-1">{correction.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-600 dark:text-red-400 line-through">{correction.original}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">{correction.corrected}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.corrections && result.corrections.length === 0 && (
            <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-green-700 dark:text-green-400 font-medium">
                  Great! No grammar or spelling errors found.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      <ToolLayout
        title="Grammar Checker"
        description="Find and fix grammar, spelling, and style errors"
        icon="SpellCheck"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
