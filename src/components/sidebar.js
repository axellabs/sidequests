import React from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'

import fire from '../assets/icons/fire.svg'
import spinner from '../assets/icons/spinner.svg'
import folder from '../assets/icons/folder.svg'

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

const StyledLink = styled(Link).attrs({
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
  <StyledLink to={props.to}>
    <StyledLinkIcon src={props.src} />
    <p>{props.children}</p>
  </StyledLink>
)

const SideBar = () => (
  <StaticQuery
    query={graphql`
      query sideBar {
        allMdx {
          edges {
            node {
              id
              excerpt
              frontmatter {
                title
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
      return (
        <StyledSideBar>
          <SideBarLink to="/" src={fire}>
            Favorites
          </SideBarLink>
          <SideBarLink to="/brainstorm/" src={spinner}>
            Running Projects
          </SideBarLink>
          {posts.map(({ node: post }) => (
            <SideBarLink to={post.fields.slug} src={folder}>
              {post.frontmatter.title}
            </SideBarLink>
          ))}
        </StyledSideBar>
      )
    }}
  />
)

export default SideBar
