import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from './layout'

const ProjectPageLayout = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <Layout>
        <h1>{data.mdx.frontmatter.title}</h1>
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
      </Layout>
    )}
  />
)

export default ProjectPageLayout
