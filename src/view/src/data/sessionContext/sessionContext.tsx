import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IPartner {
  name: string;
  status: string;
}

export type ISessionInfo = Omit<ISessionContext, 'updateSession'>;

export interface ISessionContext {
  username: string;
  sessionId: string;
  partner: IPartner;
  error: string | undefined;
  updateSession: (newSession: Partial<ISessionInfo>) => void;
}

const initialSession: ISessionInfo = {
  username: '',
  sessionId: '',
  partner: {
    name: '',
    status: '',
  },
  error: undefined,
};

const SessionContext = createContext<ISessionContext | undefined>(undefined);

export const SessionProvider = ({ children }: PropsWithChildren<{}>) => {
  const [session, setSession] = useState(initialSession);

  const { error } = session;

  const updateSession = useCallback((newSession: Partial<ISessionContext>) => {
    setSession((prevValues) => ({ ...prevValues, ...newSession }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!error) {
        clearTimeout(timer);
      }

      updateSession({ error: undefined });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [updateSession, error]);

  return (
    <SessionContext.Provider value={{ ...session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error(
      "Context is unavailable. You're probably not using SessionProvider."
    );
  }

  return session;
};
