import React from 'react';
import { Link, LinkProps } from '@reach/router';
import Button, { ButtonProps } from '@material-ui/core/Button';

export const CollisionLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps<{}>, 'innerRef'>>((props, ref) => (
  <Link ref={ref as any} to={props.to} {...props} />
));

export const ExternalLink = React.forwardRef<any, any>((props, ref) => (
  <a href={props.href} {...props}>
    {props.children}
  </a>
));

const LinkButton: React.FC<{ href?: string } & ButtonProps & LinkProps<any>> = React.memo(({ children, ...props }) => (
  <Button component={props.href ? ExternalLink : CollisionLink} {...props}>
    {children}
  </Button>
));

export default LinkButton;
