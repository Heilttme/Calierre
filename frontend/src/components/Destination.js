import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from "axios"

const Destination = () => {
  const [formData, setFormData] = useState({
    country: "",
    region: "",
    city: "",
    street: "",
    details: ""
  })
  const [defaultState, setDefaultState] = useState({
    center: [42.0002258, 45.0274812],
    zoom: 12,
  })

  // useEffect(() => {
  //   const res = axios.get("https://api-maps.yandex.ru/2.1/?apikey=ваш API-ключ&lang=ru_RU").then(data => console.log(data))
  // }, [])


  const getCoordinates = () => {
    const res = axios.get(`https://api.geoapify.com/v1/geocode/search?text=${formData.city} ${formData.street}&apiKey=c09b75958f84431190cb34e269680afd` ).then(data => {
      console.log(data.data);
      setDefaultState(prev => ({...prev, center: [data.data.features[0].properties.lat, data.data.features[0].properties.lon]}))
    })
    // const res = axios.get(`https://geocode-maps.yandex.ru/1.x?geocode=${formData.street}&apikey=ceecbf3e-58ca-4fe6-a06b-97c89dc04f18`).then(data => console.log(data.data))
  }

  console.log(defaultState);

  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  return (
    <div className='destination'>
      <div className='form'>
        <div className='left-col'>
          <h1>{t("Choose delivery destination")}</h1>
          <div className='field f-1'>
            <h2>{t("Country")}</h2>
            <input
              name='country'
              value={formData.country}
              onChange={(e) => changeFormData(e)}
            />
          </div>
          <div className='field f-2'>
            <h2>{t("Region")}</h2>
            <input
              name='region'
              value={formData.region}
              onChange={(e) => changeFormData(e)}
            />
          </div>
          <div className='field f-3'>
            <h2>{t("City")}</h2>
            <input
              name='city'
              value={formData.city}
              onChange={(e) => changeFormData(e)}
              onBlur={getCoordinates}
            />
          </div>
          <div className='field f-4'>
            <h2>{t("Street")}</h2>
            <input
              name='street'
              value={formData.street}
              onChange={(e) => changeFormData(e)}
            />
          </div>
          <div className='field f-5'>
            <h2>{t("Details for courier")}</h2>
            <textarea
              name='details'
              value={formData.details}
              onChange={(e) => changeFormData(e)}
            />
          </div>
          <button>{t("Continue to payment")}</button>
        </div>
        {/* <YMaps>
          <Map width={600} height={400} defaultState={defaultState}>
            <Placemark geometry={defaultState.center} />
          </Map>
        </YMaps> */}
      </div>
    </div>
  )
}

export default Destination