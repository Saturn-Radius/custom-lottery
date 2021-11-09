import React from 'react'
import { ButtonMenu, ButtonMenuItem } from '@fastswap-uikit'
import { useTranslation } from 'contexts/Localization'

const HistoryTabMenu = ({ setActiveIndex, activeIndex }) => {
  const { t } = useTranslation()

  return (
    <>
      {activeIndex? (
        <ButtonMenu activeIndex={activeIndex} onItemClick={setActiveIndex} scale="sm" variant="subtle">
        <ButtonMenuItem style={{ backgroundColor: "#FFB237",color:"white",boxShadow: "0 0 0 " }}>{t('All History')}</ButtonMenuItem>
        <ButtonMenuItem style={{ backgroundColor: "#eeeaf4",color: "#FFB237",boxShadow: "0 0 0 "}}>{t('Your History')}</ButtonMenuItem>
        </ButtonMenu>
     ):
     (
      <ButtonMenu activeIndex={activeIndex} onItemClick={setActiveIndex} scale="sm" variant="subtle">
      <ButtonMenuItem style={{ backgroundColor: "#eeeaf4",color:"#FFB237",boxShadow: "0 0 0 " }}>{t('All History')}</ButtonMenuItem>
      <ButtonMenuItem style={{ backgroundColor: "#FFB237",color: "white",boxShadow: "0 0 0 " }}>{t('Your History')}</ButtonMenuItem>
      </ButtonMenu>
     )
     }
    </>
  )
}

export default HistoryTabMenu
