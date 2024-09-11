import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { callApi } from '@app/api';
import { SERVER_MODE } from '@app/constants';

type User = {
  id: string;
  name: string;
  email: string;
  organizations: Organization[];
};

type Organization = {
  id: string;
  name: string;
};

const AuthContext = createContext<{
  user: User | null;
  serverMode: SERVER_MODE;
  login: (user: User) => void;
  logout: () => void;
}>({
  user: null,
  serverMode: SERVER_MODE.OPEN,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [serverMode, setServerMode] = useState(SERVER_MODE.OPEN);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await callApi('/auth/check');
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setServerMode(data.serverMode);
        setLoading(false);
      } else {
        setServerMode(SERVER_MODE.SAAS);
        setLoading(false);
      }
    } catch (e) {
      setServerMode(SERVER_MODE.SAAS);
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh().then(() => {
      setLoading(false);
    });
  }, []);

  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, serverMode, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
