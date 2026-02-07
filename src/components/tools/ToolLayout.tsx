import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  inputPanel: React.ReactNode;
  outputPanel: React.ReactNode;
  className?: string;
}

export default function ToolLayout({
  title,
  description,
  icon,
  inputPanel,
  outputPanel,
  className,
}: ToolLayoutProps) {
  // Resolve icon if it's a string
  const IconComponent = typeof icon === 'string'
    ? (Icons[icon as keyof typeof Icons] as LucideIcon)
    : null;

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {IconComponent ? (
                <IconComponent className="h-8 w-8 text-foreground" />
              ) : (
                icon
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Split Panel Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Input</h2>
            {inputPanel}
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">Output</h2>
            {outputPanel}
          </div>
        </div>
      </div>
    </div>
  );
}
