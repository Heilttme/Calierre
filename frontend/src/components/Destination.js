import { t } from 'i18next'
import React, { useState } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from "axios"
import map from "../images/map.jpg"

const Destination = ({ orderData, setOrderData }) => {
  const [coords, setCoords] = useState([55.753994, 37.622093])
  const [mapOpened, setMapOpened] = useState(false)

  const changeFormData = (e) => {
    setOrderData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const onMapClick = (e) => {
    setCoords(e.get('coords'))
    const res = axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=ceecbf3e-58ca-4fe6-a06b-97c89dc04f18&geocode=${e.get("coords")[1]}, ${e.get("coords")[0]}&format=json`).then(data => setOrderData(prev => ({...prev, street: data.data.response.GeoObjectCollection.featureMember[0].GeoObject.description.includes("Москва") ? data.data.response.GeoObjectCollection.featureMember[0].GeoObject.name : ""})))
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
                  value={orderData.city}
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
            <div className='field f-5'>
              <h2>{t("Details for courier")}</h2>
              <textarea
                name='detailsForCourier'
                value={orderData.detailsForCourier}
                onChange={(e) => changeFormData(e)}
              />
            </div>
            <button>{t("Continue to payment")}</button>
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
    </YMaps>
  )
}

export default Destination