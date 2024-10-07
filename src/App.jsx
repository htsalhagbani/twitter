import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-end items-center bg-[lightpink]'>
    <Sidebar/>
    </div>
   </>
  )
}

export default App
