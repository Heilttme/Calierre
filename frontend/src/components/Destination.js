import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from "axios"
import { useYMaps } from '@pbe/react-yandex-maps'

const Destination = () => {
  const [formData, setFormData] = useState({
    country: "",
    region: "",
    city: "",
    street: "",
    details: ""
  })
  const [defaultState, setDefaultState] = useState({
    center: [55.753994, 37.622093],
    zoom: 9,
  })

  const [map, setMap] = useState(null)
  const [coords, setCoords] = useState([55.753994, 37.622093])


  const changeFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const onMapClick = (e) => {
    setCoords(e.get('coords'))
    const res = axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=ceecbf3e-58ca-4fe6-a06b-97c89dc04f18&geocode=${e.get("coords")[1]}, ${e.get("coords")[0]}&format=json`).then(data => console.log(data.data)).catch(data => console.log(data.response.data))
    // const res = axios.post(`https://geocode-maps.yandex.ru/1.x/?geocode=${e.get("coords")[0]}, ${e.get("coords")[1]}&apikey=ceecbf3e-58ca-4fe6-a06b-97c89dc04f18`).then(data => console.log(data))
  }

  const geocode = (ymaps) => {
    ymaps.geocode([coords])
      .then(result => console.log(result))
      // .then(result => ({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
  }

  
  return (
    <YMaps onApiAvaliable={ymaps => geocode(ymaps)}>
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
          <Map
            modules={['geocode']}
            onAPIAvailable={function () { console.log('API loaded'); }}
            defaultState={{
              center: [55.751574, 37.573856],
              zoom: 9,
            }}
            width={800}
            height={800}
            onClick={(e) => onMapClick(e)}
            >
            <Placemark geometry={coords} />
          </Map>
        </div>
      </div>
    </YMaps>
  )
}

export default Destination