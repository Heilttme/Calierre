import { t } from 'i18next'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import eye from "../images/eye-outline.png"
import { AnimatePresence, motion } from "framer-motion"

const Customize = ({ setOrderData, orderData, changeOrderData }) => {
  const [contentError, setContentError] = useState(false)
  const [next, setNext] = useState(false)
  const [mistakes, setMistakes] = useState(false)
  const [symbols, setSymbols] = useState(0)

  const navigate = useNavigate()

  const proceed = () => {
    if (orderData.content.length) {
      setNext(true)
      setContentError(false)
    } else {
      setContentError(true)
    }
  }

  return (
    <div className='customize'>
      <motion.div animate={next ? {width: "80%"} : {width: "100%"}} className='left-col'>
        <h1>{t("Write your letter")}</h1>
        <motion.div animate={next ? {width: "80%"} : {width: "100%"}} className='form'>
          {/* <div className='font block'>
            <h2>{t("Font")}</h2>
            <div className='additional'>
              <select className={`${fontError && "error"}`}></select>
              <span>
                <img src={eye}/>
                <span>{t("Chosen font example")}</span>
              </span>
            </div>
          </div> */}
          <div className='big-content'>
            <div className='title block'>
              <h2>{t("Title")}</h2>
              <input
                value={orderData.title}
                name="title"
                onChange={(e) => changeOrderData(e)}
              />
            </div>

            <div className='content block'>
              <div className='content-header'>
                <h2>{t("Content")}</h2>
                <span>{t("Up to 1200 symbols")}</span>
              </div>
              <textarea
                value={orderData.content}
                name="content"
                onChange={(e) => changeOrderData(e)}
                className={`${contentError && "error"}`}
              />
            </div>
            
            <div className='details block'>
              <h2>{t("Details")}</h2>
              <textarea
                value={orderData.details}
                name="details"
                onChange={(e) => changeOrderData(e)}
              />
            </div>

            <div className='mistakes block'>
              <input
                type="checkbox"
                id='mistake'
                name='mistake'
                value={mistakes}
                onChange={() => setMistakes(prev => !prev)}
                />
              <label htmlFor='mistake'>Did you make any mistakes deliberately?</label>
            </div>
            <motion.div 
              initial={{height: 0}}
              animate={{height: mistakes ? "100%" : "0"}}
              className='mistakes-input block'
              transition={{type: "keyframes"}}
            >
              <h2>Mistakes</h2>
              <textarea
                value={orderData.mistakes}
                name="mistakes"
                onChange={(e) => changeOrderData(e)}
              />
            </motion.div>
          </div>
          <div className='buttons'>
            <button disabled={next && true} className={`${next ? "disabled" : ""}`} onClick={proceed}>{t("Next")}</button>
            <a href='/contact'>Need more than 1 letter?</a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        animate={next ? {x: 0} : {x: 600}}
        className='right-col'
      >
        <h1>Choose option</h1>
        <div className='options'>
          
          <div className='option'>
            <span><h2>Advanced</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>Printed</p>
              <p>Printed</p>
              <p>Printed</p>
            </div>
            <button>Opt for basic</button>
          </div>

          <div className='option'>
            <span><h2>Advanced</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>Printed</p>
              <p>Printed</p>
              <p>Printed</p>
            </div>
            <button>Opt for advanced</button>
          </div>

          <div className='option'>
            <span><h2>Advanced</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>Printed</p>
              <p>Printed</p>
              <p>Printed</p>
            </div>
            <button>Opt for multiple</button>
          </div>

        </div>
      </motion.div>
    </div> 
  )
}

export default Customize