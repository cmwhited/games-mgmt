import React from 'react';
import { createStyles, makeStyles, Theme, Typography, Card, CardContent, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loading: {
      width: '98%',
      margin: `${theme.spacing(1)} auto`
    }
  })
);

const Loading: React.FC<{ title: string }> = React.memo(props => {
  const classes = useStyles();
  const { title } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.loading}>
        <CardContent>
          <Typography variant="h1" gutterBottom={true}>
            {title}
          </Typography>
          <LinearProgress color="secondary" />
        </CardContent>
      </Card>
    </div>
  );
});

export default Loading;
