import axios, { formToJSON } from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { t } from 'i18next'
import Orders from "./Orders"
import UserDataInfo from "./UserDataInfo"

const Profile = ({ userData, setUserData, authorize }) => {
  const [edit, setEdit] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [curPasswordError, setCurPasswordError] = useState(false)
  const [formData, setFormData] = useState({
    username: userData.username,
    password: "",
    currentPassword: ""
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [usernameSuccess, setUsernameSuccess] = useState(null)
  const [passwordSuccess, setPasswordSuccess] = useState(null)

  const confirmPasswordInputRef = useRef(null)
  
  useEffect(() => {
    setUsernameSuccess(null)
    // setEmailSuccess(null)
    setPasswordSuccess(null)
  }, [edit])

  const navigate = useNavigate()
  
  useEffect(() => {
    !localStorage.getItem("access") && navigate("/") 
  }, [])

  
  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
    
  useEffect(() => {
    setFormData(prev => ({...prev, username: userData.username, email: userData.email}))
  }, [userData])

  const logout = () => {
    authorize(false)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate("/")
  }

  const checkPassword = (e) => {
    if (!formData.currentPassword) {
      e.preventDefault()
      setEdit(true)
      setTimeout(() => confirmPasswordInputRef.current.focus(), 100)
    }
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
    
    if (userData.username !== formData.username) res1 = axios.put("/auth/users/me/", {username: formData.username, email: userData.email, password: formData.currentPassword}, config).then(() => {
      setUsernameSuccess(true)
      setUserData(prev => ({...prev, username: formData.username}))
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
        setCurPasswordError(true)
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
        setUsernameSuccess(false)
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
        if (formData.password) res3 = axios.post("/auth/users/set_password/", {new_password: formData.password, re_new_password: formData.password, current_password: formData.currentPassword}, config)
        .then(() => {
          setPasswordSuccess(true)
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
            setCurPasswordError(true)
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
            setPasswordSuccess(false)
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
          setFormData(prev => ({...prev, currentPassword: ""}))
        })
      }, 2000)
  }


  const takeOrder = (id) => {
    const res1 = axios.post("/authentication/change_order_status_taken/", {id}).then(data => {
      const res2 = axios.post("/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => setUserData(prev => ({...prev, ordersForWriter: data.data.orders})))
    })
  }

  // console.log(userData);

  return (
    <div className='profile-container'>
      <div className='profile'>
        <div className='username'><h1>Привет, {userData.username ? userData.username : "..."}</h1> {userData.staff ? <strong>{t("Writer")}</strong> : ""}</div>
        <Orders/>
        <UserDataInfo user={userData}/>
      </div>
    </div>
  )
}

export default Profile