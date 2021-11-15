import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, Flex, Heading, Skeleton } from '@fastswap-uikit'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd,useAmountTotoal } from 'state/farms/hooks'
import { useLottery } from 'state/lottery/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { TicketPurchaseCard } from '../svgs'
import BuyTicketsButton from './BuyTicketsButton'

const floatingStarsLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }
`

const floatingStarsRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 10px);
  }
  to {
    transform: translate(0, -0px);
  }
`

const floatingTicketLeft = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }
`

const floatingTicketRight = keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(10px, 15px);
  }
  to {
    transform: translate(0, -0px);
  }
`

const mainTicketAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(6deg);
  }
  to {
    transform: rotate(0deg);
  }
`

const TicketContainer = styled(Flex)`
  animation: ${mainTicketAnimation} 3s ease-in-out infinite;
`

const PrizeTotalBalance = styled(Balance)`
  -webkit-background-clip: text;
  -webkit-text-fill-color: #FFB237;
`

const StyledBuyTicketButton = styled(BuyTicketsButton)<{ disabled: boolean }>`
  width: 200px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 240px;
  }
`

const ButtonWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-4deg);
`

const TicketSvgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-4deg);
`

const StarsDecorations = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-bottom: 50px;

  & img {
    position: absolute;
  }

  & :nth-child(1) {
    animation: ${floatingStarsLeft} 0s ease-in-out infinite;
    animation-delay: 0.25s;
  }
  & :nth-child(2) {
    // filter: blur(3px);
    animation: ${floatingStarsLeft} 0s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  & :nth-child(3) {
    animation: ${floatingStarsRight} 0s ease-in-out infinite;
    animation-delay: 0.75s;
  }
  & :nth-child(4) {
    animation: ${floatingTicketLeft} 0s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  & :nth-child(5) {
    animation: ${floatingTicketRight} 0s ease-in-out infinite;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & :nth-child(1) {
      left: 8%;
      top: 25%;
    }
    & :nth-child(2) {
      left: 5%;
      top: 78%;
    }
    & :nth-child(3) {
      right: 8%;
      top: 18%;
    }
    & :nth-child(4) {
      right: 10%;
      top: 77%;
    }
    & :nth-child(5) {
      right: 8%;
      top: 77%;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & :nth-child(1) {
      left: 8%;
      top: 25%;
    }
    & :nth-child(2) {
      left: 10%;
      top: 78%;
    }
    & :nth-child(3) {
      right: 12%;
      top: 18%;
    }
    & :nth-child(4) {
      right: 20%;
      top: 77%;
    }
    & :nth-child(5) {
      right: 17%;
      top: 67%;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    & :nth-child(1) {
      left: 15%;
      top: 25%;
    }
    & :nth-child(2) {
      left: 13%;
      top: 78%;
    }
    & :nth-child(3) {
      right: 20%;
      top: 18%;
    }
    & :nth-child(4) {
      right: 25%;
      top: 77%;
    }
    & :nth-child(5) {
      right: 24%;
      top: 67%;
    }
  }
`

const Hero = () => {
  const { t } = useTranslation()
  const {
    currentRound: { amountCollectedInCake, status },
    isTransitioning,
  } = useLottery()

  const cakePriceBusd = usePriceCakeBusd()
  const prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  const prizeTotal = getBalanceNumber(prizeInBusd)

  const totalAmount=useAmountTotoal()
  const leftAmountBusd=totalAmount.times(cakePriceBusd)
  const leftAmount=getBalanceNumber(leftAmountBusd)
  
  const sumPrize= prizeTotal+leftAmount

   console.log(sumPrize);

   const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const getHeroHeading = () => {
    if (status === LotteryStatus.OPEN) {
      return (
        <>
         <Heading mb="32px"  color="#666666" marginTop="15px">  {/* scale="lg" */}
            {t('The FastSwap Lottery')}
         </Heading>
          {prizeInBusd.isNaN() ? (
            <Skeleton my="7px" height={60} width={190} />
          ) : (
            <PrizeTotalBalance fontSize="64px" bold prefix="$" value={sumPrize} mb="8px" decimals={0} />
          )}
          <Heading mb="32px"  color="#666666">  {/* scale="lg" */}
            {t('in prizes!')}
          </Heading>
        </>
      )
    }
    return (
      <Heading mb="24px" color="#ffffff">   {/* scale="xl" */}
        {t('Tickets on sale soon')}
      </Heading>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <StarsDecorations display={['none', 'none', 'inline']}>
        {/* <img src="/images/lottery/coin-all.png" width="80%" height="80%" alt="" /> */}
        <img src="/images/lottery/coin.png" width="121px" height="121px" alt="" />
        <img src="/images/lottery/coin.png" width="150px" height="150px" alt="" />
        <img src="/images/lottery/coin.png" width="100px" height="100px" alt="" />
        <img src="/images/lottery/coin.png" width="121px" height="121px" alt="" />
      </StarsDecorations>
      {getHeroHeading()}
      <TicketContainer
        position="relative"
        width={['240px', '288px']}
        height={['94px', '113px']}
        alignItems="center"
        justifyContent="center"
      >
        <ButtonWrapper>
          <StyledBuyTicketButton style={{backgroundColor:'#1BB697',boxShadow:'2px 7px 7px -1px rgba(27, 182, 151, 0.3)'}} disabled={ticketBuyIsDisabled} />
        </ButtonWrapper>
        <TicketSvgWrapper>
          <TicketPurchaseCard width="100%" />
        </TicketSvgWrapper>
      </TicketContainer>
    </Flex>
  )
}

export default Hero
