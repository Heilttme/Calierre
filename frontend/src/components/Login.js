import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { t } from 'i18next'

const Login = ({ authorize }) => {
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [errors, setErrors] = useState([])
  const [errorTypes, setErrorTypes] = useState([])
  const [rightPageData, setRightPageData] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
  
  const handleEnterPress = (e) => {
    if (e.key === "Enter") logIn()
  }

  return (
    <div className='login-page' onKeyDown={(e) => handleEnterPress(e)}>
      <div className='left-col'>
        <span className='header-login'>
          <h2>{t("Log in")}</h2>
          <a href='/#/sign_up'>{t("Create an account")}</a>
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
            <motion.label animate={formData.email || emailFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">{t("E-mail")}</motion.label>
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
            <motion.label animate={formData.password || passwordFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password">{t("Password")}</motion.label>
          </div>
          <div className='check-forgot'>
            <a href='/reset'>{t("Forgot your password?")}</a>
          </div>
          <button className='login-button' onClick={logIn}>{t("Log in")}</button>
        </div>
      </div>
      {/* <div className='right-col'>
        {
          // (rightPageData === null || errors.length === 0) ?
            <img src={testimonial}></img>
          // : rightPageData === 200 ?
          //   (
          //     <>
          //       <h2>You have successfully created an account</h2>
          //       <h2>Check your e-mail for a letter to verify your account</h2>
          //       <button>Send the letter again</button>
          //     </>
          //   )
          // : rightPageData === 400 && errors.length !== 0 &&
          //   (
          //     <>
          //       <h2>Whoops...</h2>
          //       <h2>Some errors occured here</h2>
          //       {errors.map(el => <p>{el.charAt(0).toUpperCase() + el.slice(1)}</p>)}
          //     </>
          //   )
        }
      </div> */}
      <ToastContainer
        limit={3}
      />
    </div>
  )
}

export default Login