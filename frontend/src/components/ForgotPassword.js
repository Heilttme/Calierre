import React, { useState } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'

 
const ForgotPassword = ({setTempEmail}) => {
  const [emailData, setEmailData] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)
  const sendPasswordReset = () => {
    setPending(true)
    const res = axios.post("http://127.0.0.1:8000/auth/users/reset_password/", {email: emailData})
        .then(data => {
          setStatus(data.status)
          setPending(false)
          setTempEmail(emailData)
        })
        .catch(data => {
          setStatus(data.status)
          setPending(false)
        })
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
      <div className='button'>
        <button onClick={sendPasswordReset}>Send</button>
        {pending && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
      </div>
      <motion.h2 
          animate={{opacity: status != null ? 1 : 0}}
          className='success-reset'
      >
          Check your e-mail for a letter
      </motion.h2>
    </div>
  )
}

export default ForgotPassword