import React, { useState } from 'react'

const Pay = () => {
  const [formData, setFormData] = useState({
    card: "",
    name: "",
    expires: "",
    cvv: ""
  })

  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const pay = () => {
    
  }
  
  return (
    <div className='payment'>
        <h1>Add payment information</h1>
        <div className='form'>
            <div className='field credit'>
                <h2>Credit card</h2>
                <input
                  name='card'
                  value={formData.card}
                  onChange={(e) => changeFormData(e)}
                />
            </div>
            <div className='field name'>
                <h2>Name on card</h2>
                <input
                  name='name'
                  value={formData.name}
                  onChange={(e) => changeFormData(e)}
                />
            </div>
            <div className='field expires'>
                <h2>Expires</h2>
                <input
                  name='expires'
                  value={formData.expires}
                  onChange={(e) => changeFormData(e)}
                />
            </div>
            <div className='field cvv'>
                <h2>CVV</h2>
                <input
                  name='cvv'
                  value={formData.cvv}
                  onChange={(e) => changeFormData(e)}
                />
            </div>
            <button onClick={pay}>Pay</button>
        </div>
    </div>
  )
}

export default Pay