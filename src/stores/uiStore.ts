import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/lib/i18n/translations';

type Theme = 'light' | 'dark' | 'system';

function detectBrowserLocale(): Locale {
  const lang = navigator.language?.slice(0, 2);
  if (lang === 'pt') return 'pt';
  if (lang === 'es') return 'es';
  return 'en';
}

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setLocale: (locale: Locale) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarOpen: true,
      locale: detectBrowserLocale(),
      setTheme: (theme) => {
        set({ theme });
        const root = document.documentElement;
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.toggle('dark', systemTheme === 'dark');
        } else {
          root.classList.toggle('dark', theme === 'dark');
        }
      },
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'aws-ui-storage' }
  )
);
