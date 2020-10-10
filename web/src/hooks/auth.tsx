import React, { 
  createContext, 
  useContext,
  useCallback, 
  useState,
  useEffect,
} from 'react';
import { isNonNullExpression } from 'typescript';

import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  avatar_url: string;
}

interface AuthState extends User {
}

interface SigninCredendials {
  email: string;
  password: string;
  isLoginRemember: boolean;
}

interface AuthContextData {
  signed: boolean;
  userData: User | null;
  signIn(signinCredendials: SigninCredendials): Promise<void>;
  // a atualização do usuario e feita aqui.
  signOut(): void;
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

    const { id, name, avatar_url }: User = user;

    setUserData({ id, name, avatar_url });
    
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (isLoginRemember) {
      localStorage.setItem('@ProffyAuth:user', 
        JSON.stringify(response.data.user)
      );

      localStorage.setItem('@ProffyAuth:token', 
        JSON.stringify(response.data.token)
      );
    }
  }, [userData]);

  const signOut = useCallback(() => {
    setUserData(null);

    localStorage.removeItem('@ProffyAuth:user');
    localStorage.removeItem('@ProffyAuth:token');
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ signed: !!userData, userData, signIn, signOut }}
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