

import React, { cloneElement, useEffect, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useColapse } from '../context/ColapseProvider';

const button_sty = ({ buttonWidth }) => ({
   display: 'flex',
   justifyContent: 'start',
   padding: '8px 20px 8px 8px',
   alignItems: 'center',
   boxShadow: 'none',
   borderRadius: '7px',
   textAlign: 'left',
   height: '34px',
   textTransform: 'Capitalize',
   lineHeight: '.9rem',
   transition: '.3s',
   overflow: 'hidden',
   width: buttonWidth,
   minWidth: '34px',
   fontWeight: '500',
   fontSize: '.85rem',
   position: 'relative'
})


const dropdown = (buttonWidth) => ({
   padding: '8px 0',
   width: buttonWidth,
   minWidth: '0px',
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
   transition: '.3s',
   overflow: 'hidden',
})


const button_sty_2 = ({ theme }) => ({
   display: 'flex',
   justifyContent: 'start',
   padding: '8px',
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
   fontSize: '.8rem',
   color: theme.palette.primary.main,
   backgroundColor: theme.palette.dark_2.main,
   '&:hover': {
      backgroundColor: theme.palette.dark_2.main,
      boxShadow: 'none'
   },
   overflow: 'hidden',
})




const button_sty_3 = ({ theme }) => ({
   width: '100%',
   height: '34px',
   borderRadius: '7px',
   display: 'flex',
   justifyContent: 'start',
   backgroundColor: theme.palette.dark_2.main,
   boxShadow: 'none',
   color: theme.palette.primary.main,
   '&:hover': {
      backgroundColor: theme.palette.dark_2.main,
      boxShadow: 'none'
   },
   transition: '.3s',
   overflow: 'hidden',
})


const button_sty_4 = {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   minWidth: '0px',
   borderRadius: '10px',
   boxShadow: 'none',
   height: '34px',
   width: '34px',
   overflow: 'hidden'
}







const ButtonSidebarDropdown = ({ icon, text, active, onClick }) => {
   const theme = useTheme();
   const { colapse } = useColapse()

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
      if (onClick) onClick();
   };

   const [buttonWidth, setButtonWidth] = useState('34px');
   useEffect(() => {
      setButtonWidth(colapse ? '34px' : '100%');
   }, [colapse]);

   return (
      !colapse ? (
         <Box sx={{ minWidth: '10px', width: '100%', overflow: 'hidden', transition: '5s', position: 'relative' }}>


            <Button
               variant={active ? 'contained' : 'text'}
               sx={button_sty({ buttonWidth })}
               onClick={handleToggle}
            >
               {cloneElement(icon, { style: { color: active ? theme.palette.text.primary.main : theme.palette.dark_1.main } })}
               <Box sx={{ marginLeft: '6px', color: active ? theme.palette.text.primary.main : theme.palette.dark_1.main }}>{text}</Box>
               <Box sx={{ position: 'absolute', right: `${isDropdownOpen ? '4px' : '0px'}`, top: `${isDropdownOpen ? '6px' : '4px'}`, rotate: `${isDropdownOpen ? '0deg' : '-90deg'}`, transition: '.2s' }}>
                  <KeyboardArrowDownRoundedIcon />
               </Box>
            </Button>

            {isDropdownOpen && (
               <Box sx={dropdown({ buttonWidth })}>
                  <Button variant='contained' sx={button_sty_2({ theme })}>
                     {text}
                  </Button>

                  <Button variant='contained' sx={button_sty_3({ theme })}>sadkj</Button>
               </Box>
            )}
         </Box>
      ) : (
         <Button
            variant={active ? 'contained' : 'text'}
            sx={button_sty_4}
            onClick={handleToggle} 
         >
            {cloneElement(icon, { style: { color: active ? theme.palette.text.primary.main : theme.palette.dark_1.main } })}
         </Button>
      )
   );
};

export default ButtonSidebarDropdown;
