import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useColapse } from '../context/ColapseProvider';


const ButtonColapse = () => {

   const theme = useTheme()
   const { colapse, setColapse } = useColapse()

   return (
      <Box sx={{ padding: '0 10px', display: 'flex', justifyContent: 'center' }}>
         <Box
            onClick={() => setColapse(prev => !prev)}
            sx={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               cursor: 'pointer',
               width: 'fit-content',
               padding: '2px 4px'
            }}>

            <Box
               sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px',
                  marginRight: colapse ? '0px' : '8px'
               }}
            >
               {colapse ? <KeyboardArrowRightRoundedIcon sx={{ color: theme.palette.background.default }} /> : <KeyboardArrowLeftRoundedIcon sx={{ color: theme.palette.background.default }} />}



            </Box>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
               {colapse === true ? '' : 'Collapse'}
            </Typography>

         </Box>
      </Box>

   );
};

export default ButtonColapse;