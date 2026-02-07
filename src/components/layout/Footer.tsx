import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-heading font-semibold">WriteAI</span>
            <span className="text-sm text-muted-foreground">© 2026</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>

          {/* Badge */}
          <div className="text-sm text-muted-foreground">
            Built with AI
          </div>
        </div>
      </div>
    </footer>
  );
}
