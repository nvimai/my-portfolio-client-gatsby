import React from "react"
import { Link, graphql } from "gatsby"
// import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const OrganizationPostTemplate = ({ data, location }) => {

  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { title, description, startdate, enddate, present } = post.frontmatter
  // const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={title}
        description={description || post.excerpt}
      />
      <Link to="/organizations">&#8592; All organizations</Link>
      <h1>{title}</h1>
      <p
        style={{
          display: `block`,
        }}
      >
        {startdate}
      </p>
      <p
        style={{
          display: `block`,
        }}
      >
        { present ? 'Present' : enddate }
      </p>
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      {/* <MDXRenderer>{post.html}</MDXRenderer> */}
      <hr />
      <Bio />

      {/* <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={`/organizations${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/organizations${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul> */}
    </Layout>
  )
}

export default OrganizationPostTemplate

export const pageQuery = graphql`
  query OrganizationPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        startdate(formatString: "MMMM DD, YYYY")
        present
        enddate(formatString: "MMMM DD, YYYY")
        categories
        position
      }
    }
  }
`
