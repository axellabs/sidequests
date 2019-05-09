import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'

import './layout.css'
import SideBar from './sidebar'
import Content from './content'
import components from './mdx-components'

const StyledPageContainer = styled.div`
  display: flex;
  height: 100vh;
`

function Layout({ children }) {
  return (
    <MDXProvider components={components}>
      <StyledPageContainer>
        <SideBar />
        <Content>{children}</Content>
      </StyledPageContainer>
    </MDXProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
