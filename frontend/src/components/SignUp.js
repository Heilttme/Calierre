import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { t } from 'i18next'


const SignUp = () => {
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [password1Focus, setPassword1Focus] = useState(false)
  const [password2Focus, setPassword2Focus] = useState(false)
  const [errorTypes, setErrorTypes] = useState([])
  const [pending, setPending] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const signUp = () => {
    setPending(true)
    const req = axios.post("/auth/users/", {username: formData.username, email: formData.email, password: formData.password1, re_password: formData.password2})
      .then(data => {
        setPending(false)
        localStorage.getItem("access")
        localStorage.getItem("refresh")
        toast.success(t("Confirmation letter was send successfully"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        })
        setTimeout(() => {
          toast.info(t("Activate your account before logging in"), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
          })
        }, 1000)
      })
      .catch(data => {
        setPending(false)
        setErrorTypes([...new Set([...Object.keys(data.response.data)])])
        const errorsNow = [...Object.values(data.response.data).filter(el => el[0] !== 'This field may not be blank.')]
        for (let i = 0; i < errorsNow.length; i++) {
          toast.error(t(errorsNow[i][0]), {
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
    if (e.key === "Enter") signUp()
  }

  return (
    <div className='login-page' onKeyDown={(e) => handleEnterPress(e)}>
      <div className='left-col'>
        <span className='header-login'>
          <h2>{t("Sign up")}</h2>
        </span>
        <div className='form'>
          <div className='username-block block'>
            <input
              name="username"
              id="username"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              onChange={(e) => changeFormData(e)}
              className={`${errorTypes.includes("username") && "error"}`}
            />
            <motion.label animate={formData.username || usernameFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="username">{t("Username")}</motion.label>
          </div>
          
          <div className='email-block block'>
            <input
              name="email"
              id="email"
              type="email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              onChange={(e) => changeFormData(e)}
              className={`${errorTypes.includes("email") && "error"}`}
            />
            <motion.label animate={formData.email || emailFocus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="email">{t("E-mail")}</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password1"
              id="password1"
              type="password"
              onFocus={() => setPassword1Focus(true)}
              onBlur={() => setPassword1Focus(false)}
              onChange={(e) => changeFormData(e)}
              className={`${(errorTypes.includes("password") || errorTypes.includes("non_field_errors")) && "error"}`}
            />
            <motion.label animate={formData.password1 || password1Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password1">{t("Password")}</motion.label>
          </div>

          <div className='password-block block'>
            <input
              name="password2"
              id="password2"
              type="password"
              onFocus={() => setPassword2Focus(true)}
              onBlur={() => setPassword2Focus(false)}
              onChange={(e) => changeFormData(e)}
              className={`${(errorTypes.includes("password") || errorTypes.includes("non_field_errors")) && "error"}`}
            />
            <motion.label animate={formData.password2 || password2Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password2">{t("Password again")}</motion.label>
          </div>
          <div className='button-pending'>
            <button className='login-button' onClick={signUp}>{t("Sign up")}</button>
            {pending && <div className='ring-wrapper'>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>}
          </div>
        </div>
      </div>
      {/* <div className='right-col'>
            <img src={testimonial}></img>
      </div> */}
      <ToastContainer
        limit={3}
       />
    </div>
  )
}

export default SignUp