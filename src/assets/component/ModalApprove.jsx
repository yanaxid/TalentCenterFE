


import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { IconButton, useTheme } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '260px',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   borderRadius: '10px',
   border: 'none',
   position: 'relative'
};

export default function ModalApprove({ handleClose, open, action }) {

   const theme = useTheme()

   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Fade in={open}>
               <Box sx={style}>
                  <Box sx={{ borderBottom: `1px solid ${theme.palette.border_1.main}`, padding: '10px 20px', fontWeight: '600' }}>
                     Approve
                  </Box>

                  <Box sx={{ padding: '10px 20px', borderBottom: `1px solid ${theme.palette.border_1.main}`, textAlign: 'center', fontSize: '.85rem', color: theme.palette.dark_1.main }}>
                     Apakah anda yakin ingin approve ini?
                  </Box>

                  <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                     <Button onClick={handleClose} variant='contained' sx={{
                        width: '50%',
                        height: '34px',
                        padding: '0px',
                        backgroundColor: theme.palette.dark_4.main,
                        boxShadow: 'none',
                        textTransform: 'capitalize',
                        '&:hover': {
                           backgroundColor: theme.palette.dark_4.hover,
                        }
                     }}>
                        Batal
                     </Button>

                     <Button variant='contained' onClick={action} sx={{
                        width: '50%',
                        height: '34px',
                        padding: '0px',
                        backgroundColor: theme.palette.success.main,
                        boxShadow: 'none',
                        textTransform: 'capitalize',
                        '&:hover': {
                           backgroundColor: theme.palette.success.hover,
                        }
                     }}>
                        Approve
                     </Button>

                     <IconButton aria-label="close" sx={{ position: 'absolute', top: '4px', right: '4px' }} onClick={handleClose}>
                        <CloseRoundedIcon />
                     </IconButton>

                  </Box>

               </Box>
            </Fade>
         </Modal>
      </div>
   );
}
