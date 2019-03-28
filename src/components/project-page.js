import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

function ProjectPage({ data }) {
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
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
