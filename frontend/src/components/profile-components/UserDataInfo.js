import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { motion } from "framer-motion"
import { t } from 'i18next'
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const UserDataInfo = ({ user, userData, setUserData, authorize }) => {
  const [userError, setUserError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [changed, setChanged] = useState(false)
  const navigate = useNavigate()
  const [newValuesForm, setNewValuesForm] = useState({
    email: user.email,
    username: user.username,
    password: "",
  })

  useEffect(() => {
    setNewValuesForm(user)
  }, [user])

  useEffect(() => {
    if (
      newValuesForm.email === user.email && 
      newValuesForm.username === user.username && 
      newValuesForm.password === ""
    ) setChanged(false)
  }, [newValuesForm])
  
  const onChange = (e) => {
    setChanged(true)
    let val = e.target.value
    let name = e.target.name
    setNewValuesForm(prev => ({
      ...prev,
      [name]: val      
    }))
  }

  const confirmChanges = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem('access')}`,
        "Accept": "application/json"
      }
    }

    let res1 = false
    let res2 = false
    let res3 = false
    
    if (userData.username !== newValuesForm.username) res1 = axios.put("/auth/users/me/", {username: newValuesForm.username, email: userData.email, password: newValuesForm.password}, config).then(() => {
      // setUsernameSuccess(true)
      setUserData(prev => ({...prev, username: newValuesForm.username}))
      toast.success(t('Username has been changed successfully'), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
    }).catch((data) => {
      if (data.response.data.current_password) {
        // setCurPasswordError(true)
        toast.error(t('Current password error has occured'), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        })
      } else {
        // setUsernameSuccess(false)
        toast.error(t('Username error has occured'), {
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

      setTimeout(() => {
        if (newValuesForm.password) res3 = axios.post("/auth/users/set_password/", {new_password: newValuesForm.password, re_new_password: newValuesForm.password, current_password: newValuesForm.password}, config)
        .then(() => {
          // setPasswordSuccess(true)
          toast.success(t('Password has been changed successfully'), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
          })
        })
        .catch((data) => {
          if (data.response.data.current_password) {
            // setCurPasswordError(true)
            toast.error(t('Current password error has occured'), {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "light",
            })
          } else {
            // setPasswordSuccess(false)
            toast.error(t('Password error has occured'), {
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
        
        Promise.all([res1 && res1, res2 && res2, res3 && res3])
        .then(() => {
          setNewValuesForm(prev => ({...prev, password: ""}))
        })
      }, 2000)
  }

  const logout = () => {
    authorize(false)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate("/")
  }

  return (
    <div className='user-data-info'>
      {/* <p className='user-header'>Ваш аккаунт</p> */}
      <Input label={"E-mail"} name={"email"} onChange={onChange} value={newValuesForm.email} error={userError} setError={setUserError} />
      <Input label={"Имя пользователя"} name={"username"} onChange={onChange} value={newValuesForm.username} error={emailError} setError={setEmailError} />
      <Input label={"Пароль"} type='password' name={"password"} onChange={onChange} value={newValuesForm.password} error={userError} setError={setUserError} />
      <div className='btns'>
        <motion.button
          disabled={!changed}
          animate={{
            backgroundColor: !changed ? "#c4c4c4" : "#e85a4f"
          }}
          onClick={confirmChanges}
        >
          Подтвердить
        </motion.button>
        <button onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  )
}

export default UserDataInfo