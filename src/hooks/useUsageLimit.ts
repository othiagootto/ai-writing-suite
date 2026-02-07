import { useQuery } from '@tanstack/react-query';
import { getUsageCount } from '@/services/tools';
import { useUser } from './useUser';
import { useSubscription } from './useSubscription';
import { FREE_DAILY_LIMIT } from '@/lib/constants';
import type { ToolType } from '@/types';

export function useUsageLimit(tool: ToolType) {
  const { user } = useUser();
  const { isPro } = useSubscription();

  const { data: usageCount = 0, refetch } = useQuery({
    queryKey: ['usage', user?.id, tool],
    queryFn: () => getUsageCount(user!.id, tool),
    enabled: !!user && !isPro,
  });

  if (isPro) {
    return { canUse: true, remaining: Infinity, total: Infinity, isLimited: false, refetch };
  }

  const remaining = Math.max(0, FREE_DAILY_LIMIT - usageCount);
  const canUse = remaining > 0;

  return {
    canUse,
    remaining,
    total: FREE_DAILY_LIMIT,
    isLimited: !isPro,
    refetch,
  };
}
