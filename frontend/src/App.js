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
import useStore from "./store";
import PasswordRestore from "./components/PasswordRestore"


const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  })

  const [tempEmail, setTempEmail] = useState("")
  
  const authenticated = useStore(state => state.authenticated)
  const authorize = useStore(state => state.authorize)

  useEffect(() => {
    if (localStorage.getItem("access")) {
      authorize(true)
    }
  }, [])
  
  
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
    } else {
      setUserData({
        username: "",
        email: "",
      })
    }

  }, [authenticated])

  
  return (
    <div className="app">
      <Navigation userData={userData}/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login authorize={authorize}/>} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/customize" element={<Customize/>} />
          <Route path="/reset" element={<ForgotPassword setTempEmail={setTempEmail} />} />
          <Route path="/activate/:uid/:token" element={<Activate/>} />
          <Route path="/profile" element={<Profile userData={userData} authorize={authorize}/>} /> 
          <Route path="password/reset/confirm/:uid/:token" element={<PasswordRestore userData={userData} tempEmail={tempEmail} />} />
        </Routes>
      </main>
      <Footer/>
    </div> 
  )
}

export default App;
