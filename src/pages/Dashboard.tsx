import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { TOOLS } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { useUser } from '@/hooks/useUser';
import { useTranslation } from '@/hooks/useTranslation';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();

  const { data: todayUsage = 0 } = useQuery({
    queryKey: ['todayUsage', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from('usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString());

      return count || 0;
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('dashboard.todayActivity')}</CardTitle>
              <CardDescription>{t('dashboard.usageAcrossTools')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayUsage}</div>
              <p className="text-sm text-muted-foreground mt-1">{t('dashboard.toolsUsedToday')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool) => {
            const Icon = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

            return (
              <Card
                key={tool.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(tool.path)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-muted group-hover:bg-primary transition-colors`}>
                      <Icon className={`h-6 w-6 ${tool.color} group-hover:text-primary-foreground transition-colors`} />
                    </div>
                    {tool.active && (
                      <Badge variant="outline" className="text-xs">
                        {t('common.active')}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{t(tool.nameKey)}</CardTitle>
                  <CardDescription className="text-sm">
                    {t(tool.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                  >
                    {t('common.openTool')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
