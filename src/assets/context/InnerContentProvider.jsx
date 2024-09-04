
import {useState } from "react"
import { createContext, useContext } from "react"



const innerContext = createContext()

export const useInner = () => useContext(innerContext)


const InnerContentProvider = ({ children }) => {
   const [innerContent, setInnerContent] = useState({})
   
   return (
      <innerContext.Provider value={{ innerContent, setInnerContent }}>
         {children}
      </innerContext.Provider>
   );
};

export default InnerContentProvider