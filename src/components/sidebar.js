import React from 'react'
import styled from 'styled-components'

import fire from '../assets/icons/fire.svg'
import spinner from '../assets/icons/spinner.svg'
import book from '../assets/icons/book-dark.svg'

const StyledSideBar = styled.div`
  overflow-y: auto;
  width: 300px;
  min-height: calc(100vh - 100px);
  background-color: black;
  color: white;
  padding: 1.45rem 0;
`

const StyledLinkIcon = styled.img`
  height: 20px;
  width: 20px;
  margin: 0 20px;
`

const StyledLink = styled.a.attrs({
  alt: 'project page icon',
})`
  color: white;
  text-decoration: none;
  display: flex;
  p {
    font-size: 16px;
    color: white;
    text-decoration: none;
  }
`

const SideBarLink = props => (
  <StyledLink href={props.to}>
    <StyledLinkIcon src={props.src} />
    <p>{props.children}</p>
  </StyledLink>
)

const SideBar = props => (
  <StyledSideBar>
    <SideBarLink to="/" src={fire}>
      Favorites
    </SideBarLink>
    <SideBarLink to="/brainstorm/" src={spinner}>
      Running Projects
    </SideBarLink>
    <SideBarLink to="/projects/project1" src={book}>
      Project 1
    </SideBarLink>
  </StyledSideBar>
)

export default SideBar
