import React from 'react'
import penLetter from "../../images/pen-letter.jpg"

const Orders = ({}) => {
  return (
    <div className='user-orders'>
      <div className='orders'>
        <div className='order'>
          <img src={penLetter}/>
          <a target='_blank' href='/order'>Сделать заказ</a>
        </div>
        <div className='order'>
          <img src={penLetter}/>
          <p>Кто-то правда ждет твоего письма</p>
        </div>
      </div>
    </div>
  )
}

export default Orders