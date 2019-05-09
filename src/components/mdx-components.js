import React from 'react'
import styled, { css } from 'styled-components'
import LinkPreview from './link-preview'

const headerStyles = css`
  position: relative;
  font-family: Roboto;
  font-weight: 500;
  color: white;
  line-height: 1.2;

  margin-top: 50px;
  margin-bottom: 10px;
  width: 100%;
`

const headerLines = css`
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: white;
  }
`

const H1 = styled.h1`
  ${headerStyles}
  font-size: 3rem;
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`

const H2 = styled.h2`
  ${headerStyles}
  font-size: 2.7rem;

  @media (max-width: 900px) {
    font-size: 1.7rem;
  }
`

const H3 = styled.h3`
  ${headerStyles}
  font-size: 2.4rem;
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
`

const H4 = styled.h5`
  ${headerStyles}
  font-size: 2rem;

  @media (max-width: 900px) {
    font-size: 1.3rem;
  }
`

const P = styled.div`
  font-family: Roboto;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: 0.06em;
  margin-bottom: 15px;

  @media (max-width: 900px) {
    font-size: 1rem;
  }
`

const listItem = styled.li`
  font-family: Roboto;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: 0.06em;
  margin-bottom: 15px;

  @media (max-width: 900px) {
    font-size: 1rem;
  }
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
