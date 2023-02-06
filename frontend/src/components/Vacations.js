import { t } from 'i18next'
import React from 'react'

const Vacations = () => {
  return (
    <div className='vacations'>
        <h1>{t("Vacations")}</h1>
        <p>{t("We are currently hiring new writers in Moscow")}</p>
        <h2>{t("You need to:")}</h2>
        <ul>
          <li>{t("Have calligraphy skills")}</li>
          <li>{t("Live inside MEH")}</li>
        </ul>
        <h2 className='apply'>{t("If you want to apply to us, then submit form")}</h2>
        <a href='/#/contact'>Contact</a>
    </div>
  )
}

export default Vacations