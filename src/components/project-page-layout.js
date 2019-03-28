import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

const ProjectPageLayout = ({ data: { mdx } }) => (
  <div>
    <h1>{mdx.frontmatter.title}TEST</h1>
    <MDXRenderer>{mdx.code.body}</MDXRenderer>
  </div>
)

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

export default ProjectPageLayout
