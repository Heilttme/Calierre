import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import testimonial from "../images/negr.png"

const Profile = ({ userData, authorize }) => {
  const [selectedBlock, setSelectedBlock] = useState("info")  
  const [edit, setEdit] = useState("false")

  const navigate = useNavigate()
  
  useEffect(() => {
    !localStorage.getItem("access") && navigate("/") 
  }, [])

  const logout = () => {
    authorize(false)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate("/")
  }

  const confirmChanges = () => {

  }
  
  return (
    <div className='profile-container'>
        {/* {usernameEdit && <UsernameEditMenu/>} */}
        {/* {emailEdit && <EmailEditMenu/>} */}
        {/* {passwordEdit && <PasswordEditMenu/>} */}
        <div className='profile-wrapper' >
            <div className='profile'>
                <h1>{userData.username}</h1>
                <div className='wrapper'>
                    <div className='left-col'>
                        <img className='skeleton' src={testimonial}/>
                        <button>Change picture</button>
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
                                                    <input value={userData.username}/>}
                                                </li>  
                                                <li className={`${(!userData.username || !userData.email) && "skeleton-text skeleton"}`}>
                                                    {!edit ? 
                                                      userData.email :
                                                    <input value={userData.email}/>}
                                                </li>  
                                                <li className={`${(!userData.username || !userData.email) && "skeleton-text skeleton"}`}>
                                                    {!edit ? 
                                                      "*********" :
                                                    <input/>}
                                                </li>  
                                            </ul>
                                        </div>
                                        {edit && <div className='password-confirm'>
                                            <h4>Enter your current password to confirm</h4>
                                            <input />
                                        </div>}
                                        <div className='buttons'>
                                            <button onClick={logout}>Logout</button>
                                            <button onClick={() => setEdit(prev => !prev)}>Edit</button>
                                            {edit && <button onClick={confirmChanges}>Confim</button>}
                                        </div>
                                    </div>
                                :
                                    <div className='orders'>

                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
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