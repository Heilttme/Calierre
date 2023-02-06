import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import useWindowDimensions from "./useWindowsDimensions"
import sberPay from "../images/sber_pay.png"
import credit from "../images/credit_card.png"

const Pay = ({orderData, setBlurred}) => {
  const [formData, setFormData] = useState({
    card: "",
    name: "",
    expires: "",
    cvv: ""
  })

  const [method, setMethod] = useState("")
  const [extendedText, setExtendedText] = useState(false)
  const { height, width } = useWindowDimensions()

  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  // useEffect(() => {
  //   const script = document.createElement("script")
  //   script.src = "https://static.yoomoney.ru/checkout-js/v1/checkout.js"
  //   script.async = true
    
  //   document.body.appendChild(script)

  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

  const pay = () => {
    window.checkout.tokenize({
      number: "5555555555554444",
      cvc: "999",
      month: "11",
      year: "25",
    }).then(res => {
      if (res.status === 'success') {
          const { paymentToken } = res.data.response
          
          const pres = axios.post("/authentication/proceed_payment/", {ptk: paymentToken})
            .then()
            .catch()
      }
    })
  }

  useEffect(() => {
    console.log(orderData);
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
                  <li>Time</li>
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
                  <li>{orderData.dateTime.split("T")[1]}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='right-col'>
            <div className='pay-head'>
              <h1>{t("Add payment information")}</h1>
              {method !== "" && <button className='back' onClick={() => setMethod("")}>Back</button>}
            </div>
            {method === "" && <div className='payment-methods'>
              <button onClick={() => setMethod("sber")}>
                <img className='sberpay' width={64} src={sberPay}/>
                SberPay
              </button>
              <button onClick={() => setMethod("credit")}>
                <img className='credit' width={42} src={credit}/>
                Credit Card
              </button>
            </div>}
            {method === "credit" && <div className='form'>
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
                  <h2>CVV</h2>
                  <input
                    name='cvv'
                    value={formData.cvv}
                    onChange={(e) => changeFormData(e)}
                  />
              </div>
              <button className="pay" onClick={pay}>{t("Pay")}</button>
            </div>}
          </div>
      </motion.div>
      <motion.div
        className='extended'
        initial={{width: 0, height: 0, padding: 0}}
        animate={extendedText ? {
          width: "60%",
          height: "75%",
          padding: "3rem"
        } : {width: 0, height: 0, padding: 0}}
      >
        <h1>Content</h1>
        <p>{orderData.content}</p>
      </motion.div>
    </div>
  )
}

export default Pay