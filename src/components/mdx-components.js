import React from 'react'
import styled, { css } from 'styled-components'
import LinkPreview from './link-preview'

const headerStyles = css`
  position: relative;
  font-family: Oswald;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 50px;
  margin-bottom: 10px;
  width: 100%;
`

const H1 = styled.h1`
  ${headerStyles}
  font-size: 2.85rem;
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`

const H2 = styled.h2`
  ${headerStyles}
  font-size: 2.2rem;

  @media (max-width: 900px) {
    font-size: 1.7rem;
  }
`

const H3 = styled.h3`
  ${headerStyles}
  font-size: 1.85rem;
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`

const H4 = styled.h5`
  ${headerStyles}
  font-size: 1.5rem;
  text-transform: uppercase;

  @media (max-width: 900px) {
    font-size: 1.3rem;
  }
`

const P = styled.p`
  font-family: Lora;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.06em;
`

const listItem = styled.li`
  font-family: Lora;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.06em;
`

const A = props => (
  <LinkPreview url={props.href} setData={{ title: props.children }} />
)

export default {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  li: listItem,
}
