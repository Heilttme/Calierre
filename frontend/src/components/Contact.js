import React, { useEffect } from 'react'
import { t } from 'i18next'

const Contact = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='contact'>
      <div className='block-1'>

        <div className='left-col'>
          <h1>{t("Contact us")}</h1>
          <div className='form'>
            <div className='field name'>
              <h2>{t("First name")}</h2>  
              <input/>
            </div> 
            <div className='field surname'>
              <h2>{t("Last name")}</h2>  
              <input/>
            </div> 
            <div className='field email'>
              <h2>{t("E-mail")}</h2>  
              <input/>
            </div> 
            <div className='field message'>
              <h2>{t("Message")}</h2>  
              <textarea/>
            </div> 
            <button>{t("Send")}</button>
          </div>
        </div>
        <div className='info'>
          <h1>{t("How can we help?")}</h1>
          <div className='hours'>
            <div>
              <span>{t("Mon-Fri")}</span><strong>{t("10am - 7pm")}</strong>
            </div>
            <div>
              {t("Saturday")}<strong>{t("10am - 5pm")}</strong>
            </div>
            <div>
              {t("Sunday")}<strong>{t("Closed")}</strong>
            </div>
          </div>
          <p>{t("We are open to any of your questions")}</p>
          <ul>
            <li className='block'>
              <h2>{t("Big order")}</h2>
              <p>{t("Order up to 1000 same letters")}</p>
            </li>
            <li className='block'>
              <h2>{t("Become partners")}</h2>
              <p>{t("Сooperation on an ongoing basis")}</p>
            </li>
            <li className='block'>
              <h2>{t("Any questions")}</h2>
              <p>{t("Ask us any question you need")}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Contact