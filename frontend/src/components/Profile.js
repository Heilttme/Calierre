import axios, { formToJSON } from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import testimonial from "../images/negr.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { t } from 'i18next'

const Profile = ({ userData, setUserData, authorize }) => {
  const [selectedBlock, setSelectedBlock] = useState("info")  
  const [edit, setEdit] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [curPasswordError, setCurPasswordError] = useState(false)
  const [formData, setFormData] = useState({
    username: userData.username,
    // email: userData.email,
    password: "",
    currentPassword: ""
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
      setSelectedBlock("info")
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

    const res = axios.put("/auth/users/me/", uploadData, config)
    .then(() => {
      setUserData(prev => ({...prev, image: `/media/pfps/${e.target.files[0].name}`}))
      toast.success(t('Image has been changed successfully'), {
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
          setPending(false)
        })
      }, 2000)
      
    // }, 2000)
  }

  const orders = userData.orders.filter(el => el.paid == true).map(el => (
    <div className='order-wrapper'>
      <div className='order'>
        <h2>{el.title ? el.title : t("NO TITLE ON LETTER")}</h2>
        <p>{el.data}</p>
        {/* <p className='content'><strong>City</strong>: {el.city}</p> */}
        <p className='content'>{el.content}</p>
      </div>
    </div>
  ))

  const takeOrder = (id) => {
    const res1 = axios.post("/authentication/change_order_status_taken/", {id}).then(data => {
      const res2 = axios.post("/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => setUserData(prev => ({...prev, ordersForWriter: data.data.orders})))
    })
  }

  const untakenPrinterOrders = userData.ordersForPrinter.filter(el => el.taken == false && el.option == "Basic" && el.paid == true).map(el => (
    <div className='order-wrapper'>
      <div className='order'>
        <h2>ID: {el.id}</h2>
        <h2>{t("Seal")}: {el.seal_advanced ? el.seal_advanced : el.seal_basic}</h2>
        <h2>{t("Wax")}: {el.wax_advanced ? el.wax_advanced : t("Default red wax")}</h2>
        <h2>{t("Details")}: {el.details}</h2>
        <h2>{t("Mistakes")}: {el.mistakes}</h2>
        <h2>{el.title ? el.title : t("NO TITLE ON LETTER")}</h2>
        <p>{el.data}</p>
        <p className='content'>{el.content}</p>
        <button onClick={() => takeOrder(el.id)}>{t("Take")}</button>
      </div>
    </div>
  ))
  
  const takenPrinterOrders = userData.ordersForPrinter.filter(el => el.taken == true && el.option == "Basic" && el.paid == true).map(el => (
    <TakenOrdersForPrinter el={el} setUserData={setUserData} />
    ))
    
    const untakenOrdersForWriter = userData.ordersForWriter.filter(el => el.taken === false && el.option == "Advanced" && el.paid == true).map(el => (
      <AnimatePresence>
        <motion.div exit={{x: 100}} className='order-wrapper'>
          <div className='order'>
            <h2>ID: {el.id}</h2>
            <h2>{t("Seal")}: {el.seal_advanced ? el.seal_advanced : el.seal_basic}</h2>
            <h2>{t("Wax")}: {el.wax_advanced ? el.wax_advanced : t("Default red wax")}</h2>
            <h2>{t("Details")}: {el.details}</h2>
            <h2>{t("Mistakes")}: {el.mistakes}</h2>
            <h2>{el.title ? el.title : t("NO TITLE ON LETTER")}</h2>
            <p>{el.data}</p>
            <p className='content'>{el.content}</p>
            <button onClick={() => takeOrder(el.id)}>{t("Take")}</button>
          </div>
        </motion.div>
      </AnimatePresence>
    ))

  const takenOrdersForWriter = userData.ordersForWriter.filter(el => el.taken === true && el.completed === false && el.option == "Advanced" && el.paid == true).map(el => (
    <TakenOrdersForWriter el={el} setUserData={setUserData} />
  ))
  
  return (
    <div className='profile-container'>
        <div className='profile-wrapper' >
            <div className='profile'>
                <div className='username'><h1>{userData.username ? userData.username : "..."}</h1> {userData.staff ? <strong>{t("Writer")}</strong> : ""}</div>
                <div className='wrapper'>
                    <div className='left-col'>
                        {userData.image ?
                          <img src={userData.image} alt="" onError={() => setImgError(true)}/>
                          :
                          <div className='skeleton'></div>
                        }
                        <input type="file" id='file' accept='image/*' onClick={checkPassword} onChange={(e) => setImage(e)}/>
                        <label htmlFor="file" className={`${!formData.currentPassword && "disabled"}`}>{t("Select image")}</label>
                    </div>
                    <div className='right-col'>
                        <ul className='selectors'>
                            <li onClick={() => setSelectedBlock("info")} className={`${selectedBlock == "info" && "active"} block-select`}>{t("Info")}</li>
                            <li onClick={() => setSelectedBlock("orders")} className={`${selectedBlock == "orders" && "active"} block-select`}>{t("Orders")}</li>
                            {userData.staff && <li onClick={() => setSelectedBlock("taken")} className={`${selectedBlock == "taken" && "active"} block-select`}>{t("Taken")}</li>}
                        </ul>    
                        <div className='block'>
                            {
                                selectedBlock == "info" ?
                                    <div className='wrapper-info'>
                                        <div className='info'>
                                            <ul className='left-keys'>
                                                <li>{t("E-mail-profile")}</li>  
                                                <li>{t("Username")}</li>  
                                                <li>{t("Password")}</li> 
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
                                            <h4>{t("Enter your current password to confirm")}</h4>
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
                                            <button onClick={logout}>{t("Logout")}</button>
                                            <button onClick={() => setEdit(prev => !prev)}>{t("Edit")}</button>
                                            {edit && <button disabled={!formData.currentPassword && true} className={`${!formData.currentPassword && "disabled"}`} onClick={confirmChanges}>{t("Confirm")}</button>}
                                            {pending && <div className='ring-wrapper'>
                                              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                            </div>}
                                        </div>
                                    </div>
                                : selectedBlock === "taken" ? 
                                    <div className='taken orders'>
                                        {userData.printer ? takenPrinterOrders.length ? takenPrinterOrders :
                                          <div className='empty taken'>
                                            <h1>{t("Your taken orders list is empty")}</h1>
                                            <p>{t("See your orders to take one")}</p>
                                          </div>
                                        :
                                        takenOrdersForWriter.length ? takenOrdersForWriter : 
                                          <div className='empty taken'>
                                            <h1>{t("Your taken orders list is empty")}</h1>
                                            <p>{t("See your orders to take one")}</p>
                                          </div>
                                        }
                                    </div>
                                      :
                                    <div className='orders'>
                                      {userData.staff ? userData.printer ?
                                        untakenPrinterOrders.length ? untakenPrinterOrders :
                                        <div className='empty untaken'>
                                          <h1>{t("Your untaken orders list is empty")}</h1>
                                          <p>{t("You will get e-mail notification when somebody orders a letter")}</p>
                                        </div>
                                        :
                                      untakenOrdersForWriter.length ? untakenOrdersForWriter : 
                                        <div className='empty untaken'>
                                          <h1>{t("Your untaken orders list is empty")}</h1>
                                          <p>{t("You will get e-mail notification when somebody orders a letter")}</p>
                                        </div>
                                      : orders.length ? orders : 
                                        <div className='empty'>
                                            <h1>{t("Your orders list is empty")}</h1>
                                            <Link to='/order'>{t("Make order")}</Link>
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
    const res1 = axios.post("/authentication/change_order_status_completed/", {id}).then(data => {
      // const res2 = axios.post("http://127.0.0.1:8000/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => {
        // setExited(true)
        // setUserData(prev => ({...prev, ordersForWriter: data.data.orders}))
    })
  }
  
  return (
    <motion.div animate={exited ? {x: 500, opacity: 0, height: 0} : {}} transition={{duration: .4, type: "spring", opacity: {duration: .1}}} className='order-wrapper'>
      <div className='order'>
        <h2>ID: {el.id}</h2>
        <h2>{t("Seal")}: {el.seal_advanced ? el.seal_advanced : el.seal_basic}</h2>
        <h2>{t("Wax")}: {el.wax_advanced ? el.wax_advanced : t("Default red wax")}</h2>
        <h2>{t("Details")}: {el.details}</h2>
        <h2>{t("Mistakes")}: {el.mistakes}</h2>
        <h2>{el.title ? el.title : t("NO TITLE ON LETTER")}</h2>
        <p>{el.data}</p>
        {/* <p className='content'><strong>City</strong>: {el.city}</p> */}
        <p className='content'>{el.content}</p>
      {/* <button onClick={() => takeOrder(el.id)}>Take</button> */}
      <button onClick={() => confirmOrder(el.id)}>{t("Done")}</button>
      </div>
    </motion.div>
  )
}

const TakenOrdersForPrinter = ({ el, setUserData }) => {
  const [exited, setExited] = useState(false)

  const confirmOrder = (id) => {
    setUserData(prev => ({...prev, ordersForPrinter: prev.ordersForPrinter.filter(el => el.id !== id)}))
    const res1 = axios.post("/authentication/change_order_status_completed/", {id}).then(data => {
      // const res2 = axios.post("http://127.0.0.1:8000/authentication/get_orders_from_users/", /*{id: userData.id}*/ ).then(data => {
        // setExited(true)
        // setUserData(prev => ({...prev, ordersForWriter: data.data.orders}))
    })
  }
  
  return (
    <motion.div animate={exited ? {x: 500, opacity: 0, height: 0} : {}} transition={{duration: .4, type: "spring", opacity: {duration: .1}}} className='order-wrapper'>
      <h2>ID: {el.id}</h2>
      <div className='order'>
        <h2>ID: {el.id}</h2>
        <h2>{t("Seal")}: {el.seal_advanced ? el.seal_advanced : el.seal_basic}</h2>
        <h2>{t("Wax")}: {el.wax_advanced ? el.wax_advanced : t("Default red wax")}</h2>
        <h2>{t("Details")}: {el.details}</h2>
        <h2>{t("Mistakes")}: {el.mistakes}</h2>
        <h2>{el.title ? el.title : t("NO TITLE ON LETTER")}</h2>
        <p>{el.data}</p>
        {/* <p className='content'><strong>City</strong>: {el.city}</p> */}
        <p className='content'>{el.content}</p>
      {/* <button onClick={() => takeOrder(el.id)}>Take</button> */}
      <button onClick={() => confirmOrder(el.id)}>{t("Done")}</button>
      </div>
    </motion.div>
  )
}

export default Profile