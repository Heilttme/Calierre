import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import useWindowDimensions from "./useWindowsDimensions"
import sberPay from "../images/sber_pay.png"
import credit from "../images/credit_card.png"
import QRCode from "react-qr-code";
import { toast, ToastContainer } from 'react-toastify';

const Pay = ({orderData, setBlurred, userData }) => {
  const [method, setMethod] = useState("")
  const [extendedText, setExtendedText] = useState(false)
  const { height, width } = useWindowDimensions()
  const [mobile] = useState((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
  const [displayedQR, setDisplayedQR] = useState(false)
  const [QRValue, setQRValue] = useState("")
  const [pendingCredit, setPendingCredit] = useState(false)
  const [pendingSber, setPendingSber] = useState(false)
  
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  // useEffect(() => {
  //   const script = document.createElement("script")
  //   script.src = "https://static.yoomoney.ru/checkout-js/v1/checkout.js"
  //   script.async = true
    
  //   document.body.appendChild(script)

  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

  const pay = (method) => {
    method === "sberpay" ? setPendingSber(true) : setPendingCredit(true)
    const res = axios.post("/authentication/proceed_payment/", {method, mobile, orderData: {...orderData, user: userData.id}})
    .then(data => { 
        if (method === "sberpay") setPendingSber(false)
        if (method === "sberpay" && !mobile){
          setDisplayedQR(true)
          setQRValue(data.data.url)
        } else {
          setPendingCredit(false)
          window.location.replace(data.data.url) 
        }
      }
    )
    .catch(data => 
      toast.error(t("Payment was cancelled. Try again later"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
    )

  }

  useEffect(() => {
    if (!orderData.content || !orderData.option || !orderData.dateTime || ( !orderData.sealBasic.length && orderData.option == "Basic" ) || ( !orderData.sealAdvanced.length && !orderData.waxAdvanced.length && orderData.option == "Advanced" ) || ( !orderData.option == "Multiple" )) navigate("/order") 
  }, [])


  return (
    <div className='payment' onClick={() => setExtendedText(false)}>
        <motion.div animate={extendedText ? {opacity: 0.35} : {opacity: 1}} className='payment-wrapper'>
          <div className='left-col'>
            <div className='letter'>
              <h1>Your letter</h1>
              <div className='data'>
                <ul className='f-col'>
                  {orderData.title && <li>Title</li>}
                  <li>Content</li>
                  {orderData.details && <li>Letter details</li>}
                  <li>City</li>
                  <li>Street</li>
                  {orderData.flat && <li>Flat</li>}
                  {orderData.detailsForCourier && <li>Details for courier</li>}
                  <li>Option</li>
                  <li>Seal</li>
                  {orderData.waxAdvanced && <li>Wax</li>}
                  <li>Date</li>
                </ul>
                <ul className='s-col'>
                  {orderData.title && <li>{orderData.title}</li>}
                  <li onClick={(e) => {e.stopPropagation();setExtendedText(true)}} className='content'>{orderData.content.slice(0, width > 720 ? 30 : 10)}...</li>
                  {orderData.details && <li>{orderData.details}</li>}
                  <li>{orderData.city}</li>
                  <li>{orderData.street}</li>
                  {orderData.flat && <li>{orderData.flat}</li>}
                  {orderData.detailsForCourier && <li>{orderData.detailsForCourier}</li>}
                  <li>{orderData.option}</li>
                  <li>{orderData.option === "Basic" ? orderData.sealBasic : orderData.sealAdvanced}</li>
                  {orderData.waxAdvanced && <li>{orderData.waxAdvanced}</li>}
                  <li>{orderData.dateTime.split("T")[0]}</li>
                </ul>
              </div>
              <h1 className='total'>Total: {orderData.option === "Basic" ? "₽490" : "₽690"}</h1>
            </div>
          </div>
          <div className='right-col'>
            <motion.div
              animate={displayedQR ? {opacity: 0, display: "none"} : {}}
              transition={{display: {delay: .4}, opacity: {duration: .3}}}
              className='payment-methods'
            >
              <div className='pay-head'>
                <h1>{t("Pay")}</h1>
              </div>
              <button className='pay-btn' onClick={() => pay("sberpay")}>
                <img className='sberpay' width={64} src={sberPay}/>
                SberPay
                {pendingSber && <div className='ring-wrapper'>
                  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>}
              </button>
              <button className='pay-btn' onClick={() => pay("credit")}>
                <img className='credit' width={42} src={credit}/>
                Credit Card
                {pendingCredit && <div className='ring-wrapper'>
                  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>}
              </button>
            </motion.div>
            {<motion.div
              animate={displayedQR ? {opacity: 1, display: "block"} : {opacity: 0}}
              transition={{display: {delay: .4}, opacity: {delay: .4, duration: .3}}}
              className='qr'
            >
              <h1>Sberpay</h1>
              <p>Scan this QR code with your Sber app</p>
              <QRCode
                value={QRValue}
                width="256"
                height="256"
              />
            </motion.div>}
            {/* {method === "credit" && <div className='form'>
              <div className='field credit'>
                  <h2>{t("Credit card")}</h2>
                  <input
                    name='card'
                    value={formData.card}
                    onChange={(e) => changeFormData(e)}
                  />
              </div>
              <div className='field name'>
                  <h2>{t("Name on card")}</h2>
                  <input
                    name='name'
                    value={formData.name}
                    onChange={(e) => changeFormData(e)}
                  />
              </div>
              <div className='field expires'>
                  <h2>{t("Expires")}</h2>
                  <input
                    name='expires'
                    value={formData.expires}
                    onChange={(e) => changeFormData(e)}
                  />
              </div>
              <div className='field cvv'>
                  <h2>CVC</h2>
                  <input
                    name='cvc'
                    value={formData.cvc}
                    onChange={(e) => changeFormData(e)}
                  />
              </div>
              <button className="pay" onClick={pay}>{t("Pay")}</button>
            </div>} */}
          </div>
      </motion.div>
      <motion.div
        className='extended'
        initial={{width: 0, height: 0, padding: 0}}
        animate={extendedText ? width < 900 ? width < 500 ? {width: "90%", height: "75%", padding: "2rem"} : {width: "85%", height: "75%", padding: "3rem"} : {width: "60%", height: "75%", padding: "3rem"} : {width: 0, height: 0, padding: 0}}
      >
        <h1>Content</h1>
        <p>{orderData.content}</p>
      </motion.div>
      <ToastContainer
        limit={3}
       />
    </div>
  )
}

export default Pay