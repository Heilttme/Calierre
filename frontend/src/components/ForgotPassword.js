import React, { useState } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { t } from 'i18next'
 
const ForgotPassword = ({setTempEmail}) => {
  const [emailData, setEmailData] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)
  const [pending, setPending] = useState(false)
  const [errorTypes, setErrorTypes] = useState([])

  
  const sendPasswordReset = () => {
    setPending(true)
    const res = axios.post("http://127.0.0.1:8000/auth/users/reset_password/", {email: emailData})
        .then(data => {
          toast.success(t('Successfuly sent. Check your e-mail'), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
          })
          setPending(false)
          setTempEmail(emailData)
        })
        .catch(data => {
          setPending(false)
        })
  }
  
  return (
    <div className='forgot-page'>
      <h1>{t("Forgot your password?")}</h1>
      <p>{t("Enter e-mail to get a link to reset your password")}</p>
      <div className='email-block block'>
          <input
            name="email"
            id="email"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChange={(e) => setEmailData(e.target.value)}
          />
          <motion.label animate={emailData || emailFocus ? {y: -30, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">{t("E-mail")}</motion.label>
        </div>
      <div className='button'>
        <button onClick={sendPasswordReset}>{t("Send")}</button>
        {pending && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
      </div>
      <ToastContainer />
    </div>
  )
}

export default ForgotPassword