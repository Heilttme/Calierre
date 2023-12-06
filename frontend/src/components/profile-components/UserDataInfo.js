import React, { useState } from 'react'
import Input from '../Input'

const UserDataInfo = ({user}) => {
  const [userError, setUserError] = useState(false)
  
  const onChange = () => {

  }
  
  return (
    <div className='user-data-info'>
      <p className='user-header'>Ваш аккаунт</p>
      <Input label={"email"} onChange={onChange} value={user.email} error={userError} setError={setUserError}></Input>
    </div>
  )
}

export default UserDataInfo