
import {useState } from "react";
import { createContext, useContext } from "react";



const activeButtonContext = createContext();

export const useActiveButtonContext = () => useContext(activeButtonContext);


const ActiveButtonProvider = ({ children }) => {
   const [activeButton, setActiveButton] = useState('dashboard')

   return (
      <activeButtonContext.Provider value={{ activeButton, setActiveButton }}>
         {children}
      </activeButtonContext.Provider>
   );
};

export default ActiveButtonProvider;