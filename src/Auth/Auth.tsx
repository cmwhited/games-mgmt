import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

type AuthState = {
  authenticated?: boolean;
  authUser?: any;
  loading?: boolean;
  signin(appState?: any): Promise<void>;
  signout(params: any): void;
};

const initialState: AuthState = {
  authenticated: false,
  authUser: undefined,
  loading: false,
  signin: async (): Promise<void> => {},
  signout: (): void => {}
};

export const DEFAULT_URI = `${window.location.origin}/dashboard`;
export const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);
export const AuthContext = React.createContext<AuthState>(initialState);
export const useAuth = () => useContext(AuthContext);

// Create a React component wrapper that will provide the auth0 client and wrap the authentication state for the application.
// Exposes effects for beginning the auth0 universal login experience and redirecting the user once the authentication is successful.
// Exposes the current authenticated state for the app including the authenticated user details.
const AuthProvider: React.FC<{ onSuccessRedirect: Function; opts: Auth0ClientOptions }> = React.memo(props => {
  const { onSuccessRedirect = DEFAULT_REDIRECT_CALLBACK, opts, children } = props;
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [authUser, setAuthUser] = useState<any>();
  const [auth0, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Create a react effect hook for handling authentication with the auth0 client
   */
  useEffect(() => {
    const initAuthClient = async () => {
      setLoading(true);
      // create the auth0 client and set in state
      const _auth0 = await createAuth0Client(opts);
      setAuth0(_auth0);
      // check the current window location, if it is the value from the successful Auth0 authentication
      // call the redirect function to nav the user to the authenticated state
      if (window.location.search.includes('code=')) {
        const { appState } = await _auth0.handleRedirectCallback();
        // redirect user with appState
        const state = { ...appState, targetUrl: appState.targetUrl || DEFAULT_URI };
        onSuccessRedirect(state);
      }
      // check if the user is currently authenticated and set in state
      const authenticated = await _auth0.isAuthenticated();
      setAuthenticated(authenticated);
      // if the user is authenticated, get the user profile and set in state
      if (authenticated) {
        const user = await _auth0.getUser();
        setAuthUser(user);
      }
      // reset loading indicator
      setLoading(false);
    };
    initAuthClient();
    // the empty array below means we only want to run this effect *when the app initializes*, or on componentDidMount
    // it also means that if an input prop changes, this does not change the effect.
    // eslint-disable-next-line
  }, []);

  /**
   * Call the `auth0.loginWithRedict` method to begin the authentication flow using auth0.
   * @param appState any app state to pass into the auth0 authentication redirect
   */
  const handleAuthentication = async (appState: any = { targetUrl: DEFAULT_URI }): Promise<void> => {
    if (!auth0) {
      throw new Error(`Auth0 Client is null`);
    }
    await auth0.loginWithRedirect({ redirect_uri: opts.redirect_uri!, appState });
  };

  /**
   * Handle the application signout functionality. Call the `auth0.logout` method.
   * Reset the state to show unauthenticated.
   */
  const handleSignout = () => {
    if (!auth0) {
      throw new Error(`Auth0 Client is null`);
    }
    auth0.logout({ returnTo: window.location.origin, client_id: opts.client_id });
    setAuthUser(undefined);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        authUser,
        loading,
        signin: async (appState?: any) => await handleAuthentication(appState),
        signout: () => handleSignout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export default AuthProvider;
