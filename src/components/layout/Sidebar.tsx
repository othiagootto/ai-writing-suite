import { Link, useLocation } from 'react-router-dom';
import {
  ScanSearch,
  UserPen,
  RefreshCw,
  SpellCheck,
  ShieldCheck,
  FileText,
  Quote,
  MessageSquare,
  Clock,
  Settings,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const tools: NavItem[] = [
  { name: 'AI Detector', path: '/tools/ai-detector', icon: ScanSearch },
  { name: 'Humanizer', path: '/tools/humanizer', icon: UserPen },
  { name: 'Paraphraser', path: '/tools/paraphraser', icon: RefreshCw },
  { name: 'Grammar Checker', path: '/tools/grammar-checker', icon: SpellCheck },
  { name: 'Plagiarism Checker', path: '/tools/plagiarism-checker', icon: ShieldCheck },
  { name: 'Summarizer', path: '/tools/summarizer', icon: FileText },
  { name: 'Citation Generator', path: '/tools/citation-generator', icon: Quote },
  { name: 'AI Chat', path: '/tools/ai-chat', icon: MessageSquare },
];

const otherLinks: NavItem[] = [
  { name: 'History', path: '/history', icon: Clock },
  { name: 'Account', path: '/account', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarOpen } = useUIStore();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col w-64 border-r border-border bg-card min-h-screen transition-all',
          !sidebarOpen && 'w-16'
        )}
      >
        <nav className="flex-1 p-4 space-y-6">
          {/* Tools Section */}
          <div>
            <h3
              className={cn(
                'text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3',
                !sidebarOpen && 'sr-only'
              )}
            >
              Tools
            </h3>
            <ul className="space-y-1">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = location.pathname === tool.path;
                return (
                  <li key={tool.path}>
                    <Link
                      to={tool.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        !sidebarOpen && 'justify-center'
                      )}
                      title={!sidebarOpen ? tool.name : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {sidebarOpen && <span>{tool.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Other Links Section */}
          <div>
            <h3
              className={cn(
                'text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3',
                !sidebarOpen && 'sr-only'
              )}
            >
              Other
            </h3>
            <ul className="space-y-1">
              {otherLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                        !sidebarOpen && 'justify-center'
                      )}
                      title={!sidebarOpen ? link.name : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {sidebarOpen && <span>{link.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar - Sheet/Drawer would be better but keeping it simple */}
      <div className="lg:hidden">
        {/* Mobile navigation is handled in the header */}
      </div>
    </>
  );
}
