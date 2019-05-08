import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import DefaultPageLayout from './defaultPageLayout'
import CoverImage from './coverImage'
import SEO from './seo'
import LinkPreview from './link-preview'

const scope = {
  React: React,
  LinkPreview: LinkPreview,
}

function ProjectPage({ data }) {
  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <CoverImage src={data.mdx.frontmatter.imgPath.childImageSharp.fluid.src}>
        {data.mdx.frontmatter.title}
      </CoverImage>
      <DefaultPageLayout>
        <MDXRenderer scope={scope}>{data.mdx.code.body}</MDXRenderer>
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
        imgPath {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`

export default ProjectPage
