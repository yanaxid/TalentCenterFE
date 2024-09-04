import { Box, LinearProgress, Typography, useTheme } from "@mui/material"
import total_talent from '../img/total_talent.svg'
import available from '../img/available.svg'
import not_available from '../img/not_available.svg'
import total_request from '../img/mail.svg'
import like from '../img/like.svg'
import time from '../img/time.svg'



const content = [
   { title: "Daftar Talent", value: "140", icon: total_talent },
   { title: "Available", value: "140", icon: available },
   { title: "Not Available", value: "140", icon: not_available },
   { title: "Total Request", value: "140", icon: total_request },
   { title: "Request Selesai", value: "140", icon: like },
   { title: "Menunggu Persetujuan", value: "140", icon: time },
];


const content2 = [
   { title: "Programmer", value: 10 },
   { title: "Programmer", value: 10 },
   { title: "Programmer", value: 10 },
   { title: "Programmer", value: 10 },
   { title: "Programmer", value: 10 },
];







const ContentDasboard = () => {

   const theme = useTheme()

   return (
      <Box sx={{ width: '100%', height: '100%' }}>


         <Box sx={{ width: '100%', padding: '20px 0 20px 0', fontSize: '1rem', fontWeight: '500', color: theme.palette.dark_1.main }}>
            Dasboard
         </Box>




         {/* CONTETNT */}
         <Box sx={{
            width: '100%',
            // padding: '0 0 20px 0',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '9px',
            gap: '20px'

         }}>


            <Box sx={{ flexWrap: 'wrap', width: '100%', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
               {
                  content.map(

                     (data, index) => (
                        <Box key={index} sx={{
                           padding: '18px',
                           width: '30%',
                           backgroundColor: theme.palette.background.paper,
                           borderRadius: '12px',
                           display: 'flex',
                           justifyContent: 'space-between'

                        }}>
                           <Box>
                              <Typography sx={{ fontSize: '.9rem' }}>{data.title}</Typography>
                              <Typography sx={{ fontSize: '1.8rem', fontWeight: '700' }}>{data.value}</Typography>
                              <Typography sx={{ fontSize: '.7rem' }}>+6% Dari bulan lalu</Typography>
                           </Box>

                           <Box>
                              <img src={data.icon} alt="" />
                           </Box>
                        </Box>
                     )
                  )
               }

            </Box>

            <Box sx={{
               padding: '18px',
               width: '100%',
               backgroundColor: theme.palette.background.paper,
               borderRadius: '12px',
               display: 'flex',
               flexDirection: 'column'
            }}>

               {

                  content2.map(

                     (data, index) => (
                        <Box key={index} sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0px' }}>

                           <Box sx={{ width: '10px' }}>
                              {data.title}
                           </Box>


                           <Box sx={{ width: '85%' }}>
                              <LinearProgress variant="determinate" value={data.value} />
                           </Box>

                        </Box>

                     )


                  )
               }

            </Box>

           







         </Box>

      </Box>


   )
}

export default ContentDasboard