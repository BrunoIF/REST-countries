import React from 'react';
import cn from 'classnames';
import { useReactiveVar } from '@apollo/client';

import '../styles/globals.scss';
import Navigation from '../components/Navigation';
import { isDarkThemeVar } from '../lib/apolloStates';

function MyApp({ Component, pageProps }) {
  const isDarkTheme = useReactiveVar(isDarkThemeVar);

  return (
    <div className={cn('app', { dark: isDarkTheme })}>
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
