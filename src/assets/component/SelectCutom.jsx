import { FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';


const form_control = ({ theme, width }) => ({
   m: 'none',
   minWidth: width != null ? width : 120,
   backgroundColor: theme.palette.background.paper,
   borderRadius: '7px',
   '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.border_1.main, // Ubah warna border default
      borderWidth: '1px', // Ubah ukuran border default
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      // borderColor: theme.palette.secondary.main, // Ubah warna border saat hover
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      //   border: '2px solid red', // Ubah warna border saat focused

   },
});



const input_label = {
   fontSize: '.9rem',
   padding: '0 15px 0 0',
   height: '24px',
   width: 'fit-content',
   top: '-3px',
   '&.Mui-focused, &.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
   },
}


const select_style = {
   borderRadius: '7px',
   height: '34px',
   fontSize: '.9rem',
   fontWeight: '400',
   '& .MuiOutlinedInput-root': {
      borderRadius: '7px',
      height: '34px',
   },

  
}

const menu_item_style = {
   fontSize: '0.85rem',
   borderRadius: '7px',
   margin: '4px',
   height: '30px',
    
}


const menu_props = ({theme}) => ({
   PaperProps: {
      sx: {
         borderRadius: '10px',
         mt: '7px',
         border:`1px solid ${theme.palette.border_1.main}`,
         backgroundColor:theme.palette.background.paper,
         backgroundImage:'none'
         
      },
   },
   MenuListProps: {
      sx: {
         padding: 0,
         // backgroundColor:theme.palette.background.paper
         
      },
   },
})







const SelectCustom = ({ index, filter, width, inputProps, error }) => {
   const theme = useTheme();

   return (
      <FormControl
         sx={form_control({ theme, width })}
         size="small"
         key={index}
      >
         <InputLabel
            id={filter.id}
            sx={input_label}
         >
            {filter.label}
         </InputLabel>

         <Select
            labelId={filter.id}
            id={filter.id}
            value={filter.age}
            label={filter.label}
            onChange={filter.handleChange}
            IconComponent={KeyboardArrowDownRoundedIcon}
            sx={select_style}

            MenuProps={menu_props({theme})}
            inputProps={inputProps}
            error={error}
         >
            {filter.options.map((option, index) => (
               <MenuItem
                  key={index}
                  value={option.value}
                  sx={menu_item_style}
               >
                  {option.label}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};

export default SelectCustom;

