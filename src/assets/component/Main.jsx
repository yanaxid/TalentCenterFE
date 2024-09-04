
import { Box, useTheme } from "@mui/material";
import React, { memo } from "react";
import ContentDaftarTalent from "./ContentDaftarTalent";
import ContentAddTalent from "./ContentAddTalent";
import ContentClient from "./ContentClient";
import ContentDasboard from "./ContentDasboard";
import ContentDaftarPersetujuan from "./ContentDaftarPersetujuan.jsx";
import ContentEditTalent from "./ContentEditTalent.jsx";
import ContentDetailTalent from "./ContentDetailTalent.jsx";
import { useColapse } from "../context/ColapseProvider.jsx";
import { useActiveButtonContext } from "../context/ActiveButtonProvider.jsx";
import InnerContentProvider, { useInner } from "../context/InnerContentProvider.jsx";



const sty1 = ({ colapse }) => ({
   width: '100%',
   height: 'calc(100vh - 50px)',
   marginTop: '50px',
   padding: `0 0 70px ${colapse ? '50px' : '220px'}`,
   overflow: 'auto',
   transition: '.3s',
})

const sty2 = {
   width: '100%',
   padding: '0 20px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
}



const Main = () => {

   console.log('-> MAIN')

   const { colapse } = useColapse()
   const { activeButton } = useActiveButtonContext()

   const { innerContent, setInnerContent } = useInner()

   React.useEffect(() => {
      setInnerContent('')
   }, [activeButton]);



   // --> NAVIGATE
   const renderContent = () => {
      switch (activeButton) {

         case 'talent':
         case 'talent_back':



            switch (innerContent.nav) {
               case 'add_talent':
                  return <ContentAddTalent />
               case 'edit_talent':
                  return <ContentEditTalent />
               case 'detail_talent':
                  return <ContentDetailTalent />
               default:
                  return <ContentDaftarTalent />
            }

         case 'client':
            return <ContentClient />;
         case 'dashboard':
            return <ContentDasboard />;
         case 'approval':
            return <ContentDaftarPersetujuan />;
         default:
            return null;
      }
   }



   return (
      <Box className="_main" sx={sty1({ colapse })}>
         <Box sx={sty2}>
            {renderContent()}
         </Box>
      </Box>
   );
};

export default memo(Main)

