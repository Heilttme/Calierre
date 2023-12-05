import React, { useEffect, useState } from 'react'
import ink from "../images/ink.png"
import videoCandleWriter from "../images/bg_candle.MP4"

import test1 from "../images/test1.jpeg"
import test2 from "../images/test2.jpeg"
import test3 from "../images/test3.jpeg"
import test4 from "../images/test3.jpeg"
import test5 from "../images/test3.jpeg"
import test6 from "../images/test5.jpeg"

import { useTranslation } from "react-i18next"
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowDimensions from "./useWindowsDimensions"
import useScrollBlock from "./useBlockScroll"
import Carousel from './carousel/Carousel'
import HorizontalScrollCarousel from './carousel/HorizontalScrollCarousel'

const Home = ({ userData }) => {
  const { t, i18n } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [leaveReview, setLeaveReview] = useState(false)
  const [reviewValue, setReviewValue] = useState("")
  const [shownReviews, setShownReviews] = useState(3)
  const [expandReviewImage, setExpandReviewImage] = useState(false)
  const [reviewImage, setReviewImage] = useState("")
  const [attachedImageEvent, setAttachedImageEvent] = useState("")
  const { height, width } = useWindowDimensions()
  const [blockScroll, allowScroll] = useScrollBlock()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    const res = axios.get("/authentication/reviews/").then(data => {
      const newReviews = []
      for (let i = 0; i < data.data.items.length; i++){
        newReviews.push({
          review: data.data.items[i].content,
          reviewImage: data.data.items[i].image,
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
    const uploadData = new FormData()
    uploadData.append("image", attachedImageEvent.target.files[0])
    uploadData.append("content", reviewValue)
    uploadData.append("email", userData.email)

    const res = axios.post("/authentication/add_review/", uploadData).then((data) => {
      setLeaveReview(false)
      setReviewValue("")
    })
  }

  const reviewsDisplay = reviews.map(el => (
    <div key={uuidv4()} className='review'>
      <img src={`https://api.calierre.ru${el.image}`}/>
      <div className='text'>
        <p className='name'>{el.username}</p>
        <p className='desc'>{el.review}</p>
        <p className='view' onClick={(e) => {e.stopPropagation();setReviewImage("");blockScroll();setExpandReviewImage(true);setReviewImage(`https://api.calierre.ru${el.reviewImage}`)}}>View image</p>
      </div>
    </div>
  ))

  const carouselItems = [
    <img src={test1}/>,
    <img src={test2}/>,
    <img src={test3}/>,
    <img src={test4}/>,
    <img src={test5}/>,
    <img src={test6}/>
  ]

  const video = document.getElementsByClassName('video-bg')[0]

  if (video) {
    video.playbackRate = .8;
  }

  return (
    <div className='home-wrapper' onClick={() => {setExpandReviewImage(false);allowScroll()}}>
      <motion.div animate={expandReviewImage ? {opacity: 0.35} : {opacity: 1}} className='home'>
        {/* <img src={ink} className='bg-ink image-1'/>
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
        <img src={ink} className='bg-ink image-23'/> */}
{/* 
        <div className='pergament-previews'>
          <Paper/>
        </div> */}
        
        <div className='video-bg-block'>
          {/* <video className='video-bg' src={videoCandleWriter} autoPlay loop muted/> */}
          <HorizontalScrollCarousel/>
        </div>
        <div className='order-options'>
          
          <div className='card'>
            <div className='card-content'>
              <div className='title'>
                <p className='card-title'>BASIC</p>
                <p className='card-title'>490</p>
              </div>
              <div className='characteristics'>
                <p>{t("Printed letter")}</p>
                <p>{t("Seal options")}</p>
                <p>{t("Delivery")}</p>
              </div>
            </div>
            <img src={test1} className='bg-img'/>
          </div>
          <div className='card'>
            <div className='card-content'>
              <div className='title'>
                <p className='card-title'>ADVANCED</p>
                <p className='card-title'>890</p>
              </div>
              <div className='characteristics'>
                <p>{t("Handwritten letter")}</p>
                <p>{t("Huge variety of sealing wax")}</p>
                <p>{t("Seal options")}</p>
                <p>{t("Delivery")}</p>
              </div>
            </div>
            <img src={test1} className='bg-img'/>
          </div>
          <div className='card'>
            <div className='card-content'>
              <div className='title'>
                <p className='card-title'>EVENT</p>
                <p className='card-title'>&gt;10</p>
              </div>
              <div className='characteristics'>
                <p>{t("For your events")}</p>
              </div>
            </div>
            <img src={test1} className='bg-img'/>
          </div>
          {/* <a className='order' href='/order'>{t("Order")}</a> */}
        </div>
        <div className='slick-slider-container'>
          <p className='header-options'>{t("Our letters")}</p>
          <Carousel
            itemWidth={width <= 1800 ? width <= 1700 ? width <= 1600 ? width <= 1400 ? width <= 1300 ? width <= 1200 ? width <= 1100 ? width <= 1000 ? 300 : 200 : 220 : 260 : 200 : 220 : 250 : 250 : 300}
            itemCount={carouselItems.length}
            itemsPerScroll={width <= 1800 ? width <= 1700 ? width <= 1600 ? width <= 1400 ? width <= 1300 ? width <= 1000 ? 2 : 3 : 4 : 4 : 4 : 5 : 4}
          >
            {carouselItems}
          </Carousel>
        </div>
        {/* <a href='/customize' className='order'>{t("Order a letter")}</a> */}
        <div className='reviews'>
          <span className='header-reviews'><p>{t("See our reviews")}</p><button onClick={() => {
            if (userData.email) 
            setLeaveReview(prev => !prev) 
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
                <textarea 
                  name='review'
                  id='review'
                  onChange={(e) => setReview(e)}
                  value={reviewValue}
                />
                <input className='file' type="file" id='file' accept='image/*' onChange={(e) => setAttachedImageEvent(e)}/>
                <label htmlFor="file">
                  { 
                    attachedImageEvent === "" ?
                    <>
                      <svg fill='currentColor' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23 0v20h-8v-2h6v-16h-18v16h6v2h-8v-20h22zm-12 13h-4l5-6 5 6h-4v11h-2v-11z"/></svg>
                      {t("Select image")}
                    </>
                      :
                    <>
                      <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>
                      {t("Image is attached")}
                    </>
                  }
                </label>
              <button onClick={submitReview}>{t("Submit")}</button>
              </div>
            </motion.div>
          {reviewsDisplay.splice(0, shownReviews)}
          <button className={`more-reviews`} onClick={() => setShownReviews(prev => prev += 2)}>{t("More")}</button>
        </div>
      </motion.div>
      <motion.div
        className='extended'
        initial={{width: 0, height: 0, padding: 0}}
        animate={expandReviewImage ? width < 900 ? width < 650 ? width < 450 ? {width: 320, height: 240} : {width: 400, height: 300} : {width: 600, height: 450} : {width: 800, height: 600} : {width: 0, height: 0}}
      >
        <motion.img 
          className='skeleton'
          animate={expandReviewImage ? width < 900 ? width < 650 ? width < 450 ? {width: 320, height: 240} : {width: 400, height: 300} : {width: 600, height: 450} : {width: 800, height: 600} : {width: 0, height: 0}}
          src={reviewImage}
          alt=""
        />
      </motion.div>
    </div>
  )
}

// const Paper = () => {
//   const texts = [
//     {head: "Уважаемая Екатерина Сергеевна!", end: "", content: "Компания ООО «Фрешкейк» приглашает Вас посетить презентацию нашей новой продукции. Мероприятие будет проходить по адресу: г. Москва, ул. Черняховского, д. 19, «белый» зал, 3 апреля 2023 года в 13:00. В программе: дегустация продукции, фуршет. Ответственный за мероприятие Сорокин Никита Сергеевич, тел.: 8 (8332) 63-63-63 Генеральный директор ООО «Фрешкейк» Хатукаев / Э.В. Хатукаев."},
//     {head: "Дорогой Владислав!", end: "Ваши Никита и Анастасия", content: 'В связи со сложившимися обстоятельствами, а именно: \n невозможностью больше глядеть на пустующую 14 страницу наших паспортов и постоянно отвечать на вопросы: "Ну когда же уже?", мы все-таки решили совершить обряд бракосочетания. \n В связи с чем, будем рады видеть Вас на нашей свадьбе 5 июня 2023 года! \n Данное мероприятие будет проходить в нескольких действиях: \n Действие 1 (для души): Торжественное, по адресу: г. Москва, ул. Горная 48 \n Действие 2 (для желудка): Горько-Поцелуйно-Выпивательное,  по адресу: г. Москва, ул. Полянка 11'},
//     {head: "Дорогой,", end: "Твоя и только твоя Лиза", content: 'Спасибо, что был рядом, когда мне нужна была твоя поддержка, что терпеливо слушал мои проблемы и жалобы. Любимый, я просто хочу, чтобы ты знал, как я счастлива, что ты есть в моей жизни. Спасибо тебе за любовь и радость, которую ты приносишь. Ты изменил мою жизнь, Малыш. Я люблю тебя, и хочу чтоб ты хранил нашу любовь в своем сердце.'},
//     {head: "Любимая,", end: "Твой Илья", content: 'Всегда знай, что я люблю тебя. Я скучаю по тебе каждый день. Глубоко в моем сердце выгравированы воспоминания о тебе. Передо мной всплывают наши встречи, твоя улыбка, твой взгляд, черты лица. Я безмерно рад, что нашел тебя, мы так близки душой и одновременно далеки друг от друга. Я люблю тебя, дорогая, ты всегда будешь моей мечтой.'},
//   ]

//   const [textObject, setTextObject] = useState(texts[Math.floor(Math.random() * texts.length)])
//   const [fullTextTitle, setFullTextTitle] = useState("")
//   const [fullEndTitle, setFullEndTitle] = useState("")
//   const [fullText, setFullText] = useState("")
//   const [paperTitleText, setPaperTitleText] = useState("")
//   const [paperEndText, setPaperEndText] = useState("")
//   const [paperText, setPaperText] = useState("")
  
//   useEffect(() => {
//     setFullTextTitle(textObject.head)
//     setFullText(textObject.content)
//     setFullEndTitle(textObject.end)
//   }, [textObject])

//   useEffect(() => {
//     for (let i = 0; i < fullTextTitle.length; i++) {
//       setTimeout(() => setPaperTitleText(prev => prev += fullTextTitle[i]), 4000 + (i * 70))
//     }
//     for (let i = 0; i < fullText.length; i++) {
//       setTimeout(() => setPaperText(prev => prev += fullText[i]), 4000 + (fullTextTitle.length * 70) + (i * 70))
//     }
//     for (let i = 0; i < fullEndTitle.length; i++) {
//       setTimeout(() => setPaperEndText(prev => prev += fullEndTitle[i]), 4000 + (fullEndTitle.length * 70) + (fullText.length * 70) + (i * 70))
//     }
//   }, [fullText])
  
//   return (
//     <div className='pergament-paper'>
//       {paperTitleText}
//       {paperTitleText ? <br/>: ""}
//       {paperText}
//       {paperEndText ? <br/>: ""}
//       {paperEndText}
//     </div>
//   )
// }

/*

<div className='wrapper'>
            <div className='option'>
                <div className='before'>
                  <h2>{t("Basic")}</h2>
                  <p>₽<strong>490</strong></p>
                </div>
                <div className='describe'>
                  <p>·{t("Printed letter")}</p>
                  <p>·{t("Seal options")}</p>
                  <p>·{t("Delivery")}</p>
                </div>
            </div>
            <div className='option'>
                <div className='before'>
                  <h2>{t("Advanced")}</h2>
                  <p>₽<strong>690</strong></p>
                </div>
                <div className='describe'>
                  <p>·{t("Handwritten letter")}</p>
                  <p>·{t("Huge variety of sealing wax")}</p>
                  <p>·{t("Seal options")}</p>
                  <p>·{t("Delivery")}</p>
                </div>
            </div>
            <div className='option multiple-b'>
                <div className='before'>
                  <h2 className='multiple'>{t("Multiple")}</h2>
                  <p className='multiple-p'><strong>{t("From 10")}</strong></p>
                </div>
                <div className='describe'>
                  <p>·{t("For your events")}</p>
                </div>
                <a className='contact-us' href='/contact'>{t("Contact us")}</a>
            </div>
          </div>

*/

export default Home