import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [fNameError, setFNameError] = useState(false)
  const [lNameError, setLNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [messageError, setMessageError] = useState(false)

  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const sendContact = () => {
    if (formData.firstName && formData.lastName && formData.email && formData.message) {

      const res = axios.post("/email/send_contact_info/", formData)
      .then(() => {
        toast.success(t("Successfully sent"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        })
      })
    } else {
      if (!formData.firstName) setFNameError(true)
      if (!formData.lastName) setLNameError(true)
      if (!formData.email) setEmailError(true)
      if (!formData.message) setMessageError(true)

      toast.error(t("Please fill in all fields"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
    }
  }

  return (
    <div className='contact'>
      <div className='block-1'>
        <div className='left-col'>
          <h1>{t("Contact us")}</h1>
          <div className='form'>
            <div className='field name'>
              <h2>{t("First name")}</h2>  
              <input
                name="firstName"
                value={formData.firstName}
                onChange={(e) => changeFormData(e)}
                className={fNameError ? "error" : ""}
              />
            </div> 
            <div className='field surname'>
              <h2>{t("Last name")}</h2>  
              <input
                name="lastName"
                value={formData.lastName}
                onChange={(e) => changeFormData(e)}
                className={lNameError ? "error" : ""}
              />
            </div> 
            <div className='field email'>
              <h2>{t("E-mail")}</h2>  
              <input
                name="email"
                value={formData.email}
                onChange={(e) => changeFormData(e)}
                className={emailError ? "error" : ""}
              />
            </div> 
            <div className='field message'>
              <h2>{t("Message")}</h2>  
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => changeFormData(e)}
                className={messageError ? "error" : ""}
              />
            </div> 
            <button onClick={sendContact}>{t("Send")}</button>
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
      <ToastContainer />
    </div>
  )
}

export default Contact