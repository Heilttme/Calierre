import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Link, useLocation } from 'react-router-dom'
import { t } from 'i18next'
import useWindowDimensions from "./useWindowsDimensions"
import useScrollBlock from "./useBlockScroll"
 
const Navigation = ({ language, changeLanguage, userData, setMenuOpened, menuOpened }) => {
  const [scrolledBlocked, setScrolledBlocked] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [initialPos, setInitialPos] = useState(false)
  const location = useLocation()
  const { height, width } = useWindowDimensions()
  const [blockScroll, allowScroll] = useScrollBlock()

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

  const closeOnClick = (e) => {
    e.preventDefault()
    setMenuOpened(false)
  }

  const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
  )

  useEffect(() => {
    if (!scrolledBlocked && scrollPosition !== 0 && location.pathname === "/" && !pageAccessedByReload) {
      setScrolledBlocked(true)  
      blockScroll()
      setTimeout(() => allowScroll(), 500)
    }
  }, [scrollPosition])

  return (
    <motion.div
      animate={scrollPosition == 0 ? {height: "100vh", backgroundColor: "#E85A4F"} : {position: "fixed", height: "4rem", top: "0", backgroundColor: "#EAE7DC"}}
      transition={{height: {duration: 1}, backgroundColor: {duration: 1}}}
      className={`header ${scrollPosition == 0 && "extended"}`}
    >
      <div className={`menu${menuOpened && scrollPosition != 0 ? " opened" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className='links'>
          <a href='/order' onClick={(e) => setTimeout(() => closeOnClick(e), 10)}>{t("Order")}</a>
          <a href='/contact' onClick={(e) => setTimeout(() => closeOnClick(e), 10)}>{t("Contact")}</a>
          <a href='/vacations' onClick={(e) => setTimeout(() => closeOnClick(e), 10)}>{t("Vacations")}</a>
        </div>
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
      </div>

      {scrollPosition != 0 && <div className={`hamburger-wrapper${menuOpened ? " opened-hamburger" : ""}`} onClick={(e) => {e.stopPropagation();setMenuOpened(prev => !prev)}}><div className='hamburger'></div></div>}

      <motion.a
        initial={{left: "unset", fontSize: "2em", left: "45%"}}
        animate={scrollPosition == 0 ? {color: "#EAE7DC", fontSize: "10em", left: "5%", top: "2rem", textAlign: "left", transform: "unset"} : {left: "unset", fontSize: "2em", left: "45%"}}
        href='/'
        className='logo'
      >
        Calierré
      </motion.a>
      {
        scrollPosition == 0 && 
          <div className='quote-block'>
            <svg className='quote-mark' fill='currentColor' xmlns="http://www.w3.org/2000/svg"><path d="M9 3c-5.252 1.039-9 4.905-9 10.609v7.391h9.983v-10h-3.983c0-2.211 1.563-4.932 3.996-5.849l-.996-2.151zm14 0c-5.252 1.039-8.983 4.905-8.983 10.609v7.391h9.983v-10h-4c0-2.211 1.563-4.932 3.995-5.849l-.995-2.151zm-.567 1.156l.241.52c-2.394 1.391-3.674 4.159-3.674 6.324v1h4v8h-7.983v-6.391c0-4.687 2.82-8.248 7.416-9.453m-14-.001l.241.521c-2.394 1.391-3.674 4.159-3.674 6.324v1h3.983v8h-7.983v-6.391c0-4.686 2.827-8.247 7.433-9.454"/></svg>
            <motion.h3 className='quote' animate={scrollPosition == 0 ? {} : {}}>{t("Bringing your thoughts and feelings to life")}</motion.h3>
            <a href='/order' className='order'>{t("Order")}</a>
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

function useSetBodyScroll() {
  const [bodyScroll, setBodyScroll] = useState(true);

  useEffect(() => {
    const resetOnResize = () => {
      if (window.innerWidth <= 1023) document.body.style.overflow = "hidden";
      if (window.innerWidth >= 1024) document.body.style.overflow = "scrolls";
    };

    if (!bodyScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
      window.addEventListener("resize", resetOnResize);
    }

    return () => {
      window.removeEventListener("resize", resetOnResize);
    };
  }, [bodyScroll]);

  return setBodyScroll;
}

export default Navigation