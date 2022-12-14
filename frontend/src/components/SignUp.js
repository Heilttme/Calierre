import React, { useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"

const SignUp = () => {
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [password1Focus, setPassword1Focus] = useState(false)
  const [password2Focus, setPassword2Focus] = useState(false)
  
  return (
    <div className='login-page'>
      <div className='left-col'>
        <span className='header-login'>
          <h2>Sign up</h2>
        </span>
        <div className='form'>
          <div className='email-block block'>
            <input
              name="username"
              id="username"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
            />
            <motion.label animate={usernameFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="username">Username</motion.label>
          </div>
          
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
              name="password1"
              id="password1"
              onFocus={() => setPassword1Focus(true)}
              onBlur={() => setPassword1Focus(false)}
            />
            <motion.label animate={password1Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password1">Password</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password2"
              id="password2"
              onFocus={() => setPassword2Focus(true)}
              onBlur={() => setPassword2Focus(false)}
            />
            <motion.label animate={password2Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password2">Password again</motion.label>
          </div>

          <button className='login-button'>Sign up</button>
        </div>
      </div>
      <div className='right-col'>
        <img src={testimonial}></img>
      </div>
    </div>
  )
}

export default SignUp