


import { InputAdornment, TextField, useTheme } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React, { useState } from "react";


const search_style = ({ theme }) => ({
   borderRadius: '7px',
   backgroundColor: theme.palette.background.paper,
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: theme.palette.border_1.main, // Mengubah warna border default
      },
      '&:hover fieldset': {
         // borderColor: 'red', // Mengubah warna border saat hover
      },
      '&.Mui-focused fieldset': {
         // borderColor: 'red', // Mengubah warna border saat fokus
      },
      borderRadius: '7px',
      fontSize: '.9rem',
      fontWeight: '400',
      paddingLeft: '6px',
   },
   '& .MuiInputBase-input': {
      height: '14px',
      padding: '10px 10px 10px 4px',
   },
})

const icon_style = ({ theme, focused }) => ({
   marginRight: '0px',
   color: focused ? theme.palette.primary.main : 'inherit',
})






const SearchField = ({ action, placeholder }) => {
   const theme = useTheme();
   const [focused, setFocused] = useState(false);

   return (
      <TextField
         id="outlined-size-small"
         size="small"
         placeholder={placeholder}
         onChange={action}
         onFocus={() => setFocused(true)}
         onBlur={() => setFocused(false)}
         InputProps={{
            startAdornment: (
               <InputAdornment
                  position="start"
                  sx={{ marginRight: '0px', }}
               >
                  <SearchRoundedIcon fontSize="small" sx={icon_style({ theme, focused })} />
               </InputAdornment>
            ),
         }}
         sx={search_style({ theme })}
      />
   );
};

export default SearchField;

