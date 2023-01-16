import axios, { formToJSON } from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import testimonial from "../images/negr.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ userData, setUserData, authorize }) => {
  const [selectedBlock, setSelectedBlock] = useState("info")  
  const [edit, setEdit] = useState(false)
  const [curPasswordError, setCurPasswordError] = useState(false)
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    password: "",
    currentPassword: ""
  })

  const [curImage, setCurImage] = useState("")

  const [pending, setPending] = useState(false)
  
  const [usernameSuccess, setUsernameSuccess] = useState(null)
  const [emailSuccess, setEmailSuccess] = useState(null)
  const [passwordSuccess, setPasswordSuccess] = useState(null)

  const confirmPasswordInputRef = useRef(null)
  
  useEffect(() => {
    setUsernameSuccess(null)
    setEmailSuccess(null)
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

  const setImage = (e) => {
    const uploadData = new FormData()
    uploadData.append("image", e.target.files[0])
    uploadData.append("username", userData.username)
    uploadData.append("email", userData.email)
    uploadData.append("password", formData.currentPassword)

    const config = {
      headers: {
        "Authorization": `JWT ${localStorage.getItem('access')}`,
      }
    }

    const res = axios.put("http://127.0.0.1:8000/auth/users/me/", uploadData, config)
    .then(() => {
      setUserData(prev => ({...prev, image: `http://127.0.0.1:8000/media/pfps/${e.target.files[0].name}`}))
      toast.success('Image has been changed successfully', {
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
        toast.error('Current password error has occured', {
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
        toast.error('Image error occured', {
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

  const confirmChanges = () => {
    setPending(true)
    
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
    
    if (userData.username !== formData.username) res1 = axios.put("http://127.0.0.1:8000/auth/users/me/", {username: formData.username, email: userData.email, password: formData.currentPassword}, config).then(() => {
      setUsernameSuccess(true)
      setUserData(prev => ({...prev, username: formData.username}))
      toast.success('Username has been changed successfully', {
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
        toast.error('Current password error has occured', {
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
        toast.error('Username error has occured', {
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
      if (userData.email !== formData.email) res2 = axios.post("http://127.0.0.1:8000/auth/users/set_email/", {new_email: formData.email, current_password: formData.currentPassword}, config).then(() => {
        setEmailSuccess(true)
        setUserData(prev => ({...prev, email: formData.email}))
        toast.success('E-mail has been changed successfully', {
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
          toast.error('Current password error has occured', {
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
          setEmailSuccess(false)
          toast.error('E-mail error has occured', {
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
        if (formData.password) res3 = axios.post("http://127.0.0.1:8000/auth/users/set_password/", {new_password: formData.password, re_new_password: formData.password, current_password: formData.currentPassword}, config)
        .then(() => {
          setPasswordSuccess(true)
          toast.success('Password has been changed successfully', {
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
            toast.error('Current password error has occured', {
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
            toast.error('Password error has occured', {
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
          setPending(false)
        })
      }, 2000)
      
    }, 2000)
  }

  const orders = userData.orders.map(el => (
    <div className='order-wrapper'>
      <div className='order'>
        <h2>{el.title ? el.title : "NO TITLE"}</h2>
        <p>{el.data}</p>
        <p className='content'><strong>Country</strong>: {el.country}</p>
        <p className='content'><strong>Region</strong>: {el.region}</p>
        <p className='content'><strong>City</strong>: {el.city}</p>
        <p className='content'>{el.content}</p>
      </div>
      <div className='complete'>

      </div>
    </div>
  ))
  
  return (
    <div className='profile-container'>
        <div className='profile-wrapper' >
            <div className='profile'>
                <h1>{userData.username}</h1>
                <div className='wrapper'>
                    <div className='left-col'>
                        <img className='skeleton' src={userData.image}/>
                        <input type="file" id='file' accept='image/*' onClick={checkPassword} onChange={(e) => setImage(e)}/>
                        <label htmlFor="file" className={`${!formData.currentPassword && "disabled"}`}>Select image</label>
                    </div>
                    <div className='right-col'>
                        <ul className='selectors'>
                            <li onClick={() => setSelectedBlock("info")} className={`${selectedBlock == "info" && "active"} block-select`}>Info</li>
                            <li onClick={() => setSelectedBlock("orders")} className={`${selectedBlock == "orders" && "active"} block-select`}>Orders</li>
                        </ul>    
                        <div className='block'>
                            {
                                selectedBlock == "info" ?
                                    <div className='wrapper-info'>
                                        <div className='info'>
                                            <ul className='left-keys'>
                                                <li>Username</li>  
                                                <li>E-mail</li>  
                                                <li>Password</li>  
                                            </ul>
                                            <ul className='right-values'>
                                                <li className={`${(!userData.username || !userData.email) && "skeleton-text skeleton"}`}>
                                                {!edit ? 
                                                      userData.username :
                                                    <input
                                                      name='username'  
                                                      value={formData.username}
                                                      onChange={(e) => changeFormData(e)}
                                                      className={`${usernameSuccess === true ? "success" : usernameSuccess === false && "error"}`}
                                                      />}
                                                </li>  
                                                <li className={`${(!userData.username || !userData.email) && "skeleton-text skeleton"}`}>
                                                    {!edit ? 
                                                      userData.email :
                                                    <input
                                                      name='email'  
                                                      value={formData.email}
                                                      onChange={(e) => changeFormData(e)}
                                                      className={`${emailSuccess === true ? "success" : emailSuccess === false && "error"}`}
                                                    />}
                                                </li>  
                                                <li className={`${(!userData.username || !userData.email) && "skeleton-text skeleton"}`}>
                                                    {!edit ? 
                                                      "*********" :
                                                    <input
                                                      name='password'
                                                      type="password"
                                                      value={formData.password}
                                                      onChange={(e) => changeFormData(e)}
                                                      className={`${passwordSuccess === true ? "success" : passwordSuccess === false && "error"}`}
                                                      />}
                                                </li>  
                                            </ul>
                                        </div>
                                        {edit && <div className='password-confirm'>
                                            <h4>Enter your current password to confirm</h4>
                                            <input 
                                              name='currentPassword'
                                              type="password"
                                              value={formData.currentPassword}
                                              onChange={(e) => changeFormData(e)}
                                              ref={confirmPasswordInputRef}
                                              className={`${curPasswordError && "error"}`}
                                            />
                                        </div>}
                                        <div className='buttons'>
                                            <button onClick={logout}>Logout</button>
                                            <button onClick={() => setEdit(prev => !prev)}>Edit</button>
                                            {edit && <button disabled={!formData.currentPassword && true} className={`${!formData.currentPassword && "disabled"}`} onClick={confirmChanges}>Confim</button>}
                                            {pending && <div className='ring-wrapper'>
                                              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                            </div>}
                                        </div>
                                    </div>
                                :
                                    <div className='orders'>
                                      {orders}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <ToastContainer />
    </div>
  )
}

// const PasswordEditMenu = () => {
//   const [password1Focus, setPassword1Focus] = useState(false)
//   const [password2Focus, setPassword2Focus] = useState(false)
//   const [errors, setErrors] = useState([])
//   const [formData, setFormData] = useState({
//     password1: "",
//     password2: "",
//     cur_password: ""
//   })

//   const changeFormData = (e) => {
//       setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
//   }

//   const submitData = () => {
//     const res = axios.post("http://127.0.0.1:8000/auth/users/set_password/", {new_password: formData.password1, re_new_password: formData.password2, current_password: formData.cur_password})
//   }
  
//   return (
//     <div className='reset-block' style={{backdropFilter: "none", filter: "none"}}>
//       <h1>Enter current password</h1>
//       <div className='cur_password-block block'>
//         <input
//           name="cur_password"
//           id="cur_password"
//           onFocus={() => password1Focus(true)}
//           onBlur={() => password1Focus(false)}
//           onChange={(e) => changeFormData(e)}
//         //   className={`${errorTypes.includes("detail") && "error"}`}
//         />
//         <motion.label animate={formData.password1 || password1Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="cur_password">Current password</motion.label>
//       </div>
//       <div className='password1-block block'>
//         <input
//           name="password1"
//           id="password1"
//           onFocus={() => password1Focus(true)}
//           onBlur={() => password1Focus(false)}
//           onChange={(e) => changeFormData(e)}
//         //   className={`${errorTypes.includes("detail") && "error"}`}
//         />
//         <motion.label animate={formData.password1 || password1Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password1">Password</motion.label>
//       </div>
//       <div className='password2-block block'>
//         <input
//           name="password2"
//           id="password2"
//           onFocus={() => password2Focus(true)}
//           onBlur={() => password2Focus(false)}
//           onChange={(e) => changeFormData(e)}
//         //className={`${errorTypes.includes("detail") && "error"}`}
//         />
//         <motion.label animate={formData.password2 || password2Focus ? {y: -26, x: -12, fontSize: "16px"} : {}} className='text-label' htmlFor="password2">Password again</motion.label>
//       </div>
//       <button onClick={submitData}>Submit</button>
//     </div>
//   )
// }

export default Profile