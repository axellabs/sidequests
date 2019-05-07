import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

import arrow from '../assets/icons/arrow-dark.svg'
import fire from '../assets/icons/fire-light.svg'
import spinner from '../assets/icons/spinner-light.svg'
import star from '../assets/icons/star-light.svg'
import home from '../assets/icons/home-light.svg'
import folder from '../assets/icons/folder.svg'
import folderOpen from '../assets/icons/folder-open.svg'

import fireDark from '../assets/icons/fire.svg'
import spinnerDark from '../assets/icons/spinner.svg'
import starDark from '../assets/icons/star.svg'
import homeDark from '../assets/icons/home.svg'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 45px;
  color: white;
  padding: ${props => (props.open ? '20px' : 0)};
  min-height: 106px;
  margin-bottom: 80px;
  font-family: Roboto;
  font-weight: 300;
  a {
    visibility: ${props => (props.open ? 'visible' : 'hidden')};
    width: ${props => (props.open ? 'auto' : '0px')};
  }

  img {
    transform: ${props => (props.open ? 'none' : 'rotate(180deg)')};
  }

  @media (max-width: 900px) {
    display: none;
  }
`

const StyledSideBar = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: ${props => (props.open ? '500px' : '65px')};
  height: 100%;
  background-color: black;
  color: white;
  padding: 1.45rem 0;
  transition: width 0.3s;
  border-right: 2px solid white;
`

const StyledLinkIcon = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  @media (max-width: 900px) {
    &.arrow {
      display: none;
    }
  }
`

const StyledLink = styled(Link).attrs({
  alt: 'project page icon',
})`
  padding: 10px 0 10px 20px;
  width: 100%;
  color: ${props => (props.active === 'true' ? 'white' : 'inherit')};
  background-color: ${props => (props.active === 'true' ? 'white' : 'black')};
  text-decoration: none;
  display: flex;
  font-family: Roboto;
  p {
    font-size: 16px;
    color: ${props => (props.active === 'true' ? 'black' : 'inherit')};
    text-decoration: none;
    margin-bottom: 0px;
  }
  &:hover {
    color: #89c4f4;
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
  font-family: Roboto;
  font-weight: 400;
  padding-left: 20px;
  color: ${props => (props.open ? '#89c4f4' : 'inherit')};
  &:hover {
    color: #89c4f4;
  }
`

const ProjectText = props => (
  <ProjectTextStyled {...props}>
    <StyledLinkIcon
      src={props.open ? folderOpen : folder}
      style={{ display: props.sideBarOpen ? 'none' : 'block' }}
    />
    {props.sideBarOpen ? <StyledText>{props.children}</StyledText> : <p />}
  </ProjectTextStyled>
)

const SideBarLink = props => (
  <StyledLink to={props.to} active={props.active} style={props.style}>
    <StyledLinkIcon
      style={{ display: props.sideBarOpen ? 'none' : 'block' }}
      src={props.active === 'true' ? props.activeSrc : props.src}
    />
    {props.sideBarOpen ? <p>{props.children}</p> : <p />}
  </StyledLink>
)

const ParentLink = props => (
  <SideBarLink
    {...props}
    src={homeDark}
    activeSrc={home}
    style={{
      paddingLeft: props.sideBarOpen ? '60px' : '20px',
      fontFamily: 'Roboto',
      fontWeight: 400,
    }}
  />
)

const ChildLink = props => (
  <SideBarLink
    {...props}
    active={(props.to === props.location).toString()}
    src={starDark}
    activeSrc={star}
    style={{
      paddingLeft: props.sideBarOpen ? '60px' : '20px',
      fontFamily: 'Roboto',
      fontWeight: 400,
    }}
  />
)

const StyledAccordion = styled.div`
  height: ${props => (props.open ? 'auto' : '40px')};
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

  componentDidMount() {
    this.setState({
      open: window.innerWidth < 900 ? true : false,
    })
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
        <div style={{ marginRight: sideBarOpen ? '20px' : '0px' }}>
          <ParentLink
            to={parent.fields.slug}
            open={open}
            active={(parent.fields.slug === location).toString()}
            sideBarOpen={sideBarOpen}
            style={{
              paddingLeft: '50px',
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
                paddingLeft: sideBarOpen ? '40px' : '0px',
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

  componentDidMount() {
    this.setState({
      open: window.innerWidth < 900 ? false : true,
    })
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
          <StyledLinkIcon
            src={arrow}
            onClick={this.toggleSideBar}
            className="arrow"
            style={{ marginRight: '20px', marginTop: '10px' }}
          />
        </Header>
        <Location>
          {({ location }) => {
            return (
              <>
                <SideBarLink
                  to="/"
                  active={('/' === location.pathname).toString()}
                  src={fireDark}
                  activeSrc={fire}
                  sideBarOpen={open}
                >
                  <span role="img" aria-label="star">
                    ⭐️{' '}
                  </span>
                  Favorites
                </SideBarLink>
                <SideBarLink
                  to="/brainstorm/"
                  src={spinnerDark}
                  activeSrc={spinner}
                  active={('/brainstorm/' === location.pathname).toString()}
                  sideBarOpen={open}
                >
                  <span role="img" aria-label="star">
                    🧠{' '}
                  </span>{' '}
                  Project Brainstorm
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
