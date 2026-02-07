import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy } from 'lucide-react';
import ToolLayout from '@/components/tools/ToolLayout';
import UsageBadge from '@/components/shared/UsageBadge';
import UpgradeModal from '@/components/shared/UpgradeModal';
import { useTool } from '@/hooks/useTool';
import { useTranslation } from '@/hooks/useTranslation';
import { CITATION_FORMATS } from '@/lib/constants';
import type { CitationFormat } from '@/types';
import { toast } from 'sonner';

interface CitationFormData {
  title: string;
  authors: string;
  date: string;
  url: string;
  publisher: string;
  type: 'book' | 'article' | 'website';
}

export default function CitationGenerator() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CitationFormData>({
    title: '',
    authors: '',
    date: '',
    url: '',
    publisher: '',
    type: 'article',
  });
  const [format, setFormat] = useState<CitationFormat>('apa');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { result, isLoading, error, execute, canUse, remaining } = useTool('citation');

  useEffect(() => {
    if (error && error.includes('limit')) {
      setShowUpgrade(true);
    }
  }, [error]);

  const handleGenerate = async () => {
    if (!formData.title || !formData.authors) {
      toast.error(t('citation.enterTitleAuthors'));
      return;
    }

    if (!canUse) {
      setShowUpgrade(true);
      return;
    }

    const inputText = JSON.stringify(formData);
    await execute(inputText, { format });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('common.copiedToClipboard'));
    } catch {
      toast.error(t('common.failedToCopy'));
    }
  };

  const inputPanel = (
    <div className="space-y-6">
      <UsageBadge remaining={remaining} total={3} />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="type">{t('citation.sourceType')}</Label>
          <Select
            value={formData.type}
            onValueChange={(val) => setFormData({ ...formData, type: val as 'book' | 'article' | 'website' })}
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="book">{t('citation.sourceBook')}</SelectItem>
              <SelectItem value="article">{t('citation.sourceArticle')}</SelectItem>
              <SelectItem value="website">{t('citation.sourceWebsite')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">{t('citation.titleLabel')}</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={t('citation.titlePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authors">{t('citation.authorsLabel')}</Label>
          <Input
            id="authors"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
            placeholder={t('citation.authorsPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">{t('citation.dateLabel')}</Label>
          <Input
            id="date"
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder={t('citation.datePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher">{t('citation.publisherLabel')}</Label>
          <Input
            id="publisher"
            value={formData.publisher}
            onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            placeholder={t('citation.publisherPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">{t('citation.urlLabel')}</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('citation.formatLabel')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {CITATION_FORMATS.map((fmt) => (
            <Button
              key={fmt.id}
              variant={format === fmt.id ? 'default' : 'outline'}
              className={format === fmt.id ? 'bg-primary hover:bg-primary/90' : ''}
              onClick={() => setFormat(fmt.id as CitationFormat)}
            >
              <div className="text-left">
                <div className="font-medium">{t(`citation.format.${fmt.id}.label`)}</div>
                <div className="text-xs opacity-70">{t(`citation.format.${fmt.id}.desc`)}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isLoading || !formData.title || !formData.authors}
        className="w-full bg-primary hover:bg-primary/90"
        size="lg"
      >
        {t('citation.submit')}
      </Button>
    </div>
  );

  const outputPanel = (
    <>
      {!result && !isLoading && !error && (
        <div className="rounded-lg border border-border bg-muted p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">{t('citation.emptyResult')}</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="rounded-lg border border-border bg-card p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">{t('citation.generating')}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-sm">{t('citation.fullCitation')}</h3>
              <Button
                onClick={() => handleCopy(result.result)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t('common.copy')}
              </Button>
            </div>
            <div className="p-6">
              <p className="text-foreground leading-relaxed">{result.result}</p>
            </div>
          </div>

          {result.highlights && result.highlights.length > 0 && result.highlights[0].message && (
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-sm">{t('citation.inTextCitation')}</h3>
                <Button
                  onClick={() => handleCopy(result.highlights![0].message || '')}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t('common.copy')}
                </Button>
              </div>
              <div className="p-6">
                <p className="text-foreground leading-relaxed">
                  {result.highlights[0].message}
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
        title={t('tools.citation.name')}
        description={t('tools.citation.description')}
        icon="Quote"
        inputPanel={inputPanel}
        outputPanel={outputPanel}
      />
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
