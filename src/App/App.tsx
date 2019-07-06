import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { useAuth } from '../Auth/Auth';
import AppToolbar from './AppToolbar';
import AppRouter from '../Router';
import Loading from '../containers/Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      height: '100vh'
    },
    mainContent: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      padding: `${theme.spacing(2)}px`
    },
    mainToolbar: {
      flex: ' 0 0 auto'
    }
  })
);

const App: React.FC = React.memo(() => {
  const classes = useStyles();
  const { loading } = useAuth();

  if (loading) {
    return <Loading title="Loading App.." />;
  }

  return (
    <main className={classes.root}>
      <AppToolbar className={classes.mainToolbar} />
      <section className={classes.mainContent}>
        <AppRouter />
      </section>
    </main>
  );
});

export default App;
