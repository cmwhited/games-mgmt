import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { createStyles, makeStyles, Theme, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { useAuth } from '../Auth/Auth';
import LinkButton from '../components/ui/LinkButton';
import LinkButtonWithIcon from 'components/ui/LinkButtonWithIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    dashboard: {
      width: '98%',
      margin: `${theme.spacing(2)} auto`
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    fillSpace: {
      flex: '1 1 auto'
    }
  })
);

const Dashboard: React.FC<RouteComponentProps> = React.memo(() => {
  const classes = useStyles();
  const { authenticated, authUser } = useAuth();

  return (
    <div className={classes.root}>
      <Card className={classes.dashboard}>
        <CardContent>
          {authenticated && authUser && <Typography variant="h3" gutterBottom={true}>{`Welcome, ${authUser.name}!`}</Typography>}
          <Typography variant="body2" color="textPrimary" component="p">
            <span>To view a list of your games, click on the "Your Games List" button below!</span>
            <br />
            <span>Otherwise, add a new game by clicking the "Create Game" button and get in on the fun!</span>
          </Typography>
        </CardContent>
        <CardActions>
          <LinkButton to="/games/list" variant="contained" color="primary">
            Your Games List
          </LinkButton>
          <span className={classes.fillSpace} />
          <LinkButtonWithIcon to="/games/create" variant="contained" color="secondary" Icon={Add}>
            Create Game
          </LinkButtonWithIcon>
        </CardActions>
      </Card>
    </div>
  );
});

export default Dashboard;
