import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from "axios"
import map from "../images/map.jpg"
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import InputMask from 'react-input-mask';
import useScrollBlock from "./useBlockScroll"

const Destination = ({ orderData, setOrderData, authenticated }) => {
  const [coords, setCoords] = useState([55.753994, 37.622093])
  const [mapOpened, setMapOpened] = useState(false)
  const navigate = useNavigate()
  const [dateTime, setDateTime] = useState("")

  const [dateTimeError, setDateTimeError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const [blockScroll, allowScroll] = useScrollBlock()

  const changeFormData = (e) => {
    if (e.target.name === "phone"){
      let el = e.target.value
      el = el.replace('-', "")
      el = el.replace('-', "")
      el = el.replace("(", "")
      el = el.replace(")", "")
      el = el.replace("+", "")
      el = el.replace(" ", "")
      el = el.replace(" ", "")
      setOrderData(prev => ({...prev, [e.target.name]: el}))
    } else {
      setOrderData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
  }

  const setDate = (e) => {
    const date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let inpDay = e.target.value.split("-")[2].split("T")[0]

    if (inpDay[0] === "0") {
      inpDay = inpDay[1]
    }
    
    let inpMon = e.target.value.split("-")[1]
    
    if (inpMon[0] === "0") {
      inpMon = inpMon[1]
    }

    let inpYear = e.target.value.split("-")[0]

    if ((inpDay >= day || inpMon > month) && inpMon >= month && inpYear >= year) {
      setDateTime(e.target.value)
      setOrderData(prev => ({...prev, dateTime: e.target.value}))
      if (parseInt(inpDay) === parseInt(day)) setOrderData(prev => ({...prev, sameDay: true}))
      else setOrderData(prev => ({...prev, sameDay: false}))
    } else {
      toast.error('Please select correct date', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
      setDateTimeError(true)
    }
  }

  const onMapClick = (e) => {
    setCoords(e.get('coords'))
    const res = axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=ceecbf3e-58ca-4fe6-a06b-97c89dc04f18&geocode=${e.get("coords")[1]}, ${e.get("coords")[0]}&format=json`).then(data => {
      toast.success(`${t(`Address was set to`) + `${data.data.response.GeoObjectCollection.featureMember[0].GeoObject.description.includes("Москва") ? data.data.response.GeoObjectCollection.featureMember[0].GeoObject.name : ""}`}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
      setOrderData(prev => ({...prev, street: data.data.response.GeoObjectCollection.featureMember[0].GeoObject.description.includes("Москва") ? data.data.response.GeoObjectCollection.featureMember[0].GeoObject.name : ""}))
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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

  useEffect(() => {
    if (!orderData.content || !orderData.option || ( !orderData.sealBasic.length && orderData.option == "Basic" ) || ( !orderData.sealAdvanced.length && !orderData.waxAdvanced.length && orderData.option == "Advanced" ) || ( !orderData.option == "Multiple" )) navigate("/order") 
  }, [])

  const toPay = () => {
    if (!orderData.street || !dateTime.length || (authenticated ? false : !orderData.email ? true : false) || orderData.phone.split("_").join("").length < 11) {
      toast.error(t("Please fill necessary fields"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      })
      
      if (!orderData.street) {
        setAddressError(true)
      }
      if (!dateTime.length) {
        setDateTimeError(true)
      }
      if (!orderData.email){
        setEmailError(true)
      }
      if (orderData.phone.split("_").join("").length < 11) {
        setPhoneError(true)
      }
    } else {
      navigate("/order/delivery/payment")
    }
  }

  return (
    <YMaps>
      <div className='destination'>
        <div className='form'>
          <div className='left-col'>
            <h1>{t("Choose delivery destination")}</h1>
            <div className='field f-3'>
              <div className='h-wrapper'>
                <h2>{t("City")}</h2>
                <span className='warn'>{t("Calierre currently delivers only in Moscow")}</span>
              </div>
              <div className='input-block'>
                <img onClick={() => {setMapOpened(true);window.scrollTo(0, 0);blockScroll()}} src={map}/>
                <input
                  name='city'
                  className='city'
                  value={t(orderData.city)}
                  onChange={(e) => changeFormData(e)}
                  disabled
                />
              </div>
            </div>
            <div className='field f-4'>
              <h2>{t("Street")}</h2>
              <div className='input-block'>
                <img onClick={() => {setMapOpened(true);window.scrollTo(0, 0);blockScroll()}} src={map}/>
                <input
                  name='street'
                  className={addressError ? "error" : ""}
                  value={orderData.street}
                  onChange={(e) => changeFormData(e)}
                />
            </div>
            </div>
            <div className='field f-4'>
              <h2>{t("Room")}</h2>
              <div className='input-block'>
                <input
                  name='flat'
                  value={orderData.flat}
                  onChange={(e) => changeFormData(e)}
                />
              </div>
            </div>
            <div className='field f-5'>
              <h2>{t("Details for courier")}</h2>
              <textarea
                name='detailsForCourier'
                value={orderData.detailsForCourier}
                onChange={(e) => changeFormData(e)}
              />
            </div>
            {!authenticated && <div className='field f-5'>
              <h2>{t("E-mail")}</h2>
              <input
                type="email"
                name='email'
                value={orderData.email}
                onChange={(e) => changeFormData(e)}
                className={emailError ? "error" : ""}
              />
            </div>}
            <div className='field f-4'>
              <h2>{t("Reciever phone number")}</h2>
              <div className='input-block'>
                <InputMask
                  mask={"+7 (999) 999-99-99"}
                  name='phone'
                  value={orderData.phone}
                  placeholder='+7 (999) 444-55-66'
                  onChange={(e) => changeFormData(e)}
                  className={`${phoneError && "error"}`}
                />
                {/* <input
                  type="tel"
                  name='phone'
                  value={orderData.phone}
                  onChange={(e) => changeFormData(e)}
                /> */}
              </div>
            </div>
            <div className='date-time'>
              <div className='h-wrapper'>
                <h2>{t("Date")}</h2>
                <span className='warn warn-red'>{t("Same day delivery +299₽")}</span>
              </div>
              <input className={`date-input${dateTimeError ? " error" : ""}`} type="date" value={dateTime} onChange={(e) => setDate(e)} />
            </div>
            <button onClick={() => toPay()}>{t("Next")}</button>
          </div>
        </div>
          <div className='map-container'>
            <div className={`map-wrapper ${mapOpened ? "opened" : ""}`}>
              <Map
                modules={['geocode']}
                defaultState={{
                  center: [55.751574, 37.573856],
                  zoom: 9,
                }}
                className={`map ${mapOpened ? "opened-map" : ""}`}
                onClick={(e) => onMapClick(e)}
              >
                <Placemark geometry={coords} />
              </Map>
              <button className='cross' onClick={() => {setMapOpened(false);allowScroll()}}>X</button>
            </div>
          </div>
      </div>
      <ToastContainer />
    </YMaps>
  )
}

export default Destination