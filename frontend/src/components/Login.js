import React, { useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ authorize }) => {
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [errors, setErrors] = useState([])
  const [errorTypes, setErrorTypes] = useState([])
  const [rightPageData, setRightPageData] = useState(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  
  const changeFormData = (e) => {
    if (e.target.type !== "checkbox"){
      setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    } else {
      setFormData(prev => ({...prev, rememberMe: e.target.checked}))
    }
  }

  const logIn = (e) => {
    const res = axios.post("http://127.0.0.1:8000/auth/jwt/create/", {email: formData.email, password: formData.password})
    .then(data => {
      localStorage.setItem("access", data.data.access)
      localStorage.setItem("refresh", data.data.refresh)
      authorize(true)
      navigate("/")
    })
    .catch(data => {
      setRightPageData(400)
      setErrorTypes([...new Set([...Object.keys(data.response.data)])])
      setErrors([...Object.values(data.response.data).filter(el => el[0] !== 'This field may not be blank.')])
    })
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
              className={`${errorTypes.includes("detail") && "error"}`}
            />
            <motion.label animate={formData.email || emailFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">E-mail</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password"
              id="password"
              type="password"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              onChange={(e) => changeFormData(e)}
              className={`${errorTypes.includes("detail") && "error"}`}
            />
            <motion.label animate={formData.password || passwordFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password">Password</motion.label>
          </div>
          <div className='check-forgot'>
            <a href='/reset'>Forgot your password?</a>
          </div>
          <button className='login-button' onClick={logIn}>Log in</button>
        </div>
      </div>
      <div className='right-col'>
        {
          (rightPageData === null || errors.length === 0) ?
            <img src={testimonial}></img>
          : rightPageData === 200 ?
            (
              <>
                <h2>You have successfully created an account</h2>
                <h2>Check your e-mail for a letter to verify your account</h2>
                <button>Send the letter again</button>
              </>
            )
          : rightPageData === 400 && errors.length !== 0 &&
            (
              <>
                <h2>Whoops...</h2>
                <h2>Some errors occured here</h2>
                {errors.map(el => <p>{el.charAt(0).toUpperCase() + el.slice(1)}</p>)}
              </>
            )
        }
      </div>
    </div>
  )
}

export default Login