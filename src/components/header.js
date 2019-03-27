import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background: black;
  margin-bottom: 1.45rem;
`

const StyledH1 = styled.h1`
  padding: 1.45rem 1.0875rem;
  margin: 0;
`

const StyledLink = styled(Link).attrs({
  to: '/',
})`
  color: white;
  text-decoration: none;
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <StyledH1>
      <StyledLink>{siteTitle}</StyledLink>
    </StyledH1>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
