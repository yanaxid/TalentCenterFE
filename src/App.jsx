import { useState } from 'react'
import Layout from './assets/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'



function App() {
   const [count, setCount] = useState(0)

   return (
      <BrowserRouter>
         <Toaster />
         <Layout />
      </BrowserRouter>
   )
}

export default App
