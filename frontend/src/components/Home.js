import React, { useEffect, useState } from 'react'
import ink from "../images/ink.png"
import pergament from "../images/pergament.png"
import feather from "../images/feather_pen.png"
import envelope from "../images/envelope.png"
import testimonial from "../images/negr.png"
import { useTranslation } from "react-i18next"
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const Home = ({ language, changeLanguage, userData }) => {
  const { t, i18n } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [leaveReview, setLeaveReview] = useState(false)
  const [reviewValue, setReviewValue] = useState("")
  const [shownReviews, setShownReviews] = useState(3)
  
  const navigate = useNavigate()

  useEffect(() => {
    const res = axios.get("http://127.0.0.1:8000/authentication/reviews/").then(data => {
      const newReviews = []
      for (let i = 0; i < data.data.items.length; i++){
        newReviews.push({
          review: data.data.items[i].content,
          image: data.data.users.filter(el => el.id === data.data.items[i].reviewer)[0].image,
          username: data.data.users.filter(el => el.id === data.data.items[i].reviewer)[0].username,
        })
      }

      setReviews(newReviews.reverse())
    })

  }, [leaveReview])

  const setReview = (e) => {
    setReviewValue(e.target.value)
  }

  const submitReview = () => {
    const res = axios.post("http://127.0.0.1:8000/authentication/add_review/", {content: reviewValue, email: userData.email}).then(() => {
      setLeaveReview(false)
      setReviewValue("")
    })
  }

  
  const reviewsDisplay = reviews.map(el => (
    <div key={uuidv4()} className='review'>
      <img src={`http://127.0.0.1:8000${el.image}`}/>
      <div className='text'>
        <p className='name'>{el.username}</p>
        <p className='desc'>{el.review}</p>
      </div>
    </div>
  ))

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
        <span className='header-reviews'><p>{t("See our reviews")}</p><button onClick={() => {
          if (userData.email) setLeaveReview(prev => !prev) 
          else navigate("/login")
        }}>{t("Leave a review")}</button></span>
          <motion.div
            initial={{height: "0"}}
            animate={{height: leaveReview ? "100%" : "0"}}
            transition={{type: "keyframes"}} 
            className='leave-review'
          >
            <img src={userData.image}/>
            <div className='text'>
              <p className='name'>{userData.username}</p>
              <input 
                name='review'
                id='review'
                onChange={(e) => setReview(e)}
                value={reviewValue}
              />
            <button onClick={submitReview}>{t("Submit")}</button>
            </div>
          </motion.div>
        {reviewsDisplay.splice(0, shownReviews)}
        <button className='more-reviews' onClick={() => setShownReviews(prev => prev += 2)}>More</button>
      </div>
    </div>
  )
}

export default Home