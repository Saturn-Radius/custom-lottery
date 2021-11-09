import React from 'react'
import { Button, useWalletModal } from '@fastswap-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button  style={{backgroundColor:'#1BB697',boxShadow:'2px 7px 7px -1px rgba(27, 182, 151, 0.3)'}} onClick={onPresentConnectModal} {...props}>
      {t('Connect')}
    </Button>
  )
}

export default ConnectWalletButton
