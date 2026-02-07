import { useCallback } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { translations, type Locale } from '@/lib/i18n/translations';

export function useTranslation() {
  const locale = useUIStore((s) => s.locale);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let value = translations[locale]?.[key] ?? translations.en[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }
      return value;
    },
    [locale]
  );

  return { t, locale };
}
