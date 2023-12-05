import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { t } from 'i18next'
import { useStore } from 'zustand'
import side from "../images/envelope-flower.jpg"

const Login = ({ authorize, authenticated }) => {
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [errors, setErrors] = useState([])
  const [errorTypes, setErrorTypes] = useState([])
  const [rightPageData, setRightPageData] = useState(null)
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    authenticated && navigate("/") 
  }, [authenticated])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  
  const changeFormData = (e) => {
    if (e.target.type !== "checkbox"){
      setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    } else {
      setFormData(prev => ({...prev, rememberMe: e.target.checked}))
    }
  }

  
  const logIn = () => {
    const res = axios.post("/auth/jwt/create/", {email: formData.email, password: formData.password})
    .then(data => {
      authorize(true)
      localStorage.setItem("access", data.data.access)
      localStorage.setItem("refresh", data.data.refresh)
      navigate("/")
    })
    .catch(data => {
      setRightPageData(400)
      setErrorTypes([...new Set([...Object.keys(data.response.data)])])
      const errorsNow = [...Object.values(data.response.data).filter(el => el[0] !== 'This field may not be blank.')]
      for (let i = 0; i < errorsNow.length; i++) {
        toast.error(t(errorsNow[i]), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        })
      }
    })
  }

  return (
    <div className='login-page'>
      <div className='login-form'>
        <div className='upper-body'>
          <span className='header-login'>
            <h2>{t("Log in")}</h2>
            <Link to='/sign_up'>{t("Create an account")}</Link>
          </span>
          <div className='form'>
            <div className='email-block block'>
              <input
                name="email"
                id="email"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                onChange={(e) => changeFormData(e)}
                className={`${errorTypes.includes("email") && "error"}`}
              />
              <motion.label 
                animate={formData.email || emailFocus ? {y: mobile ? -32 : -28, x: -14, fontSize: "16px", color: "rgb(255, 255, 255)"} : {color: "rgb(0, 0, 0)"}} 
                transition={{color: {duration: .3}}}
                className='text-label'  
                htmlFor="email"
              >
                {t("E-mail")}
              </motion.label>
            </div>

            <div className='password-block block'>
              <input
                name="password"
                id="password"
                type="password"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onChange={(e) => changeFormData(e)}
                className={`${errorTypes.includes("password") && "error"}`}
              />
              <motion.label
                animate={formData.password || passwordFocus ? {y: mobile ? -32 : -28, x: -14, fontSize: "16px", color: "rgb(255, 255, 255)"} : {color: "rgb(0, 0, 0)"}} 
                transition={{color: {duration: .3}}}
                className='text-label'  
                htmlFor="password"
              >
                {t("Password")}
              </motion.label>
            </div>
            <div className='check-forgot'>
              <Link to='/reset'>{t("Forgot your password?")}</Link>
            </div>
          </div>
        </div>
        <button className='login-button' onClick={logIn}>{t("Log in")}</button>
      </div>
      <div className='side-login'>
        <img className='side-image' src={side}/>
        <div class="shadow-overlay"></div>
        <div className='text'>
          <p>Sign in & order</p>
          <p>Make your order & get it the same day</p>
        </div>
      </div>
      <ToastContainer
        limit={3}
      />
    </div>
  )
}

export default Login