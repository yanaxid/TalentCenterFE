import { Button, useTheme } from "@mui/material"

const ButtonIconSquare = ({icon,onClick, type, disable}) =>{


   const theme = useTheme()
   return (
      <Button 
      variant="contained" 
      
      onClick={onClick}

      disabled={disable}

               sx={{
            
    
                  minWidth:'26px',
                  width:'26px',
                  height:'26px',
                  padding:'0px',
                  
                  borderRadius:'8px',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  boxShadow:'none',

                  backgroundColor: type == 'green' ? theme.palette.success.main : theme.palette.error.main,

                  

                  '&:hover':{
                     
                     backgroundColor: type == 'green' ? theme.palette.success.main : theme.palette.error.main,
                  }
                  }}>
                     {icon} 
                 
               </Button>
   )
}

export default ButtonIconSquare