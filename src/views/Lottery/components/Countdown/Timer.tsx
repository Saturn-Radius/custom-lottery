import React from 'react'
import styled from 'styled-components'
import { Flex, Heading } from '@fastswap-uikit'
import { useTranslation } from 'contexts/Localization'

export interface TimerProps {
  minutes?: number
  hours?: number
  days?: number
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`
const Title = styled.span<{ color?: string, size?: string }>`
  margin-top: 15px;
  justify:center;
  font-size: ${({ size }) => size};
  color:${({ color }) => color};
`;

const StyledTimerText = styled(Heading)`
  -webkit-background-clip: text;
  -webkit-text-fill-color: #FFB237;
`

const Wrapper: React.FC<TimerProps> = ({ minutes, hours, days }) => {
  const { t } = useTranslation()

  return (
    <StyledTimerFlex alignItems="flex-top">
      {Boolean(days) && (
        <>
          <StyledTimerText mb="-4px" mr="4px">  {/* scale="xl" */}
          <Title size="24px">{days}</Title>
          </StyledTimerText>
          <StyledTimerText mr="8px"><Title size="24px">{t('d')}</Title></StyledTimerText>
        </>
      )}
      {Boolean(hours) && (
        <>
          <StyledTimerText mb="-4px" mr="4px">  {/* scale="xl" */}
          <Title size="24px">{hours}</Title>
          </StyledTimerText>
          <StyledTimerText mr="8px"><Title size="24px">{t('h')}</Title></StyledTimerText>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <StyledTimerText mb="-4px" mr="4px">  {/* scale="xl" */}
          <Title size="24px">{minutes}</Title>
          </StyledTimerText>
          <StyledTimerText mr="8px"><Title size="24px">{t('m')}</Title></StyledTimerText>
        </>
      )}
    </StyledTimerFlex>
  )
}

export default Wrapper
