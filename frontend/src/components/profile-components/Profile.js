import axios, { formToJSON } from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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


  const checkPassword = (e) => {
    if (!formData.currentPassword) {
      e.preventDefault()
      setEdit(true)
      setTimeout(() => confirmPasswordInputRef.current.focus(), 100)
    }
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
        <div className='username'>
          <h1>Привет, {userData.username ? userData.username : "..."}</h1> {userData.staff ? <strong>{t("Writer")}</strong> : ""}
        </div>
        <Orders/>
        <UserDataInfo user={userData} userData={userData} setUserData={setUserData} authorize={authorize}/>
      </div>
    </div>
  )
}

export default Profile