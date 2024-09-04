
import { useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { getTheme } from "../style/Theme";
import { ThemeProvider } from "@mui/material";


const themeContext = createContext();
export const useThemeContext = () => useContext(themeContext);

const ThemeContextProvider = ({ children }) => {
   const [mode, setMode] = useState('light');
   const theme = useMemo(() => getTheme(mode), [mode]);


   const colorMode = useMemo(
      () => ({
         toggleMode: () => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
      }), []
   );



   return (
      <themeContext.Provider value={{mode, colorMode}}>
         <ThemeProvider theme={theme}>
            {children}
         </ThemeProvider>
      </themeContext.Provider>
   );
};

export default ThemeContextProvider;