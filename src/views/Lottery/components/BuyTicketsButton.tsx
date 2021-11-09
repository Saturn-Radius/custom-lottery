import React from 'react'
import { Button, useModal, ButtonProps } from '@fastswap-uikit'
import { WaitIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useLottery } from 'state/lottery/hooks'
import { LotteryStatus } from 'config/constants/types'
import BuyTicketsModal from './BuyTicketsModal/BuyTicketsModal'

interface BuyTicketsButtonProps extends ButtonProps {
  disabled?: boolean
}

const BuyTicketsButton: React.FC<BuyTicketsButtonProps> = ({ disabled, ...props }) => {
  const { t } = useTranslation()
  const [onPresentBuyTicketsModal] = useModal(<BuyTicketsModal />)
  const {
    currentRound: { status },
  } = useLottery()

  const getBuyButtonText = () => {
    if (status === LotteryStatus.OPEN) {
      return t('Buy Tickets')
    }
    return (
      <>
        <WaitIcon mr="4px" color="textDisabled" /> {t('On sale soon!')}
      </>
    )
  }

  return (
    <Button style={{backgroundColor:'#1BB697',boxShadow:'2px 7px 7px -1px rgba(27, 182, 151, 0.3)'}} {...props} disabled={disabled} onClick={onPresentBuyTicketsModal}>
      {getBuyButtonText()}
    </Button>
  )
}

export default BuyTicketsButton
