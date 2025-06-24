import React, { createContext, useState } from 'react'

type DarkThemeContext = {
  isDarkTheme: boolean, setIsDarkTheme: (value: boolean | ((value: unknown) => unknown)) => void
}

export const DarkThemeContext = createContext<DarkThemeContext>({ isDarkTheme: null, setIsDarkTheme: () => { } });

interface Props {
  children: ({ isDarkTheme }: { isDarkTheme: boolean }) => React.ReactNode
}

export default function DarkThemeProvider({ children }: Props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children({ isDarkTheme })}
    </DarkThemeContext.Provider>
  )
}
