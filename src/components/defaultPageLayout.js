import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  padding: 5rem 1.0875rem;
  background-color: inherit;
  color: white;
  width: 100%;

  @media (max-width: 900px) {
    padding: 2.25rem 1.0875rem;
  }
`

const DefaultPageLayout = props => <StyledPage>{props.children}</StyledPage>

export default DefaultPageLayout
