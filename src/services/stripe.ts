import { supabase } from './supabase';

export async function createCheckoutSession(plan: 'monthly' | 'annual') {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: { plan },
  });

  if (error) throw error;

  if (data?.url) {
    window.location.href = data.url;
  }

  return data;
}

export async function openCustomerPortal() {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: { action: 'portal' },
  });

  if (error) throw error;

  if (data?.url) {
    window.location.href = data.url;
  }

  return data;
}
