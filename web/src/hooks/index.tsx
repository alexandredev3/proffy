import React from 'react';

import { AuthProvider } from './auth';

const appProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export default appProvider;