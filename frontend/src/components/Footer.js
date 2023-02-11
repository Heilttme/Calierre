import React from 'react'
import tg from "../images/tg.png"
import ig from "../images/ig.png"
import vk from "../images/vk.png"
import { t } from 'i18next'

const Footer = () => {
  return (
    <div className='footer'>
        <p>Copyright © 2023 Calierré. {t("All rights reserved")}</p>
        <div className='icons'>
            <a href='https://vk.com/calierre' target="_blank"><img className='vk' src={vk}/></a>
            <a href='https://instagram.com/_calierre_?igshid=YWJhMjlhZTc=' target="_blank"><img className='ig' src={ig}/></a>
        </div>
    </div>
  )
}

export default Footer