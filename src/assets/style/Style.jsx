export const sidebar_box = ({ theme, colapse }) => ({

   borderRight: `1px solid ${theme.palette.border_1.main}`,
   width: colapse ? '50px' : '220px',
   height: '100vh',
   position: 'fixed',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   zIndex: '2',
   top: '0',
   transition: '.3s',
   backgroundColor: theme.palette.background.paper

})


export const navbar_box = ({ theme }) => ({

   borderBottom: `1px solid ${theme.palette.border_2.main}`,
   width: '100%',
   height: '50px',
   position: 'fixed',
   top: '0',
   zIndex: '1',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'end',
   padding: '0 20px',
   gap: '10px',
   backgroundColor: theme.palette.background.paper,

})





export const footer_box = ({ theme }) => ({

   borderBottom: `1px solid  ${theme.palette.border_1.main}`,
   width: '100%',
   height: '50px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '0 20px',
   gap: '10px',
   backgroundColor: theme.palette.background.paper,
   color: theme.palette.dark_1.main,
   fontSize: '.85rem',
   fontWeight: '500'

})


export const footer_bg = ({ theme }) => ({
   backgroundColor: theme.palette.bg_1.main,
   width: '100%',
   minHeight: '100vh',
   position: 'fixed',
   bottom: '0',
   display: 'flex',
   alignItems: 'end',
   zIndex: '-1'
})

export const sidebar_logo = { 
   display: 'flex', 
   justifyContent: 'center', 
   alignItems: 'center', 
   width: '100%', 
   height: '100px' 
}

export const sidebar_button_colapse ={ 
   position: 'absolute', 
   bottom: '50px', 
   display: 'flex', 
   justifyContent: 'center', 
   width: '100%' 
}


