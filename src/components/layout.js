import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import SideBar from './sidebar'
import Content from './content'
import './layout.css'

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
      <StyledPageContainer>
        <SideBar siteTitle={data.site.siteMetadata.title} />
        <Content>{children}</Content>
      </StyledPageContainer>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
