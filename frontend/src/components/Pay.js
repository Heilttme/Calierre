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
import recieving1 from "../images/recieving1.jpg"
import recieving2 from "../images/recieving2.jpg"
import recieving3 from "../images/recieving3.jpg"
import Input from "./Input"
import TextAreaInput from "./TextAreaInput"


const Pay = ({ orderData, userData, authenticated }) => {
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

  const pay = (method) => {
    method === "sberpay" ? setPendingSber(true) : setPendingCredit(true)
    const res = axios.post("/authentication/proceed_payment/", {method, mobile, orderData: {...orderData, user: userData.id ? userData.id : -1}, email: orderData.email, option: orderData.option, sameDay: orderData.sameDay})
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
    .catch(data => {
        setPendingCredit(false)
        setPendingSber(false)
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
      }
    )
  }

  useEffect(() => {
    if (!orderData.content || !orderData.option || !orderData.dateTime || ( !orderData.sealBasic.length && orderData.option == "Basic" ) || ( !orderData.sealAdvanced.length && !orderData.waxAdvanced.length && orderData.option == "Advanced" ) || ( !orderData.option == "Multiple" )) navigate("/order") 
  }, [])

  const previewImages = Array(10).fill(
    (
      <>
      <div className='card'>
        <img src={recieving1}/>
        <p>Дари</p>
      </div>
      <div className='card'>
        <img src={recieving2}/>
        <p>Радуй</p>
      </div>
      <div className='card'>
        <img src={recieving3}/>
        <p>Дари</p>
      </div>
      </>
    )
  )

  return (
    <div className='payment' onClick={() => setExtendedText(false)}>
        <div className='payment-wrapper'>
          <div className='summary'>
            <h1>В шаге от <strong>Восторга</strong></h1>
            <div className='slide-track'>
              <div className='image-slider'>
                {previewImages}                
              </div>
            </div>
            <div className='details'>
              <h2>Письмо</h2>
              {
                orderData.title && <Input value={orderData.title} disabled label={"Заголовок"} />
              }
              <TextAreaInput value={orderData.content} disabled label={"Текст письма"} />
              {
                orderData.mistakes && <TextAreaInput value={orderData.mistakes} disabled label={"Ошибки"} />
              }
              {
                orderData.details && <Input value={orderData.details} disabled label={"Детали"} />
              }
              <Input value={orderData.option} disabled label={"Тариф"} />
              {
                orderData.sealAdvanced ? 
                  <Input value={orderData.sealAdvanced} disabled label={"Печать"} />
                :
                  <Input value={orderData.sealBasic} disabled label={"Печать"} />
              }
              {
                orderData.waxAdvanced && <Input value={orderData.waxAdvanced} disabled label={"Цвет печати"} />
              }
              {
                orderData.details && <Input value={orderData.details} disabled label={"Детали письма"} />
              }

              <h2>Доставка</h2>
              <Input value={orderData.city} disabled label={"Город"} />
              <Input value={orderData.street} disabled label={"Улица"} />
              {
                orderData.flat && <Input value={orderData.flat} disabled label={"Квартира, подъезд"} />
              }
              <Input value={orderData.email} disabled label={"E-mail"} />
              <Input value={orderData.phone} disabled label={"Телефон"} />
              {
                orderData.detailsForCourier && <Input value={orderData.detailsForCourier} disabled label={"Детали для курьера"} />
              }
            </div>
            <div className='button-block'>
              <button onClick={pay}>К оплате</button>
            </div>
          </div>    
            {/* <motion.div
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
                {pendingSber && !mobile && <div className='ring-wrapper'>
                  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>}
              </button>
              <button className='pay-btn' onClick={() => pay("credit")}>
                <img className='credit' width={42} src={credit}/>
                Credit Card
                {pendingCredit && !mobile && <div className='ring-wrapper'>
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
              <p>{t("Scan this QR code with your Sber app")}</p>
              <QRCode
                value={QRValue}
                width="256"
                height="256"
              />
              {authenticated && <p>{t("Check your profile after payment. Your order will appear in an hour")}</p>}
            </motion.div>} */}
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
      <ToastContainer
        limit={3}
       />
    </div>
  )
}

export default Pay


/*

<div className='letter'>
              <h1>{t("Your letter")}</h1>
              <div className='data'>
                <ul className='f-col'>
                  {orderData.title && <li>{t("Title")}</li>}
                  <li>{t("Content")}</li>
                  {orderData.details && <li>{t("Letter details")}</li>}
                  <li>{t("City")}</li>
                  <li>{t("Street")}</li>
                  {orderData.flat && <li>{t("Flat")}</li>}
                  {orderData.detailsForCourier && <li>{t("Details for courier")}</li>}
                  <li>{t("Option")}</li>
                  <li>{t("Seal")}</li>
                  {orderData.waxAdvanced && <li>{t("Wax")}</li>}
                  <li>{t("Date")}</li>
                </ul>
                <ul className='s-col'>
                  {orderData.title && <li>{orderData.title}</li>}
                  <li onClick={(e) => {e.stopPropagation();setExtendedText(true)}} className='content'>{orderData.content.slice(0, width > 720 ? 30 : 10)}...</li>
                  {orderData.details && <li>{orderData.details}</li>}
                  <li>{t(orderData.city)}</li>
                  <li>{orderData.street}</li>
                  {orderData.flat && <li>{orderData.flat}</li>}
                  {orderData.detailsForCourier && <li>{orderData.detailsForCourier}</li>}
                  <li>{t(orderData.option)}</li>
                  <li>{orderData.option === "Basic" ? t(orderData.sealBasic) : t(orderData.sealAdvanced)}</li>
                  {orderData.waxAdvanced && <li>{t(orderData.waxAdvanced)}</li>}
                  <li>{orderData.dateTime.split("T")[0]}</li>
                </ul>
              </div>
              <h1 className='total'>{t("Total")}: {orderData.option === "Basic" && orderData.sameDay ? "₽789" : orderData.option === "Basic" ? "₽490" : orderData.option === "Advanced" && orderData.sameDay ? "₽989" : "₽690"}</h1>
            </div>

*/