import React from 'react'
import styled from 'styled-components'
import CoverImage from './coverImage'

const StyledContentContainer = styled.div`
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
  background-color: #303030;
  color: white;
  padding-top: 1.45rem;
  width: 100%;
  min-height: calc(100vh - 100px);
`

const Content = props => (
  <div style={{ width: '100%' }}>
    <CoverImage />
    <StyledContentContainer>{props.children}</StyledContentContainer>
  </div>
)

export default Content
