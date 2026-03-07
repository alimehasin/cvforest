export const SUPPORTED_LOCALES = [
  { code: 'en' as const, label: 'English' },
  { code: 'ar' as const, label: 'العربية' },
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]['code'];
