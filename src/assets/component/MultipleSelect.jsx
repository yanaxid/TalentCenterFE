import React, { useState } from 'react';
import { Box, InputLabel, Select, OutlinedInput, MenuItem, Chip, FormControl, useTheme, Typography } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';


const form_control = {
   fontSize: '.9rem',
   padding: '0 15px 0 0',
   height: '24px',
   width: 'fit-content',
   top: '-9px',
   '&.Mui-focused, &.MuiInputLabel-shrink': {
      transform: 'translate(14px,2px) scale(0.75)',
   },
}

const select_sty ={
   borderRadius: '7px',
   minHeight: '34px',
   height: 'fit-content',
   fontSize: '.9rem',
   fontWeight: '400',
   '& .MuiOutlinedInput-root': {
      borderRadius: '7px',
      height: '34px',
   },
   '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px',
   },
}


const chip = ({theme})=>({
   height: '25px',
   borderRadius: '4px',
   backgroundColor:theme.palette.chip.main,
   '& .MuiChip-label': {
      padding: '2px 8px',
      fontSize: '.8rem',
   }
})

const menu_prop_sty =({theme}) => ({
   PaperProps: {
      sx: {
         maxHeight: 200,
         overflowY: 'auto',
         mt: '7px',
         borderRadius: '10px',
         border:`1px solid ${theme.palette.border_1.main}`,
         backgroundColor:theme.palette.background.paper,
         backgroundImage:'none'
      },
   },
   MenuListProps: {
         sx: {
            padding: 0,
         },
   },
})


const MultipleSelect = ({ data, label, idKey, nameKey, selectedValue, onChange, inputProps, error}) => {
   const theme = useTheme();



   return (
      <FormControl sx={{ m: 1, width: '100%', margin: '0px' }}>
         <InputLabel id="demo-multiple-chip-label" sx={form_control}
         />
         <Select

            sx={select_sty}
            IconComponent={KeyboardArrowDownRoundedIcon}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selectedValue}
            onChange={(event) => onChange(event.target.value)}
            input={<OutlinedInput id="select-multiple-chip"

            />}
            renderValue={(selected) => (

               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((id) => {
                     const item = data.find(pos => pos[idKey] === id);
                     return (
                        <Chip
                           key={id}
                           label={item?.[nameKey]}
                           sx={chip({theme})}
                        />
                     );
                  })}
               </Box>
            )}

    

            MenuProps={menu_prop_sty({theme})}
            inputProps={inputProps}
            error={error}
         >
            {data && data.map((item) => (
               <MenuItem
                  key={item[idKey]}
                  value={item[idKey]}
                  style={{
                     fontWeight: selectedValue.indexOf(item[idKey]) === -1
                        ? theme.typography.fontWeightRegular
                        : theme.typography.fontWeightMedium,

                     fontSize: '0.85rem',
                     borderRadius: '7px',
                     margin: '4px',
                     height: '30px'
                  }}
               >
                  {item[nameKey]}
               </MenuItem>
            ))}
         </Select>

      </FormControl>
   );
};


export default MultipleSelect

