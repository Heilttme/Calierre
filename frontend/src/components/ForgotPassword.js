import React, { useState } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'

 
const ForgotPassword = () => {
  const [emailData, setEmailData] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)
  const [status, setStatus] = useState(false)
      
  const sendPasswordReset = () => {
    const res = axios.post("http://127.0.0.1:8000/auth/users/reset_password/", {email: emailData})
        .then(data => setStatus(data.status))
  }
  
  return (
    <div className='forgot-page'>
      <h1>Forgot your password?</h1>
      <p>Enter e-mail to get a link to reset your password</p>
      <div className='email-block block'>
          <input
            name="email"
            id="email"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e) => setEmailData(e.target.value)}
          />
          <motion.label animate={emailData || emailFocus ? {y: -30, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">E-mail</motion.label>
        </div>
      <button onClick={sendPasswordReset}>Send</button>
      <motion.h2 
          animate={{opacity: status == 204 ? 1 : 0}}
          className='success-reset'
      >
          Check your e-mail for a letter
      </motion.h2>
    </div>
  )
}

export default ForgotPassword