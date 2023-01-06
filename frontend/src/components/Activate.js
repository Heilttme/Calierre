import React, { useEffect } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { t } from 'i18next'

const Activate = () => {
  const { uid, token } = useParams()  

  useEffect(() => {
    const res = axios.post(`http://127.0.0.1:8000/auth/users/activation/`, {uid, token})
  }, [])
  
  return (
    <div className='activate'>
      <h1>{t("Account verification")}</h1>
      <p>{t("You have successfully verified your account!")}</p>
      <p>{t("You may now log in and order a letter.")}</p>
      <a href="/login">{t("Log in")}</a>
    </div>
  )
}

export default Activate