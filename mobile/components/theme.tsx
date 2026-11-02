import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

const THEME_STORAGE_KEY = 'campushub-theme-mode';

const palettes = {
  dark: {
    background: '#000000',
    surface: '#000000',
    raisedSurface: '#181818',
    border: '#383838',
    divider: '#505050',
    text: '#FFFFFF',
    secondaryText: '#A6A6A6',
    mutedText: '#C0C0C0',
    categoryText: '#D1D1D1',
    accent: '#FFD43B',
    accentForeground: '#000000',
    supportingAccent: '#FFD43B',
    urgentSurface: '#4B3533',
    urgentBorder: '#755047',
    urgentText: '#FFAA9C',
    urgentDot: '#FF8A78',
  },
  light: {
    background: '#F2FAFC',
    surface: '#FFFFFF',
    raisedSurface: '#E7F5F8',
    border: '#C5E7EE',
    divider: '#D9EDF2',
    text: '#053F5C',
    secondaryText: '#2D7188',
    mutedText: '#255F75',
    categoryText: '#053F5C',
    accent: '#F7AD19',
    accentForeground: '#053F5C',
    supportingAccent: '#429EBD',
    urgentSurface: '#FFF5DB',
    urgentBorder: '#F7AD19',
    urgentText: '#053F5C',
    urgentDot: '#F7AD19',
  },
} as const;

export type ThemeMode = keyof typeof palettes;
export type AppPalette = (typeof palettes)[ThemeMode];

type ThemeContextValue = {
  mode: ThemeMode;
  colors: AppPalette;
  isReady: boolean;
  error: Error | null;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((storedMode) => {
        if (isMounted && (storedMode === 'dark' || storedMode === 'light')) {
          setMode(storedMode);
        }
      })
      .catch((cause: unknown) => {
        if (isMounted) {
          setError(
            cause instanceof Error
              ? cause
              : new Error('Unable to load the saved theme preference.'),
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady || error) {
      return;
    }

    AsyncStorage.setItem(THEME_STORAGE_KEY, mode).catch((cause: unknown) => {
      setError(
        cause instanceof Error
          ? cause
          : new Error('Unable to save the theme preference.'),
      );
    });
  }, [error, isReady, mode]);

  const setThemeMode = useCallback((nextMode: ThemeMode) => {
    setMode(nextMode);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      colors: palettes[mode],
      isReady,
      error,
      setMode: setThemeMode,
    }),
    [error, isReady, mode, setThemeMode],
  );

  if (error) {
    throw error;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider.');
  }

  return context;
}
