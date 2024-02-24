import type { SpeakConfig } from 'qwik-speak';
export const languages = {
  'en-US': 'English',
};

export const config: SpeakConfig = {
  defaultLocale: { lang: 'en-US' },
  supportedLocales: Object.keys(languages).map((lang) => ({ lang })),
  assets: [
    'gradient',
    'animpreview',
    'animtab',
    'animtexture',
    'colorstrip',
    'presettools',
    'flags',
    'nav',
  ],
};
