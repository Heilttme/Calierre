import { t } from 'i18next'
import React from 'react'

const SuccessfulPayment = () => {
  return (
    <div>
        <h1>{t("Success!")}</h1>
        <p>{t("You have successfully ordered a letter.")}</p>
        <p>{t("Check your profile.")}</p>
    </div>
  )
}

export default SuccessfulPayment