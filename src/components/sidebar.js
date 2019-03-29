import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

import arrow from '../assets/icons/arrow.svg'
import fire from '../assets/icons/fire-light.svg'
import spinner from '../assets/icons/spinner-light.svg'
import folder from '../assets/icons/folder.svg'
import folderOpen from '../assets/icons/folder-open.svg'
import star from '../assets/icons/star-light.svg'
import home from '../assets/icons/home-light.svg'

import fireDark from '../assets/icons/fire.svg'
import spinnerDark from '../assets/icons/spinner.svg'
import starDark from '../assets/icons/star.svg'
import homeDark from '../assets/icons/home.svg'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 45px;
  color: black;
  padding: ${props => (props.open ? '20px' : 0)};
  min-height: 85px;
  margin-top: 20px;
  margin-bottom: 70px;
  font-family: Austin;
  font-weight: 600;
  a {
    visibility: ${props => (props.open ? 'visible' : 'hidden')};
    width: ${props => (props.open ? 'auto' : '0px')};
  }

  img {
    transform: ${props => (props.open ? 'none' : 'rotate(180deg)')};
  }
`

const StyledSideBar = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: ${props => (props.open ? '500px' : '55px')};
  height: 100%;
  background-color: white;
  color: black;
  padding: 1.45rem 0;
  transition: width 0.3s;
`

const StyledLinkIcon = styled.img`
  height: 20px;
  width: 20px;
  margin: 0 20px;
  cursor: pointer;
`

const StyledLink = styled(Link).attrs({
  alt: 'project page icon',
})`
  padding: 10px 0;
  width: 100%;
  color: ${props => (props.active === 'true' ? 'white' : 'inherit')};
  background-color: ${props => (props.active === 'true' ? 'black' : 'white')};
  text-decoration: none;
  display: flex;
  font-family: inherit;
  p {
    font-size: 16px;
    color: ${props => (props.active === 'true' ? 'white' : 'inherit')};
    text-decoration: none;
    margin-bottom: 0px;
  }
  &:hover {
    color: #1f058e;
  }
`

const StyledText = styled.p`
  font-size: 16px;
  color: inherit;
  margin-bottom: 0px;
`
const ProjectTextStyled = styled.div`
  display: flex;
  cursor: pointer;
  z-index: 10;
  padding: 10px 0;
  font-family: Avenir;
  font-weight: 500;
  color: ${props => (props.open ? '#1f058e' : 'inherit')};
  &:hover {
    color: #1f058e;
  }
`

const ProjectText = props => (
  <ProjectTextStyled {...props}>
    <StyledLinkIcon src={props.open ? folderOpen : folder} />
    {props.sideBarOpen ? <StyledText>{props.children}</StyledText> : <p />}
  </ProjectTextStyled>
)

const SideBarLink = props => (
  <StyledLink to={props.to} active={props.active} style={props.style}>
    <StyledLinkIcon
      src={props.active === 'true' ? props.activeSrc : props.src}
    />
    {props.sideBarOpen ? <p>{props.children}</p> : <p />}
  </StyledLink>
)

const ParentLink = props => (
  <SideBarLink {...props} src={home} activeSrc={homeDark} />
)

const ChildLink = props => (
  <SideBarLink
    {...props}
    active={(props.to === props.location).toString()}
    src={star}
    activeSrc={starDark}
  />
)

const StyledAccordion = styled.div`
  height: ${props => (props.open ? 'auto' : '45px')};
  overflow-y: hidden;
  overflow-x: hidden;
`

class Accordion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggleAccordion = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }

  render() {
    const { parent, subposts, location, sideBarOpen } = this.props
    const { open } = this.state
    return (
      <StyledAccordion open={open}>
        <ProjectText
          onClick={this.toggleAccordion}
          sideBarOpen={sideBarOpen}
          open={open}
        >
          {parent.frontmatter.title}
        </ProjectText>
        <div>
          <ParentLink
            to={parent.fields.slug}
            open={open}
            active={(parent.fields.slug === location).toString()}
            sideBarOpen={sideBarOpen}
            style={{
              paddingLeft: `${sideBarOpen ? '45px' : '0px'}`,
              fontFamily: 'Avenir',
              fontWeight: 400,
            }}
          >
            {parent.frontmatter.title}
          </ParentLink>
          {subposts.map(({ node: post }) => (
            <ChildLink
              to={post.fields.slug}
              key={post.fields.slug}
              location={location}
              sideBarOpen={sideBarOpen}
              style={{
                paddingLeft: `${sideBarOpen ? '45px' : '0px'}`,
                fontFamily: 'Avenir',
                fontWeight: 400,
              }}
            >
              {post.frontmatter.title}
            </ChildLink>
          ))}
        </div>
      </StyledAccordion>
    )
  }
}

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }

  toggleSideBar = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }))
  }

  render() {
    const { data } = this.props
    const { open } = this.state
    const { edges: posts } = data.allMdx

    const parentPosts = posts.filter(
      ({ node }) => node.frontmatter.projectPage === true
    )

    const hierarchalPosts = parentPosts.map(parentPost => ({
      parent: parentPost.node,
      subnodes: posts.filter(
        ({ node }) =>
          node.frontmatter.parent === parentPost.node.frontmatter.parent &&
          !node.frontmatter.projectPage
      ),
    }))

    return (
      <StyledSideBar open={open}>
        <Header open={open}>
          <StyledLink to="/">{data.site.siteMetadata.title}</StyledLink>
          <StyledLinkIcon src={arrow} onClick={this.toggleSideBar} />
        </Header>
        <Location>
          {({ location }) => {
            return (
              <>
                <SideBarLink
                  to="/"
                  src={fire}
                  activeSrc={fireDark}
                  active={('/' === location.pathname).toString()}
                  sideBarOpen={open}
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: 500,
                  }}
                >
                  Favorites
                </SideBarLink>
                <SideBarLink
                  to="/brainstorm/"
                  src={spinner}
                  activeSrc={spinnerDark}
                  active={('/brainstorm/' === location.pathname).toString()}
                  sideBarOpen={open}
                  style={{
                    fontFamily: 'Avenir',
                    fontWeight: 500,
                  }}
                >
                  Running Projects
                </SideBarLink>
                {hierarchalPosts.map(accordionData => (
                  <Accordion
                    parent={accordionData.parent}
                    subposts={accordionData.subnodes}
                    key={accordionData.parent.frontmatter.title}
                    location={location.pathname}
                    sideBarOpen={open}
                  />
                ))}
              </>
            )
          }}
        </Location>
      </StyledSideBar>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query sideBar {
        site {
          siteMetadata {
            title
          }
        }
        allMdx {
          edges {
            node {
              id
              excerpt
              frontmatter {
                title
                projectPage
                parent
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => <SideBar data={data} {...props} />}
  />
)
