import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text, Heading, useMatchBreakpoints, Link, Image } from '@fastswap-uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { BallWithNumber, MatchExampleA, MatchExampleB, PoolAllocationChart } from '../svgs'

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 40px 0;
  width: 100%;
`

const BulletList = styled.ul`
  list-style-type: none;
  margin-left: 8px;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: '•';
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
  li::marker {
    font-size: 12px;
  }
`

const StepContainer = styled(Flex)`
  gap: 24px;
  width: 100%;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const StyledStepCard = styled(Box)`
  display: flex;
  align-self: baseline;
  position: relative;
  background: ${({ theme }) => theme.colors.borderColor};
  padding: 1px 1px 3px 1px;
  border-radius: ${({ theme }) => theme.radii.card};
`

const StepCardInner = styled(Box)`
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`

type Step = { title: string; subtitle: string; label: string }

const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <StyledStepCard width="100%">
      <StepCardInner height={['200px', '180px', null, '200px']}>
        <Text mb="16px" fontSize="12px" bold textAlign="right" textTransform="uppercase" color="#666666">
          {step.label}
        </Text>
        <Heading mb="16px" color="#1BB697">  {/** scale="lg"  */}
          {step.title}
        </Heading>
        <Text color="#666666" >{step.subtitle}</Text>
      </StepCardInner>
    </StyledStepCard>
  )
}

const BallsContainer = styled(Flex)`
  gap: 6.5px;
  padding-left: 7px;
  align-items: center;
  width: 100%;
`

const InlineLink = styled(Link)`
  display: inline;
`

const ExampleBalls = () => {
  const { isDesktop } = useMatchBreakpoints()
  const ballSize = isDesktop ? '24px' : '32px'
  const fontSize = isDesktop ? '14px' : '16px'
  return (
    <BallsContainer>
      <BallWithNumber size={ballSize} fontSize={fontSize} color="yellow" number="9" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="green" number="1" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="aqua" number="3" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="teal" number="6" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="lilac" number="6" />
      <BallWithNumber size={ballSize} fontSize={fontSize} color="pink" number="2" />
    </BallsContainer>
  )
}

const MatchExampleContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 46px 64px 64px;
`

const MatchExampleCard = () => {
  const { isDark } = useTheme()
  const { isXs } = useMatchBreakpoints()
  const { t } = useTranslation()
  const exampleWidth = isXs ? '210px' : '258px'
  return (
    <StyledStepCard width={['280px', '330px', '380px']}>
      <StepCardInner height="220px">
        <MatchExampleContainer>
          <Box />
          <ExampleBalls />
          <Text lineHeight="72px" textAlign="right" color="#1BB697" bold mr="20px">
            {t('A')}
          </Text>
          <MatchExampleA width={exampleWidth} height="46px" isDark={isDark} />
          <Text lineHeight="72px" textAlign="right" color="#1BB697" bold mr="20px">
            {t('B')}
          </Text>
          <MatchExampleB width={exampleWidth} height="46px" isDark={isDark} />
        </MatchExampleContainer>
      </StepCardInner>
    </StyledStepCard>
  )
}

const AllocationGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-auto-rows: max-content;
  row-gap: 4px;
`

const AllocationColorCircle = styled.div<{ color: string }>`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
`
const Title = styled.span<{ color?: string ,size?:string}>`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: ${({ size }) => size};
  color:${({ color }) => color};
  font-weight: bold;
`;

const AllocationMatch: React.FC<{ color: string; text: string }> = ({ color, text }) => {
  return (
    <Flex alignItems="center">
      <AllocationColorCircle color={color} />
      <Text color="#666666">{text}</Text>
    </Flex>
  )
}

const PoolAllocations = () => {
  const { t } = useTranslation()
  return (
    <StyledStepCard width={['280px', '330px', '380px']}>
      <StepCardInner height="auto">
        <Flex mb="32px" justifyContent="center">
          <PoolAllocationChart width="100px" height="100px" />
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="12px" color="#1BB697" bold textTransform="uppercase">
            {t('Digits matched')}
          </Text>
          <Text fontSize="12px" color="#1BB697" bold textAlign="right" textTransform="uppercase">
            {t('Prize pool allocation')}
          </Text>
        </Flex>
        <AllocationGrid>
          <AllocationMatch color="#FFE362" text={t('Matches first %digits%', { digits: 1 })} />
          <Text color="#333333" textAlign="right" bold>
            2%
          </Text>
          <AllocationMatch color="#85C54E" text={t('Matches first %digits%', { digits: 2 })} />
          <Text color="#333333" textAlign="right" bold>
            4%
          </Text>
          <AllocationMatch color="#028E75" text={t('Matches first %digits%', { digits: 3 })} />
          <Text color="#333333" textAlign="right" bold>
            11%
          </Text>
          <AllocationMatch color="#36E8F5" text={t('Matches first %digits%', { digits: 4 })} />
          <Text color="#333333" textAlign="right" bold>
            16%
          </Text>
          <AllocationMatch color="#A881FC" text={t('Matches first %digits%', { digits: 5 })} />
          <Text color="#333333" textAlign="right" bold>
            21%
          </Text>
          <AllocationMatch color="#D750B2" text={t('Matches all 6')} />
          <Text color="#333333" textAlign="right" bold>
            36%
          </Text>
          <AllocationMatch color="#BDC2C4" text={t('Burn Pool')} />
          <Text color="#333333" textAlign="right" bold>
            10%
          </Text>
        </AllocationGrid>
      </StepCardInner>
    </StyledStepCard>
  )
}

