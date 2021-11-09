import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Flex, Heading, Skeleton } from '@fastswap-uikit'
import { LotteryStatus } from 'config/constants/types'
import PageSection from 'components/PageSection'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useFetchLottery, useLottery } from 'state/lottery/hooks'
import {
  TITLE_BG,
  GET_TICKETS_BG,
  FINISHED_ROUNDS_BG,
  FINISHED_ROUNDS_BG_DARK,
  CHECK_PRIZES_BG,
} from './pageSectionStyles'
import useGetNextLotteryEvent from './hooks/useGetNextLotteryEvent'
import useStatusTransitions from './hooks/useStatusTransitions'
import Hero from './components/Hero'
import NextDrawCard from './components/NextDrawCard'
import Countdown from './components/Countdown'
import HistoryTabMenu from './components/HistoryTabMenu'
import YourHistoryCard from './components/YourHistoryCard'
import AllHistoryCard from './components/AllHistoryCard'
import CheckPrizesSection from './components/CheckPrizesSection'
import HowToPlay from './components/HowToPlay'
import useShowMoreUserHistory from './hooks/useShowMoreUserRounds'

const LotteryPage = styled.div`
  // min-height: calc(100vh - 64px);
position: relative;
width: 100%;
justify-content:center;

padding-left:15px;
  padding-right:15px;
  padding-top: 16px;
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 32px;
    padding-bottom: 32px;
    padding-left:80px;
    padding-right:80px;
  }

row-count:5;
col-count:0;

background: linear-gradient(248.4deg, #07AE9A 0%, rgba(0, 198, 79, 0.32) 106.73%);
opacity: 1;

`
const Section1 = styled.div<{ hVal?: string }>`
  position: relative;
  background: #FBFEFD;
  border-radius: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow:15px 15px 15px -1px rgba(27, 182, 151, 0.3);
`
const BgBuyImage=styled.div`
  position: relative;
  background-image: url("../images/lottery/falling.png");
  background-size:cover;
  width: 100%;
  padding-left:0px;
  padding-right:0px;
  padding-top: 16px;
  padding-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 32px;
    padding-bottom: 100px;
    padding-left:15px;
    padding-right:15px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 48px;
    padding-bottom: 150px;
    padding-left:30px;
    padding-right:30px;
  }
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Section = styled.div<{ hVal?: string }>`
  position: relative;
  background: #FBFEFD;
  border-radius: 30px;
  width: 100%;
  flex-flow: column wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:30px;
  padding-top:60px;
  box-sizing: border-box;
  margin-top:30px;
  margin-bottom:50px;
  box-shadow:15px 15px 15px -1px rgba(27, 182, 151, 1);
`
const ConnectSection = styled.div<{ hVal?: string }>`
  position: relative;
  background: #FBFEFD;
  border-radius: 30px;
  width: 100%;
  flex-flow: column wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:0;
  padding-top:0;
  box-sizing: border-box;
  box-shadow:15px 15px 15px -1px rgba(27, 182, 151, 1);
`
const Title = styled.span<{ color?: string, size?: string }>`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: ${({ size }) => size};
  color:${({ color }) => color};
  font-weight: bold;
`;

const BgImage=styled.div`
  position: relative;
  background-image: url("../images/lottery/falling-connect.png");
  background-size:cover;
  width: 100%;
  padding:30px;
  padding-top:60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const EllipseDecorations1 = styled(Box)`
  position: absolute;
  width: 100%;
  left:67%;
  top: 4%;
  & img {
    position: absolute;
  }
`
const EllipseDecorations2 = styled(Box)`
  position: absolute;
  width: 100%;
  left:2%;
  top: 10%;
  & img {
    position: absolute;
  }
`
const Lottery = () => {
  useFetchLottery()
  useStatusTransitions()
  const { t } = useTranslation()
  const { isDark, theme } = useTheme()
  const {
    currentRound: { status, endTime },
  } = useLottery()
  const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
  const endTimeAsInt = parseInt(endTime, 10)
  const { numUserRoundsRequested, handleShowMoreUserRounds } = useShowMoreUserHistory()
  const { nextEventTime, postCountdownText, preCountdownText } = useGetNextLotteryEvent(endTimeAsInt, status)



  return (
    <LotteryPage>
      <EllipseDecorations1 display={['none', 'none', 'inline-block']} >
          <img src="/images/lottery/ellipse1.png" width="30%" height="30%" alt="coin" />
      </EllipseDecorations1>
      <EllipseDecorations2 display={['none', 'none', 'inline-block']} >
          <img src="/images/lottery/ellipse2.png" width="20%" height="20%" alt="coin" />
      </EllipseDecorations2>

      <Section1>
        <BgBuyImage>
         <Hero />
        </BgBuyImage>
      </Section1>

      <Section>
        <Flex alignItems="center" justifyContent="center" flexDirection="column" pt="24px" width="100%">
          {status === LotteryStatus.OPEN && (
            <>
              <Title color="#1BB697" size="36px">
                {t('Get your tickets now!')}
              </Title>
            </>
          )}
          <Flex alignItems="center" justifyContent="center" mb="48px">
            {nextEventTime && (postCountdownText || preCountdownText) ? (
              <Countdown
                nextEventTime={nextEventTime}
                postCountdownText={postCountdownText}
                preCountdownText={preCountdownText}
              />
            ) : (
              <Skeleton height="41px" width="250px" />
            )}
          </Flex>
          <NextDrawCard />
        </Flex>
      </Section>

      <ConnectSection>
        <BgImage>
          <CheckPrizesSection/>
        </BgImage>
      </ConnectSection>

      <Section>
        <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
          <Title color="#1BB697" size="36px" >  {/* scale="xl" */}
            {t('Finished Rounds')}
          </Title>
          <Box mb="24px">
            <HistoryTabMenu
              activeIndex={historyTabMenuIndex}
              setActiveIndex={(index) => setHistoryTabMenuIndex(index)}
            />
          </Box>
          {historyTabMenuIndex === 0 ? (
            <AllHistoryCard />
          ) : (
            <YourHistoryCard
              handleShowMoreClick={handleShowMoreUserRounds}
              numUserRoundsRequested={numUserRoundsRequested}
            />
          )}
        </Flex>
      </Section>

      <Section>
        <HowToPlay />
      </Section>
    </LotteryPage>
  )
}

export default Lottery
