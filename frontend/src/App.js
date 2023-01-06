import { Home, Login, SignUp, Navigation, Footer, Customize, ForgotPassword, Activate, Profile, PasswordRestore, Pay, Destination, LeaveReview } from "./components"
import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "./store";
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next";


const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    image: ""
  })
  

  const [blur, setBlur] = useState(true)
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
      if (localStorage.getItem("refresh")) {
        const res = axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {refresh: localStorage.getItem("refresh")}).then(data => {
          localStorage.setItem("access", data.data.access)

          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `JWT ${localStorage.getItem('access')}`,
              "Accept": "application/json"
            }
          }
           
          const res = axios.get("http://127.0.0.1:8000/auth/users/me/", config).then(data => setUserData({username: data.data.username, email: data.data.email, image: data.data.image}))
        })
      }
      
    } else {
      setUserData({
        username: "",
        email: "",
      })
    }

  }, [authenticated])

  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem("language"))

  const changeLanguage = () => {
    if (localStorage.getItem("language") === "en") {
      localStorage.setItem("language", "ru")
      i18n.changeLanguage("ru")
      setLanguage("ru")
    } else {
      localStorage.setItem("language", "en")
      i18n.changeLanguage("en")
      setLanguage("en")
    }
  }

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"))
  }, [])

  
  return (
    <div className="app" >
      <Navigation userData={userData}/>
      <main>
        <Routes>
          <Route path="/" element={<Home changeLanguage={changeLanguage} language={language} />} />
          <Route path="/login" element={<Login authorize={authorize}/>} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/customize" element={<Customize/>} />
          <Route path="/customize/destination" element={<Destination/>} />
          <Route path="/customize/destination/payment" element={<Pay />} />
          <Route path="/reset" element={<ForgotPassword setTempEmail={setTempEmail} />} />
          <Route path="/review" element={<LeaveReview />} />
          <Route path="/activate/:uid/:token" element={<Activate/>} />
          <Route path="/profile" element={<Profile userData={userData} authorize={authorize} setUserData={setUserData} />} /> 
          <Route path="password/reset/confirm/:uid/:token" element={<PasswordRestore userData={userData} tempEmail={tempEmail} />} />
        </Routes>
      </main>
      <Footer/>
    </div> 
  )
}

export default App;
