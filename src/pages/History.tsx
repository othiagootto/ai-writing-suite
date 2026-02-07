import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/hooks/useUser';
import { getUsageHistory } from '@/services/tools';
import { TOOLS } from '@/lib/constants';
import { FileText, Calendar } from 'lucide-react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function History() {
  const { user } = useUser();

  const { data: history, isLoading } = useQuery({
    queryKey: ['usageHistory', user?.id],
    queryFn: () => getUsageHistory(user!.id),
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  const getToolInfo = (toolId: string) => {
    return TOOLS.find((t) => t.id === toolId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">History</h1>
          <p className="text-muted-foreground">View your recent tool usage</p>
        </div>

        {/* History List */}
        {!history || history.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No history yet
                </h3>
                <p className="text-muted-foreground">
                  Start using a tool to see your history here
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {history.map((entry: any) => {
                const tool = getToolInfo(entry.tool);
                const date = new Date(entry.created_at);

                return (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={tool?.color}>
                              {tool?.name || entry.tool}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-1">
                                Input
                              </h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {entry.input || 'No input recorded'}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-1">
                                Output
                              </h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {entry.output || 'No output recorded'}
                              </p>
                            </div>
                          </div>

                          {entry.metadata && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Provider: {entry.metadata.provider}</span>
                                <span>Tokens: {entry.metadata.tokensUsed}</span>
                                <span>Time: {entry.metadata.processingTime}ms</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
