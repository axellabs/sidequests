import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import codeIcon from '../assets/icons/embed2.svg'

const StyledHeader = styled.div`
  background: black;
  display: flex;
  align-items: center;
  border-bottom: 2px solid white;
  height: 100px;
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

const StyledLogo = styled.img`
  margin: 0 15px;
  height: 50px;
  width: 50px;
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <StyledLogo src={codeIcon} />
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
