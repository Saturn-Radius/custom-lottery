import React from 'react'
import styled,{keyframes} from 'styled-components'
import { Spinner } from '@fastswap-uikit'
import Page from '../Layout/Page'

const pulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`
const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const AnimatedImg = styled.div`
  animation: ${pulse} 800ms linear infinite;
  & > * {
    width: 72px;
  }
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      {/* <Spinner /> */}
      <AnimatedImg>
        <img src="logo.png" alt="loading-icon" />
      </AnimatedImg>
    </Wrapper>
  )
}

export default PageLoader
