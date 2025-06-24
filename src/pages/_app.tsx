import React from "react";
import cn from "classnames";

import "styles/globals.scss";
import Navigation from "components/Navigation";
import DarkThemeProvider from "context/DarkThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <DarkThemeProvider>
      {({ isDarkTheme }) => (
        <div className={cn("app", { dark: isDarkTheme })}>
          <Navigation />
          <Component {...pageProps} />
        </div>
      )}
    </DarkThemeProvider>

  );
}

export default MyApp;
