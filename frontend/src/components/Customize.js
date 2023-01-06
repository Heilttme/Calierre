import { t } from 'i18next'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import eye from "../images/eye-outline.png"

const Customize = () => {
  const [font, setFont] = useState("")
  const [fontError, setFontError] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [contentError, setContentError] = useState(false)
  const [details, setDetails] = useState("")

  const navigate = useNavigate()

  const proceed = () => {
    if (font.length || content.length) {
      navigate("/destination")
    } else {
      setFontError(true)
      setContentError(true)
    }
  }
  
  return (
    <div className='customize'>
      <h1>{t("Customize your letter")}</h1>
      <div className='form'>
        <div className='font block'>
          <h2>{t("Font")}</h2>
          <div className='additional'>
            <select className={`${fontError && "error"}`}></select>
            <img src={eye}/>
            <span>{t("Chosen font example")}</span>
          </div>
        </div>
        <div className='big-content'>
          <div className='title block'>
            <h2>{t("Title")}</h2>
            <input/>
          </div>

          <div className='content block'>
            <div className='content-header'>
              <h2>{t("Content")}</h2>
              <span>{t("Up to 300 words")}</span>
            </div>
            <textarea className={`${contentError && "error"}`}/>
          </div>
          
          <div className='details block'>
            <h2>{t("Details")}</h2>
            <textarea/>
          </div>
        </div>
      </div>
      <button onClick={proceed}>{t("Proceed")}</button>
    </div>
  )
}

export default Customize