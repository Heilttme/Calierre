import React, { useEffect, useState } from 'react'
import ink from "../images/ink.png"
import pergament from "../images/pergament.png"
import feather from "../images/feather_pen.png"
import envelope from "../images/envelope.png"
import rose from "../images/rose_let.png"
import { useTranslation } from "react-i18next"
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { use } from 'i18next'
import { Link, NavLink } from "react-router-dom"

const Home = ({ userData }) => {
  const { t, i18n } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [leaveReview, setLeaveReview] = useState(false)
  const [reviewValue, setReviewValue] = useState("")
  const [shownReviews, setShownReviews] = useState(3)
  const [expandedBlock1, setExpandedBlock1] = useState(false)
  const [expandedBlock2, setExpandedBlock2] = useState(false)
  const [expandedBlock3, setExpandedBlock3] = useState(false)
  // const [reviewsDisplay, setReviewsDisplay] = useState([])

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
    const res = axios.post("/authentication/add_review/", {content: reviewValue, email: userData.email}).then((data) => {
      setLeaveReview(false)
      setReviewValue("")
    })
    .catch(data => console.log(data.response.data))
  }

  const reviewsDisplay = reviews.map(el => (
    <div key={uuidv4()} className='review'>
      <img src={`https://api.calierre.ru${el.image}`}/>
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

      <div className='pergament-previews'>
        <Paper/>
      </div>
      <div className='blocks'>
        <div className='col col-1'>
          <motion.div
            className='block'
            onClick={() => setExpandedBlock1(prev => !prev)}
          >
            <img className='pergament' src={pergament}/>
            <p>{t("Writing has always been a very popular means of communication. It was believed that an educated person simply must be able to write beautiful letters. Now, of course, the situation has changed, but you can be impressed by a beautiful and perfectly composed letter nowadays, too!")}</p>
          </motion.div>
          <motion.div 
            className='block' 
            onClick={() => setExpandedBlock2(prev => !prev)}
          >
            <img className='envelope' src={envelope}/>
            <p>{t("Our company provides every person with an opportunity to get their hands on a real, beautifully designed, competent letter that will certainly warm the heart of your beloved ones.")}</p>
          </motion.div>
        </div>
        <div className='col col-2'>
          <motion.div 
            className='block' 
            onClick={() => setExpandedBlock3(prev => !prev)}
          >
            <img className='feather' src={rose}/>
            <p>
              {t("Confess to your crush.")}  
              <br/>
              <br/>
              {t("Congratulate your friend on his birthday through a letter, he will be pleasantly surprised.")}
              <br/>
              <br/>
              {t("A letter can serve as an interesting and unusual gift for holidays such as Valentine’s Day, March 8th.")}
            </p>
          </motion.div>
          <motion.div 
            className='block' 
            onClick={() => setExpandedBlock3(prev => !prev)}
          >
            <img className='feather' src={feather}/>
            <p>
              
              {t("In addition to letters, our company is engaged in the production of personalized, creative invitations that will serve as an excellent tone in organizing your event, whether it's a wedding, corporate party or birthday.")}
            </p>  
          </motion.div>
        </div>
      </div>
      <div className='order-options'>
        <p className='header-options'>{t("Order options")}</p>
        <div className='wrapper'>

          <div className='option'>
              <div className='before'>
                <h2>{t("Basic")}</h2>
                <p>₽<strong>490</strong></p>
              </div>
              <div className='describe'>
                <p>·{t("Printed letter")}</p>
                <p>·{t("Seal options")}</p>
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
        <button className={`more-reviews`} onClick={() => setShownReviews(prev => prev += 2)}>{t("More")}</button>
      </div>
    </div>
  )
}

const Paper = () => {
  const texts = [
    {head: "Уважаемая Екатерина Сергеевна!", end: "", content: "Компания ООО «Фрешкейк» приглашает Вас посетить презентацию нашей новой продукции. Мероприятие будет проходить по адресу: г. Москва, ул. Черняховского, д. 19, «белый» зал, 3 апреля 2023 года в 13:00. В программе: дегустация продукции, фуршет. Ответственный за мероприятие Сорокин Никита Сергеевич, тел.: 8 (8332) 63-63-63 Генеральный директор ООО «Фрешкейк» Хатукаев / Э.В. Хатукаев."},
    {head: "Дорогой Владислав!", end: "Ваши Никита и Анастасия", content: 'В связи со сложившимися обстоятельствами, а именно: \n невозможностью больше глядеть на пустующую 14 страницу наших паспортов и постоянно отвечать на вопросы: "Ну когда же уже?", мы все-таки решили совершить обряд бракосочетания. \n В связи с чем, будем рады видеть Вас на нашей свадьбе 5 июня 2023 года! \n Данное мероприятие будет проходить в нескольких действиях: \n Действие 1 (для души): Торжественное, по адресу: г. Москва, ул. Горная 48 \n Действие 2 (для желудка): Горько-Поцелуйно-Выпивательное,  по адресу: г. Москва, ул. Полянка 11'},
    {head: "Дорогой,", end: "Твоя и только твоя Лиза", content: 'Спасибо, что был рядом, когда мне нужна была твоя поддержка, что терпеливо слушал мои проблемы и жалобы. Любимый, я просто хочу, чтобы ты знал, как я счастлива, что ты есть в моей жизни. Спасибо тебе за любовь и радость, которую ты приносишь. Ты изменил мою жизнь, Малыш. Я люблю тебя, и хочу чтоб ты хранил нашу любовь в своем сердце.'},
    {head: "Любимая,", end: "Твой Илья", content: 'Всегда знай, что я люблю тебя. Я скучаю по тебе каждый день. Глубоко в моем сердце выгравированы воспоминания о тебе. Передо мной всплывают наши встречи, твоя улыбка, твой взгляд, черты лица. Я безмерно рад, что нашел тебя, мы так близки душой и одновременно далеки друг от друга. Я люблю тебя, дорогая, ты всегда будешь моей мечтой.'},
  ]

  const [textObject, setTextObject] = useState(texts[Math.floor(Math.random() * texts.length)])
  const [fullTextTitle, setFullTextTitle] = useState("")
  const [fullEndTitle, setFullEndTitle] = useState("")
  const [fullText, setFullText] = useState("")
  const [paperTitleText, setPaperTitleText] = useState("")
  const [paperEndText, setPaperEndText] = useState("")
  const [paperText, setPaperText] = useState("")
  
  useEffect(() => {
    setFullTextTitle(textObject.head)
    setFullText(textObject.content)
    setFullEndTitle(textObject.end)
  }, [textObject])

  useEffect(() => {
    for (let i = 0; i < fullTextTitle.length; i++) {
      setTimeout(() => setPaperTitleText(prev => prev += fullTextTitle[i]), 4000 + (i * 70))
    }
    for (let i = 0; i < fullText.length; i++) {
      setTimeout(() => setPaperText(prev => prev += fullText[i]), 4000 + (fullTextTitle.length * 70) + (i * 70))
    }
    for (let i = 0; i < fullEndTitle.length; i++) {
      setTimeout(() => setPaperEndText(prev => prev += fullEndTitle[i]), 4000 + (fullEndTitle.length * 70) + (fullText.length * 70) + (i * 70))
    }
  }, [fullText])
  
  return (
    <div className='pergament-paper'>
      {paperTitleText}
      {paperTitleText ? <br/>: ""}
      {paperText}
      {paperEndText ? <br/>: ""}
      {paperEndText}
    </div>
  )
}

export default Home