import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import testimonial from "../images/negr.png"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import side from "../images/letter-flower.jpg"
import Input from './Input'

const SignUp = ({authenticated}) => {
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [password1Focus, setPassword1Focus] = useState(false)
  const [password2Focus, setPassword2Focus] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [pending, setPending] = useState(false)
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    authenticated && navigate("/") 
  }, [authenticated])

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
        let errors = new Set([...Object.keys(data.response.data)])
        if (errors.has("password")) setPasswordError(true)
        if (errors.has("username")) setUsernameError(true)
        if (errors.has("email")) setEmailError(true)
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
      <div className='login-form'>
        <div className='upper-body'>
          <span className='header-login'>
            <h2>{t("Sign up")}</h2>
          </span>
          <div className='form'>
            <Input name={"username"} label={"Username"} error={usernameError} setError={setUsernameError} onChange={(e) => changeFormData(e)} value={formData.username}/>
            <Input name={"email"} label={"E-mail"} error={emailError} setError={setEmailError} onChange={(e) => changeFormData(e)} value={formData.email}/>
            <Input name={"password1"} label={"Password"} error={passwordError} setError={setPasswordError} onChange={(e) => changeFormData(e)} value={formData.password1}/>
            <Input name={"password2"} label={"Password again"} error={passwordError} setError={setPasswordError} onChange={(e) => changeFormData(e)} value={formData.password2}/>

            <div className='button-pending'>
              <button className='login-button' onClick={signUp}>{t("Sign up")}</button>
              {pending && <div className='ring-wrapper'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>}
            </div>
          </div>
        </div>
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

export default SignUp