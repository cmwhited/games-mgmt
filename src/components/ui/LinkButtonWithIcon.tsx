import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { LinkProps } from '@reach/router';

import LinkButton from './LinkButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconStatic: {
      marginRight: theme.spacing(1)
    }
  })
);

type Props = { Icon?: React.ComponentType<SvgIconProps> } & ButtonProps & LinkProps<any>;

const LinkButtonWithIcon: React.FC<Props> = React.memo(({ Icon, children, ...rest }) => {
  const classes = useStyles();

  return (
    <LinkButton {...rest}>
      {Icon && <Icon className={classes.iconStatic} />}
      {children}
    </LinkButton>
  );
});

export default LinkButtonWithIcon;
