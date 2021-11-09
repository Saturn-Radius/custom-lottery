import React from 'react'
import { Flex, Heading, Skeleton } from '@fastswap-uikit'
import styled from 'styled-components'
import getTimePeriods from 'utils/getTimePeriods'
import Timer from './Timer'
import useNextEventCountdown from '../../hooks/useNextEventCountdown'

const Title = styled.span<{ color?: string, size?: string }>`
  margin-top: 15px;
  justify:center;
  font-size: ${({ size }) => size};
  color:${({ color }) => color};
`;

interface CountdownProps {
  nextEventTime: number
  preCountdownText?: string
  postCountdownText?: string
}

const Countdown: React.FC<CountdownProps> = ({ nextEventTime, preCountdownText, postCountdownText }) => {
  const secondsRemaining = useNextEventCountdown(nextEventTime)
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return (
    <>
      {secondsRemaining ? (
        <Flex display="inline-flex" justifyContent="flex-end" alignItems="flex-end">
          {preCountdownText && (
            <Title size="24px" color="#FFB237">
              {preCountdownText}
            </Title>
          )}
          <Timer
            minutes={minutes + 1} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
          />
          {postCountdownText && <Title size="24px" color="#1BB697">{postCountdownText}</Title>}

        </Flex>
      ) : (
        <Skeleton height="41px" width="250px" />
      )}
    </>
  )
}

export default Countdown
