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
  * component: Component: Estou trocando o nome "component" para Component Para rendelizar
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
           * <Component /> quer dizer que ele vai rendelizar os componentes.
           */
        ) : (
          <Redirect 
            to={{
              pathname: isPrivate ? "/" : "home",
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