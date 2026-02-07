import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function AIDetector() {
  const [text, setText] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, canUse, remaining } = useTool('detector');
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    if (!canUse) {
      setShowUpgrade(true);
      return;
    }

    await execute(text);
  };

  const handleHumanize = () => {
    navigate(`/tools/humanizer?text=${encodeURIComponent(text)}`);
  };

  const inputPanel = (
    <div className="space-y-6">
      <UsageBadge remaining={remaining} total={3} />
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Paste your text here to check if it was written by AI..."
        maxLength={MAX_INPUT_CHARS}
      />
      <Button
        onClick={handleAnalyze}
        disabled={isLoading || !text.trim()}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        Analyze Text
      </Button>
    </div>
  );

  const outputPanel = (
    <>
      {isLoading && (
        <div className="rounded-lg border border-border bg-card p-6">
          <LoadingSpinner />
          <p className="text-center text-sm text-muted-foreground mt-4">
            Analyzing text for AI patterns...
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
            <p className="text-sm">Analysis results will appear here</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <ScoreDisplay
            score={result.score || 0}
            label="AI Detection Score"
            type="ai-detection"
          />

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-3">Summary</h3>
            <p className="text-foreground leading-relaxed mb-4">{result.result}</p>

            {result.highlights && result.highlights.length > 0 && (
              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-sm">Detected Patterns</h4>
                {result.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="mt-0.5">
                      {Math.round(highlight.confidence * 100)}%
                    </Badge>
                    <span className="text-foreground">{highlight.message || highlight.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {result.score && result.score > 50 && (
            <Button
              onClick={handleHumanize}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Humanize This Text
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      <ToolLayout
        title="AI Detector"
        description="Analyze text to determine if it was written by AI"
        icon="ScanSearch"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
