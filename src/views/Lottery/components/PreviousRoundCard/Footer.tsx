import React, { useState } from 'react'
import { Flex, CardFooter,Text } from '@fastswap-uikit'
import { ExpandableLabel } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { LotteryRound } from 'state/types'
import FooterExpanded from './FooterExpanded'

interface PreviousRoundCardFooterProps {
  lotteryNodeData: LotteryRound
  lotteryId: string
}

const PreviousRoundCardFooter: React.FC<PreviousRoundCardFooterProps> = ({ lotteryNodeData, lotteryId }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <CardFooter p="0">
      {isExpanded && <FooterExpanded lotteryNodeData={lotteryNodeData} lotteryId={lotteryId} />}
      <Flex p="8px 24px" alignItems="center" justifyContent="center">
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          <Text color="#1BB697" >
          {isExpanded ? t('Hide') : t('Details')}
          </Text>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default PreviousRoundCardFooter
