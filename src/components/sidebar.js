import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

import fire from '../assets/icons/fire-light.svg'
import spinner from '../assets/icons/spinner-light.svg'
import book from '../assets/icons/book-light.svg'
import star from '../assets/icons/star-light.svg'
import home from '../assets/icons/home-light.svg'

import fireDark from '../assets/icons/fire.svg'
import spinnerDark from '../assets/icons/spinner.svg'
import starDark from '../assets/icons/star.svg'
import homeDark from '../assets/icons/home.svg'

const Header = styled.p`
  font-size: 45px;
  color: black;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 70px;
  font-family: Austin;
  font-weight: 600;
`

const StyledSideBar = styled.div`
  overflow-y: auto;
  width: 500px;
  min-height: 100vh;
  background-color: white;
  color: black;
  padding: 1.45rem 0;
`

const StyledLinkIcon = styled.img`
  height: 20px;
  width: 20px;
  margin: 0 20px;
`

const StyledLink = styled(Link).attrs({
  alt: 'project page icon',
})`
  padding: 10px 0;
  width: 100%;
  color: ${props => (props.active === 'true' ? 'white' : 'black')};
  background-color: ${props => (props.active === 'true' ? 'black' : 'white')};
  text-decoration: none;
  display: flex;
  font-family: inherit;
  p {
    font-size: 16px;
    color: ${props => (props.active === 'true' ? 'white' : 'black')};
    text-decoration: none;
    margin-bottom: 0px;
  }
`

const StyledText = styled.p`
  font-size: 16px;
  color: black;
  margin-bottom: 0px;
`

const ProjectText = props => (
  <div
    style={{
      display: 'flex',
      cursor: 'pointer',
      zIndex: 10,
      padding: '10px 0',
      fontFamily: 'Avenir',
      fontWeight: 500,
    }}
    onClick={props.onClick}
  >
    <StyledLinkIcon src={book} />
    <StyledText>{props.children}</StyledText>
  </div>
)

const SideBarLink = props => (
  <StyledLink to={props.to} active={props.active} style={props.style}>
    <StyledLinkIcon
      src={props.active === 'true' ? props.activeSrc : props.src}
    />
    <p>{props.children}</p>
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
    const { parent, subposts, location } = this.props
    const { open } = this.state
    return (
      <StyledAccordion open={open}>
        <ProjectText onClick={this.toggleAccordion} open={open}>
          {parent.frontmatter.title}
        </ProjectText>
        <div>
          <ParentLink
            to={parent.fields.slug}
            open={open}
            active={(parent.fields.slug === location).toString()}
            style={{
              paddingLeft: '45px',
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
              style={{
                paddingLeft: '45px',
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

const SideBar = props => (
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
    render={data => {
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
        <StyledSideBar>
          <Header>
            <StyledLink to="/">{data.site.siteMetadata.title}</StyledLink>
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
                    />
                  ))}
                </>
              )
            }}
          </Location>
        </StyledSideBar>
      )
    }}
  />
)

export default SideBar
