import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DeliveryTime = ({ orderData }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!orderData.content || !orderData.option || ( !orderData.sealBasic.length && orderData.option == "Basic" ) || ( !orderData.sealAdvanced.length && !orderData.waxAdvanced.length && orderData.option == "Advanced" ) || ( !orderData.option == "Multiple" )) navigate("/order") 
  }, [])
    
  return (
    <div>
      <h1>Choose delivery time</h1>
    </div>
  )
}

export default DeliveryTime