import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import Customize from "./components/Customize"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    if (localStorage.getItem("k")){
      const res = axios.post("http://127.0.0.1:8000/auth/token/login/" )
    }
  
  }, [])
  
  
  return (
    <div className="app">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign_up" element={<SignUp/>} />
        <Route path="/customize" element={<Customize/>} />
        <Route path="/reset" element={<ForgotPassword/>} />
        {/* <Route path="/activate/:uid/:token" element={<Activate/>} /> */}
      </Routes>
      <Footer/>
    </div> 
  )
}

export default App;
