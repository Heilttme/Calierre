import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from "axios"
import map from "../images/map.jpg"
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Destination = ({ orderData, setOrderData }) => {
  const [coords, setCoords] = useState([55.753994, 37.622093])
  const [mapOpened, setMapOpened] = useState(false)
  const navigate = useNavigate()

  const changeFormData = (e) => {
    setOrderData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const onMapClick = (e) => {
    setCoords(e.get('coords'))
    const res = axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=ceecbf3e-58ca-4fe6-a06b-97c89dc04f18&geocode=${e.get("coords")[1]}, ${e.get("coords")[0]}&format=json`).then(data => setOrderData(prev => ({...prev, street: data.data.response.GeoObjectCollection.featureMember[0].GeoObject.description.includes("Москва") ? data.data.response.GeoObjectCollection.featureMember[0].GeoObject.name : ""})))
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    if (!orderData.content || !orderData.option || ( !orderData.sealBasic.length && orderData.option == "Basic" ) || ( !orderData.sealAdvanced.length && !orderData.waxAdvanced.length && orderData.option == "Advanced" ) || ( !orderData.option == "Multiple" )) navigate("/order") 
  }, [])

  const toPayment = () => {
    if (!orderData.street) {
      toast.error(t("Please write delivery street"), {
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
              <h2>{t("City")}</h2>
              <div className='input-block'>
                <img onClick={() => setMapOpened(true)} src={map}/>
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
                <img onClick={() => setMapOpened(true)} src={map}/>
                <input
                  name='street'
                  value={orderData.street}
                  onChange={(e) => changeFormData(e)}
                />
              </div>
            </div>
            <div className='field f-4'>
              <h2>{t("Flat")}</h2>
              <div className='input-block'>
                <input
                  name='street'
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
            <button onClick={() => toPayment()}>{t("Continue to payment")}</button>
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
              <button className='cross' onClick={() => setMapOpened(false)}>X</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </YMaps>
  )
}

export default Destination