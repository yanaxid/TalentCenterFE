import { Box, useTheme } from "@mui/material"
import * as React from "react";
import { footer_bg, footer_box } from "../style/Style";


const Footer = () => {

   console.log('-> FOOTER')

   const theme = useTheme();



   return (

      <Box sx={footer_bg({theme})}>
         <Box sx={footer_box({theme})}>
            © 2022 - Talent Management 79
         </Box>
      </Box>
   )
}

export default Footer