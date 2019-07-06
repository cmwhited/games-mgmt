import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';

import { useAuth } from '../Auth/Auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    landingPage: {
      width: '98%',
      margin: `${theme.spacing(2)} auto`
    }
  })
);

const LandingPage: React.FC<RouteComponentProps> = React.memo(() => {
  const classes = useStyles();
  const { signin } = useAuth();

  return (
    <div className={classes.root}>
      <Card className={classes.landingPage}>
        <CardContent>
          <Typography variant="h3" gutterBottom={true}>
            Welcome
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This app maintains a list of the games that you own so that you can see your games wherever you go! To see your games list and
            add/update games, sign in to the app.
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={() => signin()}>
            Sign in
          </Button>
        </CardActions>
      </Card>
    </div>
  );
});

export default LandingPage;
