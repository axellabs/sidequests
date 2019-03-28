import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  padding: 1.45rem 1.0875rem;
  background-color: inherit;
  color: white;
  width: 100%;
`

const DefaultPageLayout = props => <StyledPage>{props.children}</StyledPage>

export default DefaultPageLayout
