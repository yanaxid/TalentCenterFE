
import { useTheme, TextField } from "@mui/material";




const DatePickerCustom = ({ inputProps, onChange, value, error, }) => {
   const theme = useTheme();

   const convertDate = (time) => {
      const [month, day, year] = time.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   };

   return (

      <>
         <TextField
            type="date"
            variant="outlined"
            placeholder="Pilih tanggal"
            value={value != '' ? convertDate(value) : ''}

            onChange={onChange}
            sx={{
               height: '34px',
               minWidth: 'fit-content',
               width: 'fit-content',
               backgroundColor: theme.palette.background.paper,
               '& .MuiOutlinedInput-root': {
                  borderRadius: '7px',
                  height: '34px',
                  fontSize: '.9rem',
               },
               '& .MuiInputBase-input': {
                  fontSize: '.9rem',

               },
            }}
            inputProps={inputProps}
            error={error}
         />



      </>
   );
};

export default DatePickerCustom;
