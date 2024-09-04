import { createTheme } from '@mui/material';
import '../style/font.css'
import { green, grey } from '@mui/material/colors';



export const getTheme = (mode) =>
   createTheme({
      palette: {
         mode,

         
         primary: {
            main: mode === 'light' ? '#007aff' : '#007aff',
            contrastText: '#ffffff', 
            hover: mode === 'light' ? 'red' : 'red',
         },
         primary2: {
            main: mode === 'light' ? '#007aff' : '#007aff',
            contrastText: '#ffffff', 
         },
         secondary: {
            main: mode === 'light' ? '#9c27b0' : '#ce93d8', 
            contrastText: '#ffffff',
         },
         background: {
            default: mode === 'light' ? '#f5f5f5' : '#303030', 
            paper: mode === 'light' ? '#ffffff' : '#0f1214', 
         },
         text: {
            primary: mode === 'light' ? '#000000' : '#ffffff',
            secondary: mode === 'light' ? '#616161' : '#bdbdbd', 
            white: '#fff',
         },
         error: {
            main: mode === 'light' ? '#b92741' : '#b92741', 
         },
         warning: {
            main: '#ff9800', 
         },
         info: {
            main: '#2196f3',
         },
         success: {
            main: mode === 'light' ? green[400] : '#30a9527a', 
            hover: mode === 'light' ? green[500] : green[900]
         },

         dark_1: {
            main: mode === 'light' ? 'rgb(67 87 115)' : 'rgb(112 136 171)'
         },

         dark_2: {
            main: mode === 'light' ? '#E4EEF6' : '#E4EEF6'
         },

         dark_3: {
            main: mode === 'light' ? '#F1F6FF' : '#303030'
         },

         dark_4: {
            main: mode === 'light' ? grey[400] : grey[700],
            hover: mode === 'light' ? grey[500] : grey[800]
         },

         border_1: {
            main: mode === 'light' ? '#EAECF0' : '#202b33'
         },

         border_2: {
            main: mode === 'light' ? '#d8dde5' : '#343c41'
         },

         bg_1: {
            main: mode === 'light' ? '#F1F6FF' : '#0a0c0c'
         },

         chip:{
            main: '#007aff29'
         }
      },


      typography: {
         fontFamily: 'Poppins, Arial',
      }
   },);






   export const talent_status_name = (({ theme, talent }) => ({
      width: "fit-content",
      borderRadius: "20px",
      backgroundColor: talent.talentStatusName === 'Onsite' ? '#586A84' : '#DBDBDB',
      color: talent.talentStatusName === 'Onsite' ? 'white' : '#586A84',
      textAlign: 'center',
      padding: '2px 6px',
      fontSize: '.75rem',
   }));
   
   export const talent_employee_status = (({ theme, talent }) => ({
      width: "fit-content",
      borderRadius: "20px",
      backgroundColor: talent.employeeStatusName === 'Active' ? theme.palette.success.main : '#CF1D1D',
      color: 'white',
      textAlign: 'center',
      padding: '2px 6px',
      fontSize: '.75rem',
   }));


