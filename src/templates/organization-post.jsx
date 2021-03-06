import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class OrganizationPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    // const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Link to="/organizations">&#8592; All organizations</Link>
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            display: `block`,
          }}
        >
          {post.frontmatter.startdate}
        </p>
        <p
          style={{
            display: `block`,
          }}
        >
          { post.frontmatter.present ? 'Present' : post.frontmatter.enddate }
        </p>
        <MDXRenderer>{post.body}</MDXRenderer>
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
              <Link to={`organizations${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`organizations${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul> */}
      </Layout>
    )
  }
}

export default OrganizationPostTemplate

export const pageQuery = graphql`
  query OrganizationPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
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
