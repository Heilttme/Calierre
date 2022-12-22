import React from 'react'

const Navigation = ({userData}) => {
  return (
    <div className='header'>
        <a href='/' className='logo'>Write me</a>
        {
          userData.username ? 
            <a href='/profile' className='login'>{userData.username}</a>
          :
            <a href='/login' className='login'>Log in</a>
        }
    </div>
  )
}

export default Navigation