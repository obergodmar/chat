import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

type Preferences = Omit<IPreferencesContext, 'updatePreferences'>;

export interface IPreferencesContext {
  inputs: 'default' | 'custom';
  updatePreferences: (newSession: Partial<Preferences>) => void;
}

const initialPreferences: Preferences = {
  inputs: 'custom',
};

const PreferencesContext = createContext<IPreferencesContext | undefined>(
  undefined
);

export const PreferencesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [preferences, setPreferences] = useState(initialPreferences);

  const updatePreferences = useCallback(
    (newPreferences: Partial<Preferences>) => {
      setPreferences((prevValues) => ({ ...prevValues, ...newPreferences }));
    },
    []
  );

  return (
    <PreferencesContext.Provider value={{ ...preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const preferences = useContext(PreferencesContext);

  if (!preferences) {
    throw new Error(
      "Context is unavailable. You're probably not using PreferencesProvider."
    );
  }

  return preferences;
};
