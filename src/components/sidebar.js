import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'

import fire from '../assets/icons/fire-light.svg'
import spinner from '../assets/icons/spinner-light.svg'
import book from '../assets/icons/book-light.svg'
import star from '../assets/icons/star-light.svg'
import home from '../assets/icons/home-light.svg'

const Header = styled.p`
  font-size: 45px;
  color: black;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 70px;
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
  color: black;
  text-decoration: none;
  display: flex;
  p {
    font-size: 16px;
    color: black;
    text-decoration: none;
  }
`

const StyledText = styled.p`
  font-size: 16px;
  color: black;
`

const ProjectText = props => (
  <div
    style={{ display: 'flex', cursor: 'pointer', zIndex: 10 }}
    onClick={props.onClick}
  >
    <StyledLinkIcon src={book} />
    <StyledText>{props.children}</StyledText>
  </div>
)

const SideBarLink = props => (
  <StyledLink to={props.to}>
    <StyledLinkIcon src={props.src} />
    <p>{props.children}</p>
  </StyledLink>
)

const ParentLink = props => <SideBarLink {...props} src={home} />

const ChildLink = props => <SideBarLink {...props} src={star} />

const StyledAccordion = styled.div`
  height: ${props => (props.open ? 'auto' : '50px')};
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
    const { parent, subposts } = this.props
    const { open } = this.state
    return (
      <StyledAccordion open={open}>
        <ProjectText onClick={this.toggleAccordion} open={open}>
          {parent.frontmatter.title}
        </ProjectText>
        <div style={{ marginLeft: '45px' }}>
          <ParentLink to={parent.fields.slug} open={open}>
            {parent.frontmatter.title}
          </ParentLink>
          {subposts.map(({ node: post }) => (
            <ChildLink to={post.fields.slug} key={post.fields.slug}>
              {post.frontmatter.title}
            </ChildLink>
          ))}
        </div>
      </StyledAccordion>
    )
  }
}

const SideBar = () => (
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
          <SideBarLink to="/" src={fire}>
            Favorites
          </SideBarLink>
          <SideBarLink to="/brainstorm/" src={spinner}>
            Running Projects
          </SideBarLink>
          {hierarchalPosts.map(accordionData => (
            <Accordion
              parent={accordionData.parent}
              subposts={accordionData.subnodes}
              key={accordionData.parent.frontmatter.title}
            />
          ))}
        </StyledSideBar>
      )
    }}
  />
)

export default SideBar
