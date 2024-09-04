import { Box, useTheme } from "@mui/material"
import { useColapse } from "../context/ColapseProvider"
import { sidebar_box, sidebar_button_colapse, sidebar_logo } from "../style/Style"
import { Stack } from "@mui/material"
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

import logo from '../img/logo.png'
import logogram from '../img/logogram.png'
import React from "react";
import ButtonSidebar from "./ButtonSidebar";
import ButtonSidebarDropdown from "./ButtonSidebarDropdown";
import ButtonColapse from "./ButtonColapse";
import { useActiveButtonContext } from "../context/ActiveButtonProvider";







const Sidebar = () => {

   console.log("-> SIDEBAR")

   const theme = useTheme()
   const { colapse, setColapse } = useColapse()

   const { activeButton, setActiveButton } = useActiveButtonContext()




   return (

      <Box className='_sidebar' sx={sidebar_box({ theme, colapse })}>


         <Box sx={sidebar_logo}>
            <img width={colapse ? '30px' : '120px'} src={colapse ? logogram : logo} alt="" />
         </Box>



         <Box sx={{ height: '430px', overflow: 'auto' }}>

            <Stack direction="column" spacing={2} sx={{ p: '0 10px', m: '30px 0' }}>


               <ButtonSidebar
                  icon={<DashboardRoundedIcon />}
                  text="Dashboard"
                  active={activeButton === 'dashboard'}
                  onClick={() => setActiveButton('dashboard')}
               />
               <ButtonSidebar
                  icon={<PeopleAltRoundedIcon />}
                  text="Daftar Talent"
                  active={activeButton === 'talent' || activeButton === 'talent_back'}
                  onClick={() => activeButton == 'talent' ? setActiveButton('talent_back') : setActiveButton('talent')}
               />
               <ButtonSidebar
                  icon={<BusinessCenterRoundedIcon />}
                  text="Daftar Client"
                  active={activeButton === 'client'}
                  onClick={() => setActiveButton('client')}
               />
               <ButtonSidebar
                  icon={<AssignmentRoundedIcon />}
                  text="Daftar Persetujuan Talent"
                  active={activeButton === 'approval'}
                  onClick={() => setActiveButton('approval')}
               />

               <ButtonSidebarDropdown
                  icon={<AccountCircleRoundedIcon />}
                  text="Kelola User"
                  active={activeButton === 'user'}
                  onClick={() => setActiveButton('user')}
               />

               <ButtonSidebarDropdown
                  icon={<StorageRoundedIcon />}
                  text="Kelola Master Data"
                  active={activeButton === 'master'}
                  onClick={() => setActiveButton('master')}
               />
            </Stack>
         </Box>


         <Box sx={sidebar_button_colapse}>
            <ButtonColapse />
         </Box>


      </Box>
   )
}

export default Sidebar



