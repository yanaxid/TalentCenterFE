import { Box } from "@mui/material"
import Navbar from "../component/Navbar"
import Sidebar from "../component/Sidebar"
import Footer from "../component/Footer"
import Main from "../component/Main"
import InnerContentProvider from "../context/InnerContentProvider"

export default function RootPage() {

   return (
      <Box>
         <Navbar />

         <InnerContentProvider>
            <Main />
         </InnerContentProvider>

         <Sidebar />
         <Footer />
      </Box>
   )
}
