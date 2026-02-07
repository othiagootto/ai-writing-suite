import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-foreground to-foreground/70">
            <Sparkles className="w-6 h-6 text-background" />
          </div>
          <DialogTitle className="text-center text-xl">
            {t('upgrade.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('upgrade.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            onClick={() => {
              onOpenChange(false);
              navigate('/pricing');
            }}
            className="w-full"
          >
            {t('common.seePlans')}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            {t('common.maybeLater')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