const GappedFlex = styled(Flex)`
  gap: 24px;
`

const HowToPlay: React.FC = () => {
  const { t } = useTranslation()

  const steps: Step[] = [
    {
      label: t('Step %number%', { number: 1 }),
      title: t('Buy Tickets'),
      subtitle: t('Prices are set when the round starts, equal to 5 USD in FAST per ticket.'),
    },
    {
      label: t('Step %number%', { number: 2 }),
      title: t('Wait for the Draw'),
      subtitle: t('There is one draw every 2 days:  one every 48 hours.'),
    },
    {
      label: t('Step %number%', { number: 3 }),
      title: t('Check for Prizes'),
      subtitle: t('Once the round’s over, come back to the page and check to see if you’ve won!'),
    },
  ]
  return (
    <Box width="100%">
      <Flex mb="40px" alignItems="center" flexDirection="column">
        <Title size="36px" color="#1BB697">  {/* scale="xl"  */}
          {t('How to Play')}
        </Title>
        <Text textAlign="center" color="#666666">
          {t(
            'If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool.',
          )}
        </Text>
        <Text color="#666666">{t('Simple!')}</Text>
      </Flex>
      <StepContainer>
        {steps.map((step) => (
          <StepCard key={step.label} step={step} />
        ))}
      </StepContainer>
      <Divider />
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column">
          <Heading mb="24px" color="#1BB697"> {/* scale="lg" */}
            {/* {t('Winning Criteria')} */}
            {t('Buy Tickets')}
          </Heading>
          <Heading mb="24px" color="#FFB237">  { /* scale="md" */}
            {t('The digits on your ticket must match in the correct order to win.')}
          </Heading>
          <Text mb="16px" color="#666666">
            {t('Here’s an example lottery draw, with two tickets, A and B.')}
          </Text>
          <BulletList>
            <li>
              <Text color="#666666">  {/* display="inline" */}
                {t(
                  'Ticket A: The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize.',
                )}
              </Text>
            </li>
            <li>
              <Text color="#666666">  {/* display="inline" */}
                {t(
                  'Ticket B: Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize.',
                )}
              </Text>
            </li>
          </BulletList>
          <Text mt="16px" color="#666666">
            {t(
              'Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’.',
            )}
          </Text>
        </Flex>
        <Flex flex="1" justifyContent="center">
          <MatchExampleCard />
        </Flex>
      </GappedFlex>
      <Divider />
      <GappedFlex flexDirection={['column', 'column', 'column', 'row']}>
        <Flex flex="2" flexDirection="column">
          <Heading mb="24px" color="#1BB697">  {/* scale="lg" */}
            {t('Prize Funds')}
          </Heading>
          <Text color="#666666">{t('The prizes for each lottery round come from three sources:')}</Text>
          <Heading my="16px"color="#FFB237">  {/* scale="md" */}
            {t('Ticket Purchases')}
          </Heading>
          <BulletList>
            <li>
              <Text color="#666666">  {/* display="inline" */}
                {t('100% of the FAST paid by people buying tickets that round goes back into the prize pools.')}
              </Text>
            </li>
          </BulletList>
          <Heading my="16px" color="#FFB237">  {/* scale="md" */}
            {t('Rollover Prizes')}
          </Heading>
          <BulletList>
            <li>
              <Text color="#666666">  {/* display="inline"  */}
                {t(
                  'After every round, if nobody wins in one of the prize brackets, the unclaimed FAST for that bracket rolls over into the next round and are redistributed among the prize pools.',
                )}
              </Text>
            </li>
          </BulletList>
          <Heading my="16px" color="#FFB237">  {/* scale="md" */}
            {t('FAST Injections')}
          </Heading>
          <BulletList>
            <li>
              <Text color="#666666">  {/* display="inline" */}
                {t(
                  'An average total of 35,000 FAST from the treasury is added to lottery rounds over the course of a week. This FAST is of course also included in rollovers! ',
                )}
                {/* <InlineLink href="https://docs.pancakeswap.finance/tokenomics/cake/cake-tokenomics">
                <Text color="#1BB697"> {t('FAST Tokenomics')}</Text>
                </InlineLink> */}
              </Text>
            </li>
          </BulletList>
        </Flex>
        <Flex flex="1" justifyContent="center">
          <PoolAllocations />
        </Flex>
      </GappedFlex>
      <Divider />
      <Flex justifyContent="center"  alignItems="center" flexDirection={['column', 'column', 'row']}>
        <Flex maxWidth="250px" flexDirection="column" alignItems="center">
          <Image width={130} height={130} src="/images/lottery/question.png" alt="tombola bunny" mr="8px" mb="16px" />
          <Text fontSize="20px" color="#1BB697" textAlign="center">  {/* scale="md" */}
            {t('Still got questions?')}
          </Text>
          <Text color="#666666" textAlign="center">
            {t('Check our in-depth guide')}{' '}
            {/* <InlineLink href="https://docs.pancakeswap.finance/products/lottery/lottery-guide">
            <Text color="#1BB697">{t('how to play the FastSwap lottery!')}</Text>
            </InlineLink> */}
          </Text>
        </Flex>

      </Flex>
    </Box>
  )
}

export default HowToPlay
