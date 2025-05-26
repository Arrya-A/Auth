import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/dashboard/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path={"/"} element={<Login/>} />
      <Route path={"/register"} element={<Register/>} />
      <Route path={'/home'} element={<Home/>} />
    </Routes>
    </>
  )
}

export default App
