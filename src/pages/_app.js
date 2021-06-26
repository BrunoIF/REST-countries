import React from "react";
import cn from "classnames";

import "styles/globals.scss";
import Navigation from "components/Navigation";
import { useDarkTheme } from "@hooks/useDarkTheme";

function MyApp({ Component, pageProps }) {
  const { isDarkTheme } = useDarkTheme();

  return (
    <div className={cn("app", { dark: isDarkTheme })}>
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
