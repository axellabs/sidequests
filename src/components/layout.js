import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import SideBar from './sidebar'
import './layout.css'

const StyledContentContainer = styled.div`
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
  background-color: #303030;
  color: white;
  padding-top: 1.45rem;
  width: 100%;
`

const StyledPageContainer = styled.div`
  display: flex;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <StyledPageContainer>
          <SideBar />
          <StyledContentContainer>{children}</StyledContentContainer>
        </StyledPageContainer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
