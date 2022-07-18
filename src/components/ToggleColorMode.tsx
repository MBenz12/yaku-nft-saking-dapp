import { useMemo, useState, createContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => {} });
export default function ToggleColorMode(props: any) {
  const [mode, setMode] = useState<ColorMode>(ColorMode.LIGHT);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark'
}