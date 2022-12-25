import React, { useEffect } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"

const Activate = () => {
  const { uid, token } = useParams()  

  useEffect(() => {
    const res = axios.post(`http://127.0.0.1:8000/auth/users/activation/`, {uid, token})
  }, [])
  
  return (
    <div className='activate'>
      <h1>Account verification</h1>
      <p>You have successfully verified your account!</p>
      <p>You may now log in and order a letter.</p>
      <a href="/login">Log in</a>
    </div>
  )
}

export default Activate