import React from 'react';
import cn from 'classnames';
import { ApolloProvider, useQuery } from '@apollo/client';

import '../styles/globals.scss';
import Navigation from '../components/Navigation';
import apolloClient, { GET_IS_DARK_THEME } from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  const { data: { isDarkTheme } } = useQuery(GET_IS_DARK_THEME, { client: apolloClient });

  return (
    <ApolloProvider client={apolloClient}>
      <div className={cn('app', { dark: isDarkTheme })}>
        <Navigation />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
