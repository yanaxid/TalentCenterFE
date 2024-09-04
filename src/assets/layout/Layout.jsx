import { Routes, Route } from "react-router-dom"
import RootPage from "../page/RootPage"
import ThemeContextProvider from "../context/ThemeContextProvider";
import ColapseProvider from "../context/ColapseProvider";
import ActiveButtonProvider from "../context/ActiveButtonProvider";


const Layout = () => {

  

   return (

      
      <ThemeContextProvider>
         <ColapseProvider>
            <ActiveButtonProvider>

               <Routes>
                  <Route path="/" element={<RootPage />} />
               </Routes>


            </ActiveButtonProvider>
         </ColapseProvider>
      </ThemeContextProvider>
   )
}

export default Layout;