import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import testimonial from "../images/negr.png"

const Profile = ({userData}) => {
  const [selectedBlock, setSelectedBlock] = useState("info")  

  const navigate = useNavigate()
  
  
  useEffect(() => {
    !localStorage.getItem("access") && navigate("/") 
  }, [])
  
  return (
    <div className='profile'>
        <h1>{userData.username}</h1>
        <div className='wrapper'>
            <div className='left-col'>
                <img src={testimonial}/>
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
                                    <li>{userData.username}</li>  
                                    <li>{userData.email}</li>  
                                    <li>**********</li>  
                                    </ul>
                                </div>
                                <div className='buttons'>
                                    <button>Logout</button>
                                    <button>Edit</button>
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
  )
}

export default Profile