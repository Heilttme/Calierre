import React, { useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"

const Login = () => {
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  
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
            />
            <motion.label animate={emailFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">E-mail</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password"
              id="password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <motion.label animate={passwordFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password">Password</motion.label>
          </div>
          <div className='check'>
            <input 
              type="checkbox"
              id="remember"
              name="remember"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className='login-button'>Log in</button>
        </div>
      </div>
      <div className='right-col'>
        <img src={testimonial}></img>
      </div>
    </div>
  )
}

export default Login