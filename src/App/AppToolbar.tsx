import React from 'react';
import { createStyles, makeStyles, Theme, Button } from '@material-ui/core';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth/Auth';
import LinkButton from '../components/ui/LinkButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    linkButton: {
      margin: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    }
  })
);

const AuthenticatedLinks: React.FC<{ signout: Function }> = React.memo(({ signout }) => (
  <div>
    <LinkButton to="/games/list" color="inherit">
      Your Games List
    </LinkButton>
    <LinkButton to="/games/create" color="inherit">
      Add Game
    </LinkButton>
    <LinkButton to="/auth/profile" color="inherit">
      Profile
    </LinkButton>
    <Button color="inherit" onClick={() => signout()}>
      Sign out
    </Button>
  </div>
));

const UnauthenticatedLinks: React.FC<{ signin: Function }> = React.memo(({ signin }) => (
  <div>
    <Button color="inherit" onClick={() => signin()}>
      Sign in
    </Button>
  </div>
));

const AppToolbar: React.FC<AppBarProps> = React.memo(props => {
  const classes = useStyles();
  const { authenticated, signin, signout } = useAuth();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LinkButton to="/" color="inherit" className={classes.title}>
            <Typography variant="h6" className={classes.title}>
              Games Management
            </Typography>
          </LinkButton>
          {authenticated ? <AuthenticatedLinks signout={() => signout({})} /> : <UnauthenticatedLinks signin={() => signin()} />}
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default AppToolbar;
