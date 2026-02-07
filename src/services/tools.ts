import { supabase } from './supabase';
import type { ToolType, ToolOptions, ToolResult } from '@/types';

export async function processTool(
  tool: ToolType,
  input: string,
  options?: ToolOptions
): Promise<ToolResult> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('You must be logged in to use this tool');
  }

  const response = await supabase.functions.invoke('process-tool', {
    body: { tool, input, options: options || {} },
  });

  if (response.error) {
    throw new Error(response.error.message || 'Failed to process request');
  }

  return response.data as ToolResult;
}

export async function getUsageCount(userId: string, tool: ToolType): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('tool', tool)
    .gte('created_at', today.toISOString());

  if (error) throw error;
  return count || 0;
}

export async function getUsageHistory(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
