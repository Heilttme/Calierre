import React from 'react'

const Contact = () => {
  return (
    <div className='contact'>
      <div className='left-col'>
        <h1>Contact us</h1>
        <div className='form'>
          <div className='field name'>
            <h2>First name</h2>  
            <input/>
          </div> 
          <div className='field surname'>
            <h2>Last name</h2>  
            <input/>
          </div> 
          <div className='field message'>
            <h2>Message</h2>  
            <textarea/>
          </div> 
          <button>Send</button>
        </div>
      </div>
      <div className='info'>
        <h1>How can we help?</h1>
        <p>We are open to any of your questions</p>
        <ul>
          <li className='block'>
            <h2>Big order</h2>
            <p>Order up to 1000 same letters</p>
          </li>
          <li className='block'>
            <h2>Become partners</h2>
            <p>Сooperation on an ongoing basis</p>
          </li>
          <li className='block'>
            <h2>Any questions</h2>
            <p>Ask us any question you need</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Contact