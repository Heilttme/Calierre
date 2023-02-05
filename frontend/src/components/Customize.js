import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import eye from "../images/eye-outline.png"
import { AnimatePresence, motion } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"
import useWindowsDimensions from "./useWindowsDimensions"
import Lily from "../images/LILY.png"
import Flower from "../images/FLOWER.png"
import Text from "../images/TEXT.png"
import Tree from "../images/TREE.png"
import Rose from "../images/ROSE.png"
import Wedding from "../images/WEDDING.png"
import Royal from "../images/ROYAL.png"

const Customize = ({ setOrderData, orderData, changeOrderData }) => {
  const [contentError, setContentError] = useState(false)
  const [next, setNext] = useState(false)
  const [mistakes, setMistakes] = useState(false)
  const [symbols, setSymbols] = useState(0)
  const { width, height } = useWindowsDimensions()
  const [seal, setSeal] = useState("")
  const [demo, setDemo] = useState(false)

  const showDemo = (par) => {
    setSeal(par)
    setDemo(true)
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
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

  const toDelivery = (option) => {
    setOrderData(prev => ({...prev, option}))
    if (orderData.content.length && (( orderData.sealBasic.length && option === "Basic" ) || ( orderData.sealAdvanced.length && orderData.waxAdvanced.length && option === "Advanced" ) || ( option === "Multiple" ))) navigate("/order/delivery") 
    if ( !orderData.sealBasic.length && option === "Basic" ) {
      toast.error(t("Please select wax seal for basic option"), {
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
    if ( !orderData.sealAdvanced.length && option === "Advanced" ) {
      toast.error(t("Please select wax seal for advanced option"), {
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
    if ( !orderData.waxAdvanced.length && option === "Advanced" ) {
      toast.error(t("Please select wax colour for basic option"), {
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

  return (
    <div className='customize'>
      <motion.div initial={{width: "100%"}} animate={next ? width <= 900 ? {width: "80%", display: "none"} : {width: "80%"} : {width: "100%"}} className='left-col'>
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
              <label htmlFor='mistake'>{t("Did you make any mistakes deliberately?")}</label>
            </div>
            <motion.div 
              initial={{height: 0}}
              animate={{height: mistakes ? "100%" : "0"}}
              className='mistakes-input block'
              transition={{type: "keyframes"}}
            >
              <h2>{t("Mistakes")}</h2>
              <textarea
                value={orderData.mistakes}
                name="mistakes"
                onChange={(e) => {changeOrderData(e); setNext(false)}}
              />
            </motion.div>
          </div>
          <div className='buttons'>
            <button disabled={next && true} className={`${next ? "disabled" : ""}`} onClick={proceed}>{t("Next")}</button>
            <a href='/contact'>{t("Need more than 1 letter?")}</a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{display: "none"}}
        animate={next ? {x: 0, display: "unset"} : {x: 600, display: "none"}}
        transition={{display: {delay: .1}}}
        className='right-col'
      >
        {width <= 900 && <button onClick={() => setNext(false)}>Back</button>}
        <h1>{t("Choose option")}</h1>
        <div className='options'>
          
          <div className='option'>
            <span><h2>{t("Basic")}</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>·{t("Printed letter")}</p>
              <p>·{t("Seal options")}</p>
            </div>
            <div className='seal-choice'>
              <h3>{t("Seals")}</h3>
              <ul className='seals'>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic2'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Flower"}))}
                  />
                  <label htmlFor='sealBasic2'>{t("Flower")}  <button onClick={() => showDemo("Flower")} href='#'>{t("View")}</button></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic3'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Tree"}))}
                  />
                  <label htmlFor='sealBasic3'>{t("Tree")}  <button onClick={() => showDemo("Tree")} href='#'>{t("View")}</button></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic4'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Lily"}))}
                  />
                  <label htmlFor='sealBasic4'>{t("Lily")}  <button onClick={() => showDemo("Lily")} href='#'>{t("View")}</button></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic5'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Wedding rings"}))}
                  />
                  <label htmlFor='sealBasic5'>{t("Wedding rings")}  <button onClick={() => showDemo("Wedding")} href='#'>{t("View")}</button></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic6'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Royal"}))}
                  />
                  <label htmlFor='sealBasic6'>{t("Royal")}  <button onClick={() => showDemo("Royal")} href='#'>{t("View")}</button></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic7'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "KUST"}))}
                  />
                  <label htmlFor='sealBasic7'>KUST  <button onClick={() => showDemo("KUST")} href='#'>{t("View")}</button></label>
                </li>
                <li className='seal'>
                  <input 
                    name='sealBasic'
                    id='sealBasic7'
                    type="radio"
                    onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Rose"}))}
                  />
                  <label htmlFor='sealBasic7'>Rose  <button onClick={() => showDemo("Rose")} href='#'>{t("View")}</button></label>
                </li>
              </ul>
            </div>
            <button onClick={() => toDelivery("Basic")}>{t("Opt for basic")}</button>
          </div>

          <div className='option'>
            <span><h2>{t("Advanced")}</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>·{t("Handwritten letter")}</p>
              <p>·{t("Huge variety of sealing wax")}</p>
              <p>·{t("Seal options")}</p>
            </div>

            <div className='seal-choice'>
              <div className='additional'>
                <ul className='seals'>
                  <h3>{t("Seals")}</h3>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced2'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Flower"}))}
                    />
                    <label htmlFor='sealAdvanced2'>{t("Flower")}  <button onClick={() => showDemo("Flower")} href='#'>{t("View")}</button></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced3'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Tree"}))}
                    />
                    <label htmlFor='sealAdvanced3'>{t("Tree")}  <button onClick={() => showDemo("Tree")} href='#'>{t("View")}</button></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced4'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Lily"}))}
                    />
                    <label htmlFor='sealAdvanced4'>{t("Lily")}  <button onClick={() => showDemo("Lily")} href='#'>{t("View")}</button></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced5'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Wedding rings"}))}
                    />
                    <label htmlFor='sealAdvanced5'>{t("Wedding rings")}  <button onClick={() => showDemo("Wedding")} href='#'>{("View")}</button></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced6'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Royal"}))}
                    />
                    <label htmlFor='sealAdvanced6'>{t("Royal")}  <button onClick={() => showDemo("Royal")} href='#'>{t("View")}</button></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced7'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "KUST"}))}
                    />
                    <label htmlFor='sealAdvanced7'>KUST  <button onClick={() => showDemo("KUST")} href='#'>{t("View")}</button></label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealAdvanced'
                      id='sealAdvanced7'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Rose"}))}
                    />
                    <label htmlFor='sealAdvanced7'>Rose  <button onClick={() => showDemo("Rose")} href='#'>{t("View")}</button></label>
                  </li>
                </ul>

                <ul className='waxes'>
                  <h3>{t("Waxes")}</h3>
                  <li className='seal'>
                    <input 
                      name='waxAdvanced'
                      id='waxAdvanced1'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Red"}))}
                    />
                    <label htmlFor='waxAdvanced1'>{t("Red")}</label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='waxAdvanced'
                      id='waxAdvanced2'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Blue"}))}
                    />
                    <label htmlFor='waxAdvanced2'>{t("Blue")}</label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='waxAdvanced'
                      id='waxAdvanced3'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Green"}))}
                    />
                    <label htmlFor='waxAdvanced3'>{t("Green")}</label>
                  </li>
                </ul>
              </div>
              </div>
            <button onClick={() => toDelivery("Advanced")}>{t("Opt for advanced")}</button>
          </div>

          <div className='option'>
            <span><h2>{t("Multiple")}*</h2><p>$<strong>7</strong></p></span>
            <div className='desc'>
              <p>·{t("For your events")}</p>
              <p className='additional'>*{t("more than 10 letters")}</p>
            </div>
            <button onClick={() => toDelivery("Multiple")}>{t("Opt for multiple")}</button>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
      <div className='seal-demo'><img src={seal}/></div>
    </div> 
  )
}

export default Customize