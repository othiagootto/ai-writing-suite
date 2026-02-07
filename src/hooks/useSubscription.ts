import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { useUser } from './useUser';
import type { Subscription } from '@/types';

export function useSubscription() {
  const { user } = useUser();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      return data as Subscription | null;
    },
    enabled: !!user,
  });

  const isPro = !!subscription && ['active', 'trialing'].includes(subscription.status);
  const isTrialing = subscription?.status === 'trialing';
  const plan = subscription?.plan || 'free';

  return { subscription, isPro, isTrialing, plan, isLoading };
}
