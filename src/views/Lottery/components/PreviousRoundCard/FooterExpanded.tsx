import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Skeleton, Heading, Box, Text } from '@fastswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { LotteryRound, LotteryRoundGraphEntity } from 'state/types'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useGetLotteryGraphDataById } from 'state/lottery/hooks'
import { getGraphLotteries } from 'state/lottery/getLotteriesData'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import RewardBrackets from '../RewardBrackets'

const NextDrawWrapper = styled(Flex)`
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`
const Title = styled.span<{ color?: string ,size?:string}>`
  padding-top:30px;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: ${({ size }) => size};
  color:${({ color }) => color};
`;


const PreviousRoundCardFooter: React.FC<{ lotteryNodeData: LotteryRound; lotteryId: string }> = ({
  lotteryNodeData,
  lotteryId,
}) => {
  const { t } = useTranslation()
  const [fetchedLotteryGraphData, setFetchedLotteryGraphData] = useState<LotteryRoundGraphEntity>()
  const lotteryGraphDataFromState = useGetLotteryGraphDataById(lotteryId)
  const cakePriceBusd = usePriceCakeBusd()

  useEffect(() => {
    const getGraphData = async () => {
      const fetchedGraphData = await getGraphLotteries(undefined, undefined, { id_in: [lotteryId] })
      setFetchedLotteryGraphData(fetchedGraphData[0])
    }
    if (!lotteryGraphDataFromState) {
      getGraphData()
    }
  }, [lotteryGraphDataFromState, lotteryId])

  let prizeInBusd = new BigNumber(NaN)
  if (lotteryNodeData) {
    const { amountCollectedInCake } = lotteryNodeData
    prizeInBusd = amountCollectedInCake.times(cakePriceBusd)
  }

  const getTotalUsers = (): string => {
    if (!lotteryGraphDataFromState && fetchedLotteryGraphData) {
      return fetchedLotteryGraphData?.totalUsers?.toLocaleString()
    }

    if (lotteryGraphDataFromState) {
      return lotteryGraphDataFromState?.totalUsers?.toLocaleString()
    }

    return null
  }

  const getPrizeBalances = () => {
    return (
      <>
        {prizeInBusd.isNaN() ? (
          <Skeleton my="7px" height={40} width={200} />
        ) : (
          <>
          <Title size="30px" color="#FFB237">  {/* scale="xl" */}
            ~${formatNumber(getBalanceNumber(prizeInBusd), 0, 0)}
          </Title>
          </>
        )}
        {prizeInBusd.isNaN() ? (
          <Skeleton my="2px" height={14} width={90} />
        ) : (
          <Balance
            fontSize="14px"
            color="#999999"
            unit=" "
            value={getBalanceNumber(lotteryNodeData?.amountCollectedInCake)}
            decimals={0}
          />
        )}
      </>
    )
  }

  return (
    <NextDrawWrapper>
      <Flex mr="24px" flexDirection="column" justifyContent="space-between">
        <Box>
          <Heading color="#333333">{t('Prize pot')}</Heading>
          {getPrizeBalances()}
        </Box>
        <Box mb="24px">
          <Flex>
            <Title size="14px" color="#333333">  {/*  display="inline" */}
              {t('Total players this round')}:{' '}
            </Title>
              {lotteryNodeData && (lotteryGraphDataFromState || fetchedLotteryGraphData) ? (
              <Title size="14px" color="#1BB697">
                {getTotalUsers()}
              </Title>
              ) : (
                <Skeleton height={14} width={31} />
              )}
          </Flex>
        </Box>
      </Flex>
      <RewardBrackets lotteryNodeData={lotteryNodeData} isHistoricRound />
    </NextDrawWrapper>
  )
}

export default PreviousRoundCardFooter
