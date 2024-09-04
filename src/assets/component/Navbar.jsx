import { Box, IconButton, useTheme } from "@mui/material"
import { memo } from "react"
import { navbar_box } from "../style/Style"
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import { useThemeContext } from "../context/ThemeContextProvider";



const Navbar = () => {

   console.log('-> NAVBAR')
   const theme = useTheme()

   const {colorMode } = useThemeContext() ;

   return (

      <Box sx={navbar_box({ theme })}>
         <span>Navbar</span>

         <IconButton onClick={colorMode.toggleMode} color="inherit">
            {theme.palette.mode === 'dark' ? <ModeNightRoundedIcon /> : <LightModeRoundedIcon />}
         </IconButton>
      </Box>
   )
}

export default memo(Navbar)


