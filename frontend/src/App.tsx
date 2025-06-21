import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ShareBrain from './pages/ShareBrain'
import { ThemeProvider } from './context/themeContext'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brain/:shareLink" element={<ShareBrain />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
