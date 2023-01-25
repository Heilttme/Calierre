import axios, { formToJSON } from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
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
    // email: userData.email,
    password: "",
    currentPassword: ""
  })

  const [curImage, setCurImage] = useState("")

  const [pending, setPending] = useState(false)
  
  const [usernameSuccess, setUsernameSuccess] = useState(null)
  // const [emailSuccess, setEmailSuccess] = useState(null)
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

    // setTimeout(() => {
    //   if (userData.email !== formData.email) res2 = axios.post("http://127.0.0.1:8000/auth/users/set_email/", {new_email: formData.email, current_password: formData.currentPassword}, config).then(() => {
    //     setEmailSuccess(true)
    //     setUserData(prev => ({...prev, email: formData.email}))
    //     toast.success('E-mail has been changed successfully', {
    //       position: "bottom-right",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: 0,
    //       theme: "light",
    //     })
    //   }).catch((data) => {
    //     if (data.response.data.current_password) {
    //       setCurPasswordError(true)
    //       toast.error('Current password error has occured', {
    //         position: "bottom-right",
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: 0,
    //         theme: "light",
    //       })
    //     } else {
    //       setEmailSuccess(false)
    //       toast.error('E-mail error has occured', {
    //         position: "bottom-right",
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: 0,
    //         theme: "light",
    //       })
    //     }
    //   })

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
      
    // }, 2000)
  }

  const orders = userData.orders.map(el => (
    <div className='order-wrapper'>
      <div className='order'>
        <h2>{el.title ? el.title : "NO TITLE"}</h2>
        <p>{el.data}</p>
        {/* <p className='content'><strong>City</strong>: {el.city}</p> */}
        <p className='content'>{el.content}</p>
      </div>
    </div>
  ))

  const takeOrder = (id) => {
    const res1 = axios.post("http://127.0.0.1:8000/authentication/change_order_status_taken/", {id}).then(data => {
      const res2 = axios.post("http://127.0.0.1:8000/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => setUserData(prev => ({...prev, ordersForWriter: data.data.orders})))
    })
  }

  const untakenOrdersForWriter = userData.ordersForWriter.filter(el => el.taken === false).map(el => (
    <AnimatePresence>
      <motion.div exit={{x: 100}} className='order-wrapper'>
        <div className='order'>
          <h2>{el.title ? el.title : "NO TITLE"}</h2>
          <p>{el.data}</p>
          {/* <p className='content'><strong>City</strong>: {el.city}</p> */}
          <p className='content'>{el.content}</p>
        <button onClick={() => takeOrder(el.id)}>Take</button>
        </div>
      </motion.div>
    </AnimatePresence>
  ))

  const takenOrdersForWriter = userData.ordersForWriter.filter(el => el.taken === true && el.completed === false).map(el => (
    <TakenOrdersForWriter el={el} setUserData={setUserData} />
  ))
  
  return (
    <div className='profile-container'>
        <div className='profile-wrapper' >
            <div className='profile'>
                <div className='username'><h1>{userData.username}</h1> {userData.staff ? <strong>Writer</strong> : ""}</div>
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
                            {userData.staff && <li onClick={() => setSelectedBlock("taken")} className={`${selectedBlock == "taken" && "active"} block-select`}>Taken</li>}
                        </ul>    
                        <div className='block'>
                            {
                                selectedBlock == "info" ?
                                    <div className='wrapper-info'>
                                        <div className='info'>
                                            <ul className='left-keys'>
                                                <li>E-mail</li>  
                                                <li>Username</li>  
                                                <li>Password</li> 
                                            </ul>
                                            <ul className='right-values'>
                                                <li>
                                                    {/* {!edit ?  */}
                                                      {userData.email} {/* : */}
                                                    {/* <input
                                                      name='email'  
                                                      value={formData.email}
                                                      onChange={(e) => changeFormData(e)}
                                                      className={`${emailSuccess === true ? "success" : emailSuccess === false && "error"}`}
                                                    />} */}
                                                </li>  
                                                <li>
                                                {!edit ? 
                                                      userData.username :
                                                    <input
                                                      name='username'  
                                                      value={formData.username}
                                                      onChange={(e) => changeFormData(e)}
                                                      className={`${usernameSuccess === true ? "success" : usernameSuccess === false && "error"}`}
                                                      />}
                                                </li>  
                                                <li>
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
                                : selectedBlock === "taken" ? 
                                    <div className='taken orders'>
                                        {takenOrdersForWriter.length ? takenOrdersForWriter : 
                                          <div className='empty taken'>
                                            <h1>Your taken orders list is empty</h1>
                                            <p>See your orders to take one</p>
                                          </div>
                                        }
                                    </div>
                                      :
                                    <div className='orders'>
                                      {userData.staff ? untakenOrdersForWriter.length ? untakenOrdersForWriter : 
                                        <div className='empty untaken'>
                                          <h1>Your untaken orders list is empty</h1>
                                          <p>You will get e-mail notification when somebody orders a letter</p>
                                        </div>
                                      : orders.length ? orders : 
                                        <div className='empty'>
                                            <h1>Your orders list is empty</h1>
                                            <a href='/customize'>Make order</a>
                                        </div> 
                                      }
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

const TakenOrdersForWriter = ({ el, setUserData }) => {
  const [exited, setExited] = useState(false)

  const confirmOrder = (id) => {
    setUserData(prev => ({...prev, ordersForWriter: prev.ordersForWriter.filter(el => el.id !== id)}))
    const res1 = axios.post("http://127.0.0.1:8000/authentication/change_order_status_completed/", {id}).then(data => {
      const res2 = axios.post("http://127.0.0.1:8000/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => {
        setExited(true)
        // setUserData(prev => ({...prev, ordersForWriter: data.data.orders}))
      })
    })
  }
  
  return (
    <motion.div animate={exited ? {x: 500, opacity: 0, height: 0} : {}} transition={{duration: .4, type: "spring", opacity: {duration: .1}}} className='order-wrapper'>
      <div className='order'>
        <h2>{el.title ? el.title : "NO TITLE"}</h2>
        <p>{el.data}</p>
        {/* <p className='content'><strong>City</strong>: {el.city}</p> */}
        <p className='content'>{el.content}</p>
      {/* <button onClick={() => takeOrder(el.id)}>Take</button> */}
      <button onClick={() => confirmOrder(el.id)}>Done</button>
      </div>
    </motion.div>
  )
}

export default Profile