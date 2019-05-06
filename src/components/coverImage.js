import React from 'react'
import styled from 'styled-components'
import Image from './image'

const StyledCoverImage = styled.div`
  height: 150px;
  position: relative;
  overflow: hidden;
  margin: ${props =>
    props.page ? '-5rem -1.0875rem 5rem  -1.0875rem' : '0'};
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
  line-height: 1.5;
  font-weight: 300;
`

const CoverImage = props => (
  <StyledCoverImage page={props.page}>
    <Image src={props.src} alt={props.alt} />
    <StyledCoverTitle>{props.children}</StyledCoverTitle>
  </StyledCoverImage>
)

export default CoverImage
