import React, { useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from 'axios'

const Login = () => {
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const changeFormData = (e) => {
    if (e.target.type !== "checkbox"){
      setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    } else {
      setFormData(prev => ({...prev, rememberMe: e.target.checked}))
    }
  }

  const logIn = (e) => {
    const res = axios.post("http://127.0.0.1:8000/auth/token/login/", {email: formData.email, password: formData.password}).then(data => localStorage.setItem("k", data.data.auth_token))

  }

  return (
    <div className='login-page'>
      <div className='left-col'>
        <span className='header-login'>
          <h2>Log in</h2>
          <a href='/sign_up'>Create an account</a>
        </span>
        <div className='form'>
          <div className='email-block block'>
            <input
              name="email"
              id="email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              onChange={(e) => changeFormData(e)}
            />
            <motion.label animate={formData.email || emailFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">E-mail</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password"
              id="password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              onChange={(e) => changeFormData(e)}
            />
            <motion.label animate={formData.password || passwordFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password">Password</motion.label>
          </div>
          <div className='check'>
            <input 
              type="checkbox"
              id="remember"
              name="remember"
              onChange={(e) => changeFormData(e)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className='login-button' onClick={logIn}>Log in</button>
        </div>
      </div>
      <div className='right-col'>
        <img src={testimonial}></img>
      </div>
    </div>
  )
}

export default Login