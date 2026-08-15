export const globalSettings = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://emadtoranji.ir/',
  clearCacheVersion: '20251219',
  site: {
    name: 'Emad Toranji',
    twitter: '@emadtoranji',
  },
} as const;

export default globalSettings;
