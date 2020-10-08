import React, { 
  createContext, 
  useContext,
  useCallback, 
  useState,
  useEffect,
} from 'react';

import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  avatar_url: string;
  token: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SigninCredendials {
  email: string;
  password: string;
  isLoginRemember: boolean;
}

interface AuthContextData {
  signed: boolean;
  userData: AuthState | null;
  signIn(signinCredendials: SigninCredendials): Promise<void>;
  // a atualização do usuario e feita aqui.
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthState | null>(null);

  useEffect(() => {
    const storageToken = localStorage.getItem('@ProffyAuth:token');
    const storageUser = localStorage.getItem('@ProffyAuth:user');

    if (storageToken && storageUser) {
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;

      setUserData(JSON.parse(storageUser));
    }
  }, []);

  const signIn = useCallback(async ({ email, password, isLoginRemember = false }) => {
    const response = await api.post('/session', {
      email,
      password
    });

    const { 
      user,
      token 
    } = response.data;

    setUserData({ token, user });
    
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (isLoginRemember) {
      localStorage.setItem('@ProffyAuth:user', 
        JSON.stringify(response.data.user)
      );

      localStorage.setItem('@ProffyAuth:token', 
        JSON.stringify(response.data.token)
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: !!userData, userData, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth context must be used within an AuthProvider');
  };

  return context;
}