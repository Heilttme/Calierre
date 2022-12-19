import React from 'react'
import eye from "../images/eye-outline.png"

const Customize = () => {
  return (
    <div className='customize'>
      <h1>Customize your letter</h1>
      <div className='form'>
        <div className='font block'>
          <h2>Font</h2>
          <div className='additional'>
            <select></select>
            <img src={eye}/>
            <span>Chosen font example</span>
          </div>
        </div>
        <div className='big-content'>
          <div className='title block'>
            <h2>Title</h2>
            <input/>
          </div>

          <div className='content block'>
            <div className='content-header'>
              <h2>Content</h2>
              <span>Up to 300 words</span>
            </div>
            <textarea/>
          </div>
          
          <div className='details block'>
            <h2>Details for writer</h2>
            <textarea/>
          </div>
        </div>
      </div>
      <button>Submit a letter</button>
    </div>
  )
}

export default Customize