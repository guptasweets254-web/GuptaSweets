import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '@/lib/api';

export type SiteSettings = {
  siteName?: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  businessHours?: string;
  zomato?: string;
  swiggy?: string;
};

type SettingsContextValue = {
  settings: SiteSettings | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
  save: (data: Partial<SiteSettings>) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch: queryRefetch } = useQuery<SiteSettings | null, Error>({
    queryKey: ['settings'],
    queryFn: async () => {
      try {
        const res = await getSettings();
        return res || null;
      } catch (err) {
        console.error('Failed to fetch settings', err);
        return null;
      }
    },
  });

  const save = async (payload: Partial<SiteSettings>) => {
    // call API
    await updateSettings(payload);
    // refresh local cache
    await queryClient.invalidateQueries({ queryKey: ['settings'] });
  };

  const value: SettingsContextValue = {
    settings: data || null,
    isLoading: !!isLoading,
    refetch: async () => {
      await queryRefetch();
    },
    save,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
