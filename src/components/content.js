import React from 'react'
import styled from 'styled-components'
import Image from './image'

const StyledContentContainer = styled.div`
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
  background-color: #303030;
  color: white;
  padding-top: 1.45rem;
  width: 100%;
  min-height: calc(100vh - 100px);
`

const CoverImage = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
`

const CoverTitle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
`

const Content = props => (
  <div style={{ width: '100%' }}>
    <CoverImage>
      <Image />
      <CoverTitle>{props.title}</CoverTitle>
    </CoverImage>
    <StyledContentContainer>{props.children}</StyledContentContainer>
  </div>
)

export default Content
