import { useState, useCallback } from 'react';
import { processTool } from '@/services/tools';
import { useUsageLimit } from './useUsageLimit';
import type { ToolType, ToolOptions, ToolResult } from '@/types';

interface UseToolReturn {
  result: ToolResult | null;
  isLoading: boolean;
  error: string | null;
  execute: (input: string, options?: ToolOptions) => Promise<void>;
  reset: () => void;
  canUse: boolean;
  remaining: number;
}

export function useTool(tool: ToolType): UseToolReturn {
  const [result, setResult] = useState<ToolResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { canUse, remaining, refetch } = useUsageLimit(tool);

  const execute = useCallback(async (input: string, options?: ToolOptions) => {
    if (!canUse) {
      setError('Daily usage limit reached. Upgrade to Pro for unlimited access.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await processTool(tool, input, options);
      setResult(data);
      refetch();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [tool, canUse, refetch]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, execute, reset, canUse, remaining };
}
