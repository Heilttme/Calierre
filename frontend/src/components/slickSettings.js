import React from 'react'
import rArrow from "../images/right_arrow.svg"
import lArrow from "../images/left_arrow.svg"

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div style={{...style}} onClick={onClick} className={`arrow-image-right ${className}`}>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div style={{...style}} onClick={onClick} className={`arrow-image-left ${className}`}>
    </div>
  );
}

/* height: 15rem;
width: 2rem;
padding: 6.5rem .4rem; */

export const setSettings = (items) => {
    return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: items,
        slidesToScroll: items,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
}