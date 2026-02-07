import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ToolLayout from '@/components/tools/ToolLayout';
import TextInput from '@/components/tools/TextInput';
import ToneSelector from '@/components/tools/ToneSelector';
import IntensitySlider from '@/components/tools/IntensitySlider';
import ResultPanel from '@/components/tools/ResultPanel';
import UsageBadge from '@/components/shared/UsageBadge';
import UpgradeModal from '@/components/shared/UpgradeModal';
import { useTool } from '@/hooks/useTool';
import { MAX_INPUT_CHARS } from '@/lib/constants';
import type { Tone, Intensity } from '@/types';
import { toast } from 'sonner';

export default function Paraphraser() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState<Tone>('neutral');
  const [intensity, setIntensity] = useState<Intensity>('moderate');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, reset, canUse, remaining } = useTool('paraphraser');

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleParaphrase = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to paraphrase');
      return;
    }

    if (!canUse) {
      setShowUpgrade(true);
      return;
    }

    await execute(text, { tone, intensity });
  };

  const inputPanel = (
    <div className="space-y-6">
      <UsageBadge remaining={remaining} total={3} />
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Enter the text you want to paraphrase..."
        maxLength={MAX_INPUT_CHARS}
      />
      <ToneSelector value={tone} onChange={setTone} />
      <IntensitySlider value={intensity} onChange={setIntensity} />
      <Button
        onClick={handleParaphrase}
        disabled={isLoading || !text.trim()}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        Paraphrase Text
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
            <span className="text-sm font-medium text-foreground">Text Changed</span>
            <Badge variant="outline">{Math.round(result.score)}%</Badge>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <ToolLayout
        title="Paraphraser"
        description="Rewrite text with different tone and intensity"
        icon="RefreshCw"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
