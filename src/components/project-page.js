import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import DefaultPageLayout from './defaultPageLayout'
import CoverImage from './coverImage'
import SEO from './seo'

function ProjectPage({ data }) {
  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <CoverImage>{data.mdx.frontmatter.title}</CoverImage>
      <DefaultPageLayout>
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
      </DefaultPageLayout>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`

export default ProjectPage
