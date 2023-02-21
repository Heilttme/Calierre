import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import eye from "../images/eye-outline.png"
import { motion } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"
import useWindowsDimensions from "./useWindowsDimensions"
import Lily from "../images/LILY.png"
import Cursive from "../images/KUST.png"
import Flower from "../images/FLOWER.png"
import Text from "../images/TEXT.png"
import Tree from "../images/TREE.png"
import Rose from "../images/ROSE.png"
import Rings from "../images/WEDDING.png"
import Royal from "../images/ROYAL.png"
import useScrollBlock from "./useBlockScroll"

const Customize = ({ setOrderData, orderData, changeOrderData }) => {
  const [contentError, setContentError] = useState(false)
  const [next, setNext] = useState(false)
  const [mistakes, setMistakes] = useState(false)
  const [symbols, setSymbols] = useState(0)
  const { width, height } = useWindowsDimensions()
  const [seal, setSeal] = useState("")
  const [demo, setDemo] = useState(false)
  const [blockScroll, allowScroll] = useScrollBlock()

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (localStorage.getItem("access")){
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `JWT ${localStorage.getItem('access')}`,
  //         "Accept": "application/json"
  //       }
  //     }
  //     const res = axios.get("/auth/users/me/", config).catch(() => navigate("/"))
  //   } else navigate("/login")
  // }, [])
  
  const showDemo = (e, par) => {
    setSeal(par)
    setDemo(true)
    blockScroll()
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
      toast.error(t("Please select wax colour for advanced option"), {
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
    <div className='customize' onClick={() => {allowScroll();setDemo(false)}}>
      <motion.div className='customize-wrapper' animate={demo ? {opacity: .35, pointerEvents: "none"} : {}}>
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
              <Link to='/contact'>{t("Need more than 1 letter?")}</Link>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{display: "none"}}
          animate={next ? {x: 0, display: "unset"} : {x: 600, display: "none"}}
          transition={{display: {delay: .1}}}
          className='right-col'
        >
          {width <= 900 && <button onClick={() => setNext(false)}>{t("Back")}</button>}
          <h1>{t("Choose option")}</h1>
          <div className='options'>
            
            <div className='option'>
              <span><h2>{t("Basic")}</h2><p>₽<strong>490</strong></p></span>
              <div className='desc'>
                <p>·{t("Printed letter")}</p>
                <p>·{t("Seal options")}</p>
              </div>
              <div className='seal-choice'>
                <h3>{t("Seals")}</h3>
                <ul className='seals-basic'>
                  <li className='seal'>
                    <input 
                      name='sealBasic'
                      id='sealBasic2'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Sprout"}))}
                    />
                    <label htmlFor='sealBasic2'>{t("Sprout")}</label>
                  </li>
                  <li className='seal'>
                    <input 
                      name='sealBasic'
                      id='sealBasic3'
                      type="radio"
                      onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealBasic: "Heart"}))}
                    />
                    <label htmlFor='sealBasic3'>{t("Heart")}</label>
                  </li>
                </ul>
              </div>
              <button onClick={() => toDelivery("Basic")}>{t("Opt for basic")}</button>
            </div>

            <div className='option'>
              <span><h2>{t("Advanced")}</h2><p>₽<strong>690</strong></p></span>
              <div className='desc'>
                <p>·{t("Handwritten letter")}</p>
                <p>·{t("Huge variety of sealing wax")}</p>
                <p>·{t("Seal options")}</p>
              </div>

              <div className='seal-choice'>
                <div className='additional'>
                  <ul className='seals-advanced'>
                    <h3>{t("Seals")}</h3>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced2'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Flower"}))}
                      />
                      <label htmlFor='sealAdvanced2'>{t("Flower")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Flower"), 10)}>{t("View")}</a></label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced3'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Tree"}))}
                      />
                      <label htmlFor='sealAdvanced3'>{t("Tree")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Tree"), 10)}>{t("View")}</a></label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced4'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Lily"}))}
                      />
                      <label htmlFor='sealAdvanced4'>{t("Lily")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Lily"), 10)}>{t("View")}</a></label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced5'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Rings"}))}
                      />
                      <label htmlFor='sealAdvanced5'>{t("Rings")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Rings"), 10)}>{t("View")}</a></label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced6'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Royal"}))}
                      />
                      <label htmlFor='sealAdvanced6'>{t("Royal")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Royal"), 10)}>{t("View")}</a></label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced7'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Cursive"}))}
                      />
                      <label htmlFor='sealAdvanced7'>{t("Cursive")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Cursive"), 10)}>{t("View")}</a></label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='sealAdvanced'
                        id='sealAdvanced8'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, sealAdvanced: "Rose"}))}
                      />
                      <label htmlFor='sealAdvanced8'>{t("Rose")}  <a onClick={(e) => setTimeout(() => showDemo(e, "Rose"), 10)}>{t("View")}</a></label>
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
                    <li className='seal'>
                      <input 
                        name='waxAdvanced'
                        id='waxAdvanced4'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "White"}))}
                      />
                      <label htmlFor='waxAdvanced4'>{t("White")}</label>
                    </li>
                    <li className='seal'>
                      <input 
                        name='waxAdvanced'
                        id='waxAdvanced5'
                        type="radio"
                        onClick={(e) => e.target.checked && setOrderData(prev => ({...prev, waxAdvanced: "Black"}))}
                      />
                      <label htmlFor='waxAdvanced5'>{t("Black")}</label>
                    </li>
                  </ul>
                </div>
                </div>
              <button onClick={() => toDelivery("Advanced")}>{t("Opt for advanced")}</button>
            </div>

            <div className='option'>
              <span><h2>{t("Multiple")}*</h2></span>
              <div className='desc'>
                <p>·{t("For your events")}</p>
                <p className='additional'>{t("*from 10 letters")}</p>
              </div>
              <button onClick={() => navigate("/contact")}>{t("Contact us")}</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
      <motion.div
        initial={{width: 0, height: 0}}
        animate={demo ? width < 900 ? width < 650 ? width < 450 ? {width: 320, height: 240} : {width: 400, height: 300} : {width: 600, height: 450} : {width: 800, height: 600} : {width: 0, height: 0}}
        className='seal-demo'
      >
        <img src={
          seal === "Flower" ? 
              Flower :
            seal === "Tree" ? 
              Tree :
            seal === "Lily" ?
              Lily :
            seal === "Rings" ?
              Rings :
            seal === "Rose" ?
              Rose :
            seal === "Text" ?
              Text :
            seal === "Royal" ?
              Royal :
            seal === "Cursive" ? 
              Cursive :
            ""
        }
        />
      </motion.div>
    </div> 
  )
}

export default Customize