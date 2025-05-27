import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ShareBrain from './pages/ShareBrain'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:shareLink" element={<ShareBrain />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
