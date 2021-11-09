import React from 'react'
import styled from 'styled-components'
import { IconButton, ArrowForwardIcon, ArrowBackIcon, Flex, Heading, Input } from '@fastswap-uikit'
import { ArrowLastIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledInput = styled(Input)`
  width: 60px;
  height: 100%;
  padding: 4px 16px;
  color: #1BB697;
  background: #E6F4F1;
  border: 1px solid #1BB697;
`

const StyledIconButton = styled(IconButton)`
  width: 32px;
  color:#200E32;
  :disabled {
    background: none;

    svg {
      fill: ${({ theme }) => theme.colors.textDisabled};

      path {
        fill: ${({ theme }) => theme.colors.textDisabled};
      }
    }
  }
`

interface RoundSwitcherProps {
  isLoading: boolean
  selectedRoundId: string
  mostRecentRound: number
  handleInputChange: (event: any) => void
  handleArrowButtonPress: (targetRound: number) => void
}

const RoundSwitcher: React.FC<RoundSwitcherProps> = ({
  isLoading,
  selectedRoundId,
  mostRecentRound,
  handleInputChange,
  handleArrowButtonPress,
}) => {
  const { t } = useTranslation()
  const selectedRoundIdAsInt = parseInt(selectedRoundId, 10)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      handleInputChange(e)
    }
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Heading mr="8px" color="#333333">{t('Round')}</Heading>
        <StyledInput
          pattern="^[0-9]+$"
          inputMode="numeric"
          disabled={isLoading}
          id="round-id"
          name="round-id"
          value={selectedRoundId}
          scale="lg"
          onChange={handleOnChange}
        />
      </Flex>
      <Flex alignItems="center">
        <StyledIconButton
          disabled={!selectedRoundIdAsInt || selectedRoundIdAsInt <= 1}
          onClick={() => handleArrowButtonPress(selectedRoundIdAsInt - 1)}
          variant="text"
          scale="sm"
          mr="4px"
        >
          <ArrowBackIcon color="#200E32"/>
        </StyledIconButton>
        <StyledIconButton
          disabled={selectedRoundIdAsInt >= mostRecentRound}
          onClick={() => handleArrowButtonPress(selectedRoundIdAsInt + 1)}
          variant="text"
          scale="sm"
          mr="4px"
        >
          <ArrowForwardIcon color="#200E32" />
        </StyledIconButton>
        <StyledIconButton
          disabled={selectedRoundIdAsInt >= mostRecentRound}
          onClick={() => handleArrowButtonPress(mostRecentRound)}
          variant="text"
          scale="sm"
        >
          <ArrowLastIcon color="#200E32" />
        </StyledIconButton>
      </Flex>
    </Flex>
  )
}

export default RoundSwitcher
