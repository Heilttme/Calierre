import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useLocation } from 'react-router-dom'
import { t } from 'i18next'
 
const Navigation = ({userData}) => {
  const [shown, setShown] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [initialPos, setInitialPos] = useState(false)
  const location = useLocation()

  const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
  }

  useEffect(() => {
    if (location.pathname === "/"){
      window.addEventListener('scroll', handleScroll, { passive: true })
      setScrollPosition(0)
      setInitialPos(true)
    } else {
      setScrollPosition(1)
      setInitialPos(false)
    }

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname])

  return (
    <motion.div
      animate={scrollPosition == 0 ? {height: "100vh", backgroundColor: "#E85A4F"} : {position: "fixed", height: "5rem", top: "0", backgroundColor: "#EAE7DC"}}
      transition={{height: {duration: 1}, backgroundColor: {duration: 1}}}
      className={`header ${scrollPosition == 0 && "extended"}`}
    >
        <motion.a
          initial={{left: "unset", fontSize: "2em", left: "45%"}}
          animate={scrollPosition == 0 ? {color: "#EAE7DC", fontSize: "10em", left: "5%", top: "2rem", textAlign: "left", transform: "unset"} : {left: "unset", fontSize: "2em", left: "45%"}}
          href='/'
          className='logo'
        >
          Write Me
        </motion.a>
        {
          scrollPosition == 0 && 
            <div className='quote-block'>
              <svg className='quote-mark' fill='currentColor' xmlns="http://www.w3.org/2000/svg"><path d="M9 3c-5.252 1.039-9 4.905-9 10.609v7.391h9.983v-10h-3.983c0-2.211 1.563-4.932 3.996-5.849l-.996-2.151zm14 0c-5.252 1.039-8.983 4.905-8.983 10.609v7.391h9.983v-10h-4c0-2.211 1.563-4.932 3.995-5.849l-.995-2.151zm-.567 1.156l.241.52c-2.394 1.391-3.674 4.159-3.674 6.324v1h4v8h-7.983v-6.391c0-4.687 2.82-8.248 7.416-9.453m-14-.001l.241.521c-2.394 1.391-3.674 4.159-3.674 6.324v1h3.983v8h-7.983v-6.391c0-4.686 2.827-8.247 7.433-9.454"/></svg>
              <motion.h3 className='quote' animate={scrollPosition == 0 ? {} : {}}>{t("Word in a beautiful wrapper might be the thing that touches humans soul")}</motion.h3>
            </div>
        }
        {
          userData.username ? 
            <motion.a animate={scrollPosition == 0 ? {backgroundColor: "#EAE7DC", color: "#E85A4F"} : {}} href='/profile' className='login'>{userData.username}</motion.a>
          :
            <motion.a animate={scrollPosition == 0 ? {backgroundColor: "#EAE7DC", color: "#E85A4F"} : {}} href='/login' className='login'>{t("Log in")}</motion.a>
        }
    </motion.div>
  )
}

export default Navigation