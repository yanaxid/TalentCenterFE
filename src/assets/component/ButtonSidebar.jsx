import React, { cloneElement } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { useColapse } from '../context/ColapseProvider';



const button_sidebar = {
   display: 'flex',
   justifyContent: 'start',
   padding: '8px 6px',
   alignItems: 'center',
   boxShadow: 'none',
   borderRadius: '7px',
   textAlign: 'left',
   height: '34px',
   textTransform: 'Capitalize',
   lineHeight: '.9rem',
   transition: '.3s',
   overflow: 'hidden',
   width: '100%',
   minWidth: '34px',
   fontWeight: '500',
   fontSize: '.85rem',
}

const button_sidebar_icon = {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minWidth: '0px',
   borderRadius: '9px',
   boxShadow: 'none',
   height: '34px',
   width: '34px',
}

const icon_sty = ({ active, theme }) => ({
   color: active ? theme.palette.text.primary.main : theme.palette.dark_1.main
})


const text_sty = ({ active, theme }) => ({
   marginLeft: '6px', color: active ? theme.palette.text.primary.main : theme.palette.dark_1.main
})



const ButtonSidebar = ({ icon, text, active, onClick }) => {
   const theme = useTheme();

   const { colapse } = useColapse()

   return (
      !colapse ? (
         <Button
            sx={button_sidebar}
            variant={active ? 'contained' : 'text'}
            onClick={onClick}
         >
            {cloneElement(icon, { style: icon_sty({ active, theme }) })}
            <Box sx={text_sty({ active, theme })}>
               {text}
            </Box>
         </Button>
      ) : (
         <Button
            sx={button_sidebar_icon}
            variant={active ? 'contained' : 'text'}
            onClick={onClick}
         >
            {cloneElement(icon, { style: icon_sty({ active, theme }) })}
         </Button>
      )
   );
};

export default ButtonSidebar;
