import React from 'react'
import penLetter from "../../images/pen-letter.jpg"
import { useNavigate } from 'react-router-dom'

const Orders = ({}) => {
  const navigate = useNavigate()
  
  const navigateToOrder = () => navigate("/order")
  
  return (
    <div className='user-orders'>
      <div className='orders'>
        <div onClick={navigateToOrder} className='order'>
          <img src={penLetter}/>
          <a>Сделать заказ</a>
        </div>
        <div onClick={navigateToOrder} className='order'>
          <img src={penLetter}/>
          <p>Кто-то правда ждет твоего письма</p>
        </div>
      </div>
    </div>
  )
}

export default Orders