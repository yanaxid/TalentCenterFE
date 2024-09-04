import { Button, useTheme } from "@mui/material"

const ButtonIcon = ({state, icon,text,onClick}) =>{

   const theme = useTheme()
   return (


      state ?

      <Button 
      variant="contained" 
      startIcon={icon} 
      onClick={onClick}

      

               sx={{
                  fontSize:'.85rem', 
                  textTransform:'capitalize', 
                  lineHeight:'1rem', 
                  minWidth:'fit-content',
                  // padding:'8px 12px',
                  borderRadius:'7px',
                  boxShadow:'none',
                  padding:'0px 10px',
                  height:'32px',

                  '&:hover':{
                     backgroundColor:theme.palette.primary.main
                  }
                  }}>
                  {text}
               </Button>

               :

               <Button 
      variant="contained" 
      startIcon={icon} 
      onClick={onClick}

      

               sx={{
                  fontSize:'.85rem', 
                  textTransform:'capitalize', 
                  lineHeight:'1rem', 
                  minWidth:'fit-content',
                  // padding:'8px 12px',
                  borderRadius:'7px',
                  boxShadow:'none',
                  padding:'0px 10px',
                  height:'32px',

                  '&:hover':{
                     backgroundColor:theme.palette.primary.main
                  }
                  }} disabled>
                  {text}
               </Button>


   )
}

export default ButtonIcon