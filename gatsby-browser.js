import React from 'react'
import Layout from './src/components/layout'
import ProjectPageLayout from './src/components/project-page-layout'

export const wrapPageElement = ({ element, props }) => {
  return <ProjectPageLayout {...props}>{element}</ProjectPageLayout>
}
