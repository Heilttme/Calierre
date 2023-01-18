import { t } from 'i18next'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import eye from "../images/eye-outline.png"
import { AnimatePresence, motion } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"

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
      toast.success(t("Data was saved"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
    } else {
      setContentError(true)
      toast.error(t("Please write your letter"), {
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

  const countSymbols = (e) => setSymbols(e.target.value.length)
  console.log(orderData);

  return (
    <div className='customize'>
      <motion.div initial={{width: "100%"}} animate={next ? {width: "80%"} : {width: "100%"}} className='left-col'>
        <h1>{t("Write your letter")}</h1>
        <motion.div initial={{width: "100%"}} animate={next ? {width: "80%"} : {width: "100%"}} className='form'>
          <div className='big-content'>
            <div className='title block'>
              <h2>{t("Title")}</h2>
              <input
                value={orderData.title}
                name="title"
                onChange={(e) => {changeOrderData(e); setNext(false)}}
              />
            </div>

            <div className='content block'>
              <div className='content-header'>
                <h2>{t("Content")}</h2>
                <span>{t("Up to 1200 symbols")}</span>
                {symbols !== 0 && <span className='counter'>{symbols}</span>}
              </div>
              <textarea
                value={orderData.content}
                name="content"
                onChange={(e) => {e.target.value.length <= 1200 ? changeOrderData(e) : setContentError(true); e.target.value.length <= 1200 ? countSymbols(e) : setContentError(true); setNext(false)}}
                className={`${contentError && "error"}`}
              />
            </div>
            
            <div className='details block'>
              <h2>{t("Comments to your letter")}</h2>
              <textarea
                value={orderData.details}
                name="details"
                onChange={(e) => {changeOrderData(e); setNext(false)}}
              />
            </div>

            <div className='mistakes block'>
              <input
                type="checkbox"
                id='mistake'
                name='mistake'
                value={mistakes}
                onChange={(e) => {setMistakes(prev => !prev); setNext(false)}}
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
                onChange={(e) => {changeOrderData(e); setNext(false)}}
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
        initial={{display: "none"}}
        animate={next ? {x: 0, display: "unset"} : {x: 600, display: "none"}}
        transition={{display: {delay: .1}}}
        className='right-col'
      >
        <h1>Choose option</h1>
        <div className='options'>
          
          <div className='option'>
            <span><h2>Basic</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>·Printed letter</p>
              <p>·Seal options</p>
            </div>
            <div className='seal-choice'>
              <h3>Seals</h3>
              <ul className='seals'>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic1'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "heart"}))}
                  />
                  <label htmlFor='sealBasic1'>Heart  <a href='#'>View</a></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic2'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "flower"}))}
                  />
                  <label htmlFor='sealBasic2'>Flower  <a href='#'>View</a></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic3'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "heart"}))}
                  />
                  <label htmlFor='sealBasic3'>Heart  <a href='#'>View</a></label>
                </li>
              </ul>
            </div>
            <button>Opt for basic</button>
          </div>

          <div className='option'>
            <span><h2>Advanced</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>·Handwritten letter</p>
              <p>·Huge variety of sealing wax</p>
              <p>·Seal options</p>
            </div>

            <div className='seal-choice'>
              <div className='additional'>
                <ul className='seals'>
                  <h3>Seals</h3>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced1'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "heart"}))}
                    />
                    <label htmlFor='sealAdvanced1'>Heart  <a href='#'>View</a></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced2'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "flower"}))}
                    />
                    <label htmlFor='sealAdvanced2'>Flower  <a href='#'>View</a></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced3'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "heart"}))}
                    />
                    <label htmlFor='sealAdvanced3'>Heart  <a href='#'>View</a></label>
                  </li>
                </ul>

                <ul className='waxes'>
                  <h3>Waxes</h3>
                  <li className='seal'>
                    <input 
                      name='waxAdvanced'
                      id='waxAdvanced1'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Red"}))}
                    />
                    <label htmlFor='waxAdvanced1'>Red</label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='waxAdvanced'
                      id='waxAdvanced2'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Blue"}))}
                    />
                    <label htmlFor='waxAdvanced2'>Blue</label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='waxAdvanced'
                      id='waxAdvanced3'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Green"}))}
                    />
                    <label htmlFor='waxAdvanced3'>Green</label>
                  </li>
                </ul>
              </div>
              </div>
            <button>Opt for advanced</button>
          </div>

          <div className='option'>
            <span><h2>Multiple*</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>·For your events</p>
              <p className='additional'>*more than 10 letters</p>
            </div>
            <button>Opt for multiple</button>
          </div>

        </div>
      </motion.div>
      <ToastContainer />
    </div> 
  )
}

export default Customize