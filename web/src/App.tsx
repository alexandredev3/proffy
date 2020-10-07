import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './hooks/auth';

import AppRoutes from './routes/app.routes'

import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
