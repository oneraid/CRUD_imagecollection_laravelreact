import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
