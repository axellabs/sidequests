import React from 'react'
import styled from 'styled-components'
import Image from './image'

const StyledCoverImage = styled.div`
  width: 100%;
  min-height: 150px;
  position: relative;
  overflow: hidden;
`

const StyledCoverTitle = styled.div`
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
  padding: 0 30px;
`

const CoverImage = props => (
  <StyledCoverImage>
    <Image />
    <StyledCoverTitle>{props.children}</StyledCoverTitle>
  </StyledCoverImage>
)

export default CoverImage
