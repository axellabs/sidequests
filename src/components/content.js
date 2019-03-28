import React from 'react'
import styled from 'styled-components'

const StyledContentContainer = styled.div`
  padding: 0;
  background-color: black;
  color: white;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
`

const Content = props => (
  <div style={{ width: '100%' }}>
    <StyledContentContainer>{props.children}</StyledContentContainer>
  </div>
)

export default Content
