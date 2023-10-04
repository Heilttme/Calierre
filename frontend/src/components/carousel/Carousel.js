import React, { useState, useEffect, Children, cloneElement } from 'react'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Carousel = ({itemWidth, itemCount, itemsPerScroll, children}) => {
  const [offSet, setOffSet] = useState(0)
  const ITEM_WIDTH = itemWidth
  const ITEM_COUNT = itemCount
  const [pages, setPages] = useState([])

  const goLeft = () => {
    setOffSet(prev => prev + ITEM_WIDTH + 16 <= 0 ? prev + ITEM_WIDTH + 16 : prev)
  }

  const goRight = () => {
    setOffSet(prev => prev - ITEM_WIDTH - 16 > -(ITEM_WIDTH * (ITEM_COUNT - itemsPerScroll + 1)) ? prev - ITEM_WIDTH - 16 : prev )
  }

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            width: itemWidth
          },
        })
      })
    )
  }, [])

  return (
    <div className='carousel-wrapper'>
        <FaChevronLeft className="arrow" onClick={goLeft}></FaChevronLeft>
        <div className='wrapper'>
          <motion.div 
            style={{width: ITEM_WIDTH * itemsPerScroll + 16 * (itemsPerScroll - 1), transform: `translateX(${offSet}px)`}}
            className='carousel-items'
          >
            {pages}
          </motion.div>
        </div>
        <FaChevronRight width={24} className="arrow" onClick={goRight}></FaChevronRight>
    </div>
  )
}

export default Carousel