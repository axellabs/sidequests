import React from 'react'
import styled from 'styled-components'

const StyledContentContainer = styled.div`
  padding: 0;
  background-color: #303030;
  color: white;
  width: 100%;
  min-height: calc(100vh - 100px);
`

const Content = props => (
  <div style={{ width: '100%' }}>
    <StyledContentContainer>{props.children}</StyledContentContainer>
  </div>
)

export default Content
