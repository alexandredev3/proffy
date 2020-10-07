import React, { 
  createContext, 
  useContext,
  useCallback, 
  useState
} from 'react';

import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  avatar_url: string;
  token: string;
}

interface SigninCredendials {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  userData: User | null;
  signIn(signinCredendials: SigninCredendials): Promise<void>;
  // a atualização do usuario e feita aqui.
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/session', {
      email,
      password
    });

    const { 
      user: {
        id,
        name,
        avatar_url,
      },
      token 
    } = response.data;

    setUserData({ id, name, avatar_url, token })
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

  return context;
}