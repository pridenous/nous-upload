import { useState } from 'react'
import './App.css'
import UploadMenu from './pages/UploadMenu'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UploadMenu/>} />
      </Routes>
    </>
  )
}

export default App
