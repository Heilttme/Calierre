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
import Activate from "./components/Activate";
import Profile from "./components/Profile";

const App = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    if (localStorage.getItem("access")){
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${localStorage.getItem('access')}`,
          "Accept": "application/json"
        }
      }
      const res = axios.get("http://127.0.0.1:8000/auth/users/me/", config).then(data => setUserData({username: data.data.username, email: data.data.email}))
    }
  }, [])
  
  return (
    <div className="app">
      <Navigation userData={userData}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign_up" element={<SignUp/>} />
        <Route path="/customize" element={<Customize/>} />
        <Route path="/reset" element={<ForgotPassword/>} />
        <Route path="/activate/:uid/:token" element={<Activate/>} />
        <Route path="/profile" element={<Profile userData={userData}/>} />
      </Routes>
      <Footer/>
    </div> 
  )
}

export default App;
