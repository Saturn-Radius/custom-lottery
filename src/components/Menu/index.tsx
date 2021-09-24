import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Menu as UikitMenu } from '@fastswap-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import config from './config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'


const Menu = (props) => {
  const { account } = useWeb3React()
  const { isDark, toggleTheme } = useTheme()
  const { login, logout } = useAuth()
  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      links={config(t)}
      // userMenu={<UserMenu />}
      // globalMenu={<GlobalSettings />}
      // isDark={isDark}
      // toggleTheme={toggleTheme}
      // currentLang={currentLanguage.code}
      // langs={languageList}
      // setLang={setLanguage}
      // links={config(t)}
      // profile={{
      //   username: profile?.username,
      //   image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
      //   profileLink: '/profile',
      //   noProfileLink: '/profile',
      //   showPip: !profile?.username,
      // }}
      {...props}
    />
  )
}

export default Menu
