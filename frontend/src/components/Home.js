import React, { useEffect, useState } from 'react'
import ink from "../images/ink.png"
import pergament from "../images/pergament.png"
import feather from "../images/feather_pen.png"
import envelope from "../images/envelope.png"
import testimonial from "../images/negr.png"
import { useTranslation } from "react-i18next"
import axios from 'axios'

const Home = ({ language, changeLanguage }) => {
  const { t, i18n } = useTranslation()
  const [reviews, setReviews] = useState([])

  // useEffect(() => {
  //   const res = axios.get("http://127.0.0.1:8000/authentication/reviews/").then(data => {
  //     const newReviews = []
  //     for (let i = 0; i < data.data.items.length; i++){

  //       newReviews.push()
  //     }
  //   })

  // }, [])
  

  return (
    <div className='home' >
      <img src={ink} className='bg-ink image-1'/>
      <img src={ink} className='bg-ink image-2'/>
      <img src={ink} className='bg-ink image-3'/>
      <img src={ink} className='bg-ink image-4'/>
      <img src={ink} className='bg-ink image-5'/>
      <img src={ink} className='bg-ink image-6'/>
      <img src={ink} className='bg-ink image-7'/>
      <img src={ink} className='bg-ink image-8'/>
      <img src={ink} className='bg-ink image-9'/>
      <img src={ink} className='bg-ink image-10'/>
      <img src={ink} className='bg-ink image-11'/>
      <img src={ink} className='bg-ink image-12'/>
      <img src={ink} className='bg-ink image-13'/>
      <img src={ink} className='bg-ink image-14'/>
      <img src={ink} className='bg-ink image-15'/>
      <img src={ink} className='bg-ink image-16'/>
      <img src={ink} className='bg-ink image-17'/>
      <img src={ink} className='bg-ink image-18'/>
      <img src={ink} className='bg-ink image-19'/>
      <img src={ink} className='bg-ink image-20'/>
      <img src={ink} className='bg-ink image-21'/>
      <img src={ink} className='bg-ink image-22'/>
      <img src={ink} className='bg-ink image-23'/>

      {language === "ru" ?
        <svg onClick={changeLanguage} className='language' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" width="64" height="36"><rect fill="#fff" width="9" height="3"/><rect fill="#d52b1e" y="3" width="9" height="3"/><rect fill="#0039a6" y="2" width="9" height="2"/></svg>
      :
      <svg onClick={changeLanguage} className='language' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="64" height="36">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <g clip-path="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
      </g>
      </svg>
      }

      <div className='blocks'>
        <div className='col col-1'>
          <div className='block'>
            <img className='pergament' src={pergament}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className='block'>
            <img className='envelope' src={envelope}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className='col col-2'>
          <div className='block'>
              <img className='feather' src={feather}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
      <a href='/customize' className='order'>{t("Order a letter")}</a>
      <div className='reviews'>
        <span className='header-reviews'><p>{t("See our reviews")}</p><a href='/review'>{t("Leave a review")}</a></span>
        <div className='review'>
          <img src={testimonial}/>
          <div className='text'>
            <p className='name'>Nicholas Huisas</p>
            <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className='review'>
          <img src={testimonial}/>
          <div className='text'>
            <p className='name'>Nicholas Huisas</p>
            <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className='review'>
          <img src={testimonial}/>
          <div className='text'>
            <p className='name'>Nicholas Huisas</p>
            <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home