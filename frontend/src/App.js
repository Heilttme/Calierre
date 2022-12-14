import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import Customize from "./components/Customize"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div className="app">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign_up" element={<SignUp/>} />
        <Route path="/customize" element={<Customize/>} />
      </Routes>
      <Footer/>
    </div> 
  )
}

export default App;
