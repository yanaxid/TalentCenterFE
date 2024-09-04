
import {useEffect, useState } from "react";
import { createContext, useContext } from "react";



const colapseContext = createContext();
export const useColapse = () => useContext(colapseContext);


const ColapseProvider = ({ children }) => {


   const [colapse, setColapse] = useState(() => {
      const savedColapse = localStorage.getItem("colapse");
      return savedColapse !== null ? JSON.parse(savedColapse) : false;
   });


   useEffect(() => {
      localStorage.setItem("colapse", JSON.stringify(colapse));
   }, [colapse]);



   return (
      <colapseContext.Provider value={{ colapse, setColapse }}>
         {children}
      </colapseContext.Provider>
   );
};

export default ColapseProvider;