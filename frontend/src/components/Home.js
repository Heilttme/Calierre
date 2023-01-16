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
import { use } from 'i18next'

const Home = ({ userData }) => {
  const { t, i18n } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [leaveReview, setLeaveReview] = useState(false)
  const [reviewValue, setReviewValue] = useState("")
  const [shownReviews, setShownReviews] = useState(3)
  const [expandedBlock1, setExpandedBlock1] = useState(false)
  const [expandedBlock2, setExpandedBlock2] = useState(false)
  const [expandedBlock3, setExpandedBlock3] = useState(false)

  const [fullTextTitle, setFullTextTitle] = useState("Hi Jessica")
  const [fullText, setFullText] = useState("I would like to say your my bestie I would like to say your my bestie I would like to say your my bestie I would like to say your my bestie I would like to say your my bestie I would like to say your my bestie ")
  const [paperTitleText, setPaperTitleText] = useState("")
  const [paperText, setPaperText] = useState("")
  
  const navigate = useNavigate()

  useEffect(() => {
    for (let i = 0; i < fullTextTitle.length; i++) {
      setTimeout(() => setPaperTitleText(prev => prev += fullTextTitle[i]), 4000 + (i * 200))
    }
    for (let i = 0; i < fullText.length; i++) {
      setTimeout(() => setPaperText(prev => prev += fullText[i]), 4000 + (fullTextTitle.length * 200) + (i * 200))
    }
  }, [])

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
    <div className='home'>
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

      <div className='blocks'>
        <div className='col col-1'>
          <motion.div
            className='block'
            animate={expandedBlock1 ? {width: "22rem", height: "26rem"} : {width: "9.5rem", height: "8rem"}}
            onClick={() => setExpandedBlock1(prev => !prev)}
          >
            <img className='pergament' src={pergament}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </motion.div>
          <motion.div 
            className='block' 
            animate={expandedBlock2 ? {width: "22rem", height: "26rem"} : {width: "9.5rem", height: "8rem"}}
            onClick={() => setExpandedBlock2(prev => !prev)}
          >
            <img className='envelope' src={envelope}/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </motion.div>
        </div>
        <div className='col col-2'>
          <motion.div 
            className='block' 
            animate={expandedBlock3 ? {width: "22rem", height: "26rem"} : {width: "9.5rem", height: "8rem"}}
            onClick={() => setExpandedBlock3(prev => !prev)}
          >
              <img className='feather' src={feather}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </motion.div>
        </div>
      </div>
      <div className='pergament-previews'>
        <div className='pergament-paper'>
          {paperTitleText}
          <br/>
          {paperText}
        </div>
      </div>
      <div className='order-options'>
        <p className='header-options'>{t("Order options")}</p>
        <div className='wrapper'>

          <div className='option'>
              <div className='before'>
                <h2>Basic</h2>
                <p>$<strong>5</strong></p>
              </div>
              <div className='describe'>
                <p>chet eto d</p>
                <p>eche eto</p>
                <p>i vse</p>
              </div>
          </div>
          <div className='option'>
              <div className='before'>
                <h2>Advanced</h2>
                <p>$<strong>7</strong></p>
              </div>
              <div className='describe'>
                <p>chet eto d</p>
                <p>eche eto</p>
                <p>i vse</p>
              </div>
          </div>
          <div className='option'>
              <div className='before'>
                <h2>Multiple</h2>
                <p>$<strong>3</strong></p>
              </div>
              <div className='describe'>
                <p>chet eto d</p>
                <p>eche eto</p>
                <p>i vse</p>
              </div>
          </div>
        </div>
      </div>
      {/* <a href='/customize' className='order'>{t("Order a letter")}</a> */}
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
        <button className={`more-reviews`} onClick={() => setShownReviews(prev => prev += 2)}>More</button>
      </div>
    </div>
  )
}

export default Home