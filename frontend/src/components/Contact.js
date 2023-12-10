import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Input from "./Input"
import TextAreaInput from "./TextAreaInput"

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
      <h1>Свяжитесь с нами</h1>
      <div className='form'>
        <div className='name-surname'>
          <Input label={"Фамилия"}/>
          <Input label={"Имя"}/>
        </div>
        <Input label={"E-mail"}/>
        <Input label={"Телефон"}/>
        <TextAreaInput label={""}/>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Contact