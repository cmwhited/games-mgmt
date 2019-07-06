import React from 'react';
import { Router } from '@reach/router';

import PrivateRoute from './components/ui/PrivateRoute';
import LandingPage from './containers/LandingPage';
import Dashboard from './containers/Dashboard';

const AppRouter: React.FC = React.memo(() => {
  return (
    <Router>
      <LandingPage path="/" />
      <PrivateRoute path="/dashboard" Component={Dashboard} />
    </Router>
  );
});

export default AppRouter;
