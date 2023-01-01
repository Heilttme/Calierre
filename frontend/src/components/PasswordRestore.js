import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PasswordRestore = ({tempEmail}) => {
  const [password1Focus, setPassword1Focus] = useState(false)
  const [password2Focus, setPassword2Focus] = useState(false)
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    password1: "",
    password2: ""
  })

  const navigate = useNavigate()
  const { uid, token } = useParams()
  
  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const submitData = () => {
    setPending(true)
    const res = axios.post("http://127.0.0.1:8000/auth/users/reset_password_confirm/", {uid, token, new_password: formData.password1, re_new_password: formData.password2, email: tempEmail})
    .then(data => {
      setPending(false)
      toast.success('Successfuly changed. Redirecting', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
      setTimeout(() => navigate("/login"), 4000)
    })
    .catch((data) => {
      setPending(false)
      setErrors([...Object.values(data.response.data).filter(el => el[0] !== 'This field may not be blank.')])
    })
  }
  
  return (
  <div className='password-restore'>
    <div className='wrapper-restore'>
      <div className='left-col'>
        <div className='form'>
          <h1>Enter new password</h1>
          <div className='password1-block block'>
            <input
              name='password1'
              id="password1"
              type="password"
              value={formData.password1}
              onChange={(e) => changeFormData(e)}
              className={`${errors.length && "error"}`}
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
              className={`${errors.length && "error"}`}
              onFocus={() => setPassword2Focus(true)}
              onBlur={() => setPassword2Focus(false)}
            />
            <motion.label animate={formData.password2 || password2Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password2">Password again</motion.label>
          </div>
          <div className='button-block'>
            <button onClick={submitData}>Submit</button>
            {pending && <div className='ring-wrapper'>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>}
          </div>
        </div>
      </div>
      {errors.length !== 0 && <div className='right-col'>
        <h2>Whoops...</h2>
        <h2>Some errors occured here</h2>
        {errors.map(el => <p>{el[0].charAt(0).toUpperCase() + el[0].slice(1)}</p>)}
      </div>}
    </div>
    <ToastContainer />
  </div>
  )
}

export default PasswordRestore