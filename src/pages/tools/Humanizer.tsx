import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ToolLayout from '@/components/tools/ToolLayout';
import TextInput from '@/components/tools/TextInput';
import ModeSelector from '@/components/tools/ModeSelector';
import ResultPanel from '@/components/tools/ResultPanel';
import UsageBadge from '@/components/shared/UsageBadge';
import UpgradeModal from '@/components/shared/UpgradeModal';
import { useTool } from '@/hooks/useTool';
import { MAX_INPUT_CHARS } from '@/lib/constants';
import type { HumanizerMode } from '@/types';
import { toast } from 'sonner';

export default function Humanizer() {
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('');
  const [mode, setMode] = useState<HumanizerMode>('auto');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, reset, canUse, remaining } = useTool('humanizer');

  // Prefill from URL
  useEffect(() => {
    const prefilledText = searchParams.get('text');
    if (prefilledText) {
      setText(prefilledText);
      toast.success('Text loaded from previous tool');
    }
  }, [searchParams]);

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleHumanize = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to humanize');
      return;
    }

    if (!canUse) {
      setShowUpgrade(true);
      return;
    }

    await execute(text, { mode });
  };

  const inputPanel = (
    <div className="space-y-6">
      <UsageBadge remaining={remaining} total={3} />
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Paste AI-generated text here to make it sound more human..."
        maxLength={MAX_INPUT_CHARS}
      />
      <ModeSelector value={mode} onChange={setMode} />
      <Button
        onClick={handleHumanize}
        disabled={isLoading || !text.trim()}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        Humanize Text
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
      {result?.score !== undefined && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Similarity to Original</span>
            <Badge variant="outline">{Math.round(result.score)}%</Badge>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <ToolLayout
        title="AI Humanizer"
        description="Rewrite AI-generated text to sound naturally human"
        icon="UserPen"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
