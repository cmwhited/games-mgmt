import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useAuth } from '../../Auth/Auth';

const PrivateRoute: React.FC<{ Component: any } & RouteComponentProps> = React.memo(props => {
  const { authenticated, signin } = useAuth();
  const { Component, path, ...rest } = props;

  useEffect(() => {
    const unauthenticatedRouteAttempt = async () => {
      if (!authenticated) {
        await signin({ targetUrl: path });
      }
    };
    unauthenticatedRouteAttempt();
  }, [authenticated, signin, path]);

  return <Component path={path} {...rest} />;
});

export default PrivateRoute;
