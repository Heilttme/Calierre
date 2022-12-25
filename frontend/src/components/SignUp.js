import React, { useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from "axios"

const SignUp = () => {
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [password1Focus, setPassword1Focus] = useState(false)
  const [password2Focus, setPassword2Focus] = useState(false)
  const [rightPageData, setRightPageData] = useState(null)
  const [errors, setErrors] = useState([])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  })

  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const signUp = () => {
    if (formData.password1 === formData.password2) {
      const req = axios.post("http://127.0.0.1:8000/auth/users/", {username: formData.username, email: formData.email, password: formData.password1, re_password: formData.password2})
        .then(data => setRightPageData(200))
        .catch(data => {
          setRightPageData(400)
          setErrors(data)
        })
    }
  }

  return (
    <div className='login-page'>
      <div className='left-col'>
        <span className='header-login'>
          <h2>Sign up</h2>
        </span>
        <div className='form'>
          <div className='username-block block'>
            <input
              name="username"
              id="username"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              onChange={(e) => changeFormData(e)}
            />
            <motion.label animate={formData.username || usernameFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="username">Username</motion.label>
          </div>
          
          <div className='email-block block'>
            <input
              name="email"
              id="email"
              type="email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              onChange={(e) => changeFormData(e)}
            />
            <motion.label animate={formData.email || emailFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">E-mail</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password1"
              id="password1"
              type="password"
              onFocus={() => setPassword1Focus(true)}
              onBlur={() => setPassword1Focus(false)}
              onChange={(e) => changeFormData(e)}
            />
            <motion.label animate={formData.password1 || password1Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password1">Password</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password2"
              id="password2"
              type="password"
              onFocus={() => setPassword2Focus(true)}
              onBlur={() => setPassword2Focus(false)}
              onChange={(e) => changeFormData(e)}
            />
            <motion.label animate={formData.password2 || password2Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password2">Password again</motion.label>
          </div>

          <button className='login-button' onClick={signUp}>Sign up</button>
        </div>
      </div>
      <div className='right-col'>
        {
          rightPageData === null ?
            <img src={testimonial}></img>
          : rightPageData === 200 ?
            (
              <>
                <h2>You have successfully created an account</h2>
                <h2>Check your e-mail for a letter to verify your account</h2>
                <button>Send the letter again</button>
              </>
            )
          : rightPageData === 400 &&
            (
              <>
                {/* <h2>Whoops...</h2>
                <h2>Some errors occured here:</h2>
                {errors.map(el => <)} */}
              </>
            )
        }
      </div>
    </div>
  )
}

export default SignUp