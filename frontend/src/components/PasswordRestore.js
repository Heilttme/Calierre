import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PasswordRestore = ({tempEmail}) => {
  const [password1Focus, setPassword1Focus] = useState(false)
  const [password2Focus, setPassword2Focus] = useState(false)
  const { uid, token } = useParams()
  const [formData, setFormData] = useState({
    password1: "",
    password2: ""
  })
  
  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const submitData = () => {
    const res = axios.post("http://127.0.0.1:8000/auth/users/reset_password_confirm/", {uid, token, new_password: formData.password1, re_new_password: formData.password2, email: tempEmail})
  }
  
  return (
  <div className='password-restore'>
    <div className='form'>
      <h1>Enter new password</h1>
      <div className='password1-block block'>
        <input
          name='password1'
          id="password1"
          type="password"
          value={formData.password1}
          onChange={(e) => changeFormData(e)}
          className={``}
          onFocus={() => setPassword1Focus(true)}
          onBlur={() => setPassword1Focus(false)}
        />
        <motion.label animate={formData.password1 || password1Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password1">Password</motion.label>
      </div>
      <div className='password2-block block'>
        <input
          name='password2'
          id="password2"
          type="password"
          value={formData.password2}
          onChange={(e) => changeFormData(e)}
          className={``}
          onFocus={() => setPassword2Focus(true)}
          onBlur={() => setPassword2Focus(false)}
        />
        <motion.label animate={formData.password2 || password2Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password2">Password again</motion.label>
      </div>
      <button onClick={submitData}>Submit</button>
    </div>
  </div>
  )
}

export default PasswordRestore