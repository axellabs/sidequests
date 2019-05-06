import React from 'react'
import styled from 'styled-components'

const StyledContentContainer = styled.div`
  padding: 0;
  background-color: black;
  color: white;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: Roboto;
  font-weight: 400;
`

const Content = props => (
  <div style={{ width: '100%' }}>
    <StyledContentContainer>{props.children}</StyledContentContainer>
  </div>
)

export default Content
