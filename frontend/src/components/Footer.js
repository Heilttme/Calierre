import React from 'react'
import tg from "../images/tg.png"
import ig from "../images/ig.png"

const Footer = () => {
  return (
    <div className='footer'>
        <p>Copyright © 2023 Write me. All rights reserved</p>
        <div className='icons'>
            <a href='/'><img className='tg' src={tg}/></a>
            <a href='/'><img className='ig' src={ig}/></a>
        </div>
    </div>
  )
}

export default Footer