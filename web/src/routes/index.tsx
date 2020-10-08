import React from 'react';
import { 
  Route as RouteDOM,
  RouteProps as RouteDOMProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends RouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/* 
  * component: Component: Estou trocando o nome "component" para "Component" para rendelizar
*/
const Route: React.FC<RouteProps> = ({ 
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  return (
    <RouteDOM 
      { ...rest }
      render={({ location }) => {
        return isPrivate === signed ? (
          <Component />
          /**
           * Vai rendelizar os componentes que a rota tiver a propriedade isPrivate.
           */
        ) : (
          <Redirect
            // Aqui e onde vai fazer os redirecionamentos.
            /**
             * Se o usuario NÃO estiver logado, e tentar acessar alguma rota que e privata,
             * o usuario vai ser redirecionato para diretorio "/".
             * 
             * Se o usuario fazer login, ele vai ser redirecionato para o diretorio "/home".
             */
            to={{
              pathname: isPrivate ? "/" : "/home",
              state: {
                from: location
              }
            }}
          />
        )
      }}
    />
  );
}

export { Route };