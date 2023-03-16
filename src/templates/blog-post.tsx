import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import '../styles/templates/blog-post.scss';

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post }, location
}: any) => {
  const siteTitle = site.siteMetadata?.title || 'Title';

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Link to="/blog">&#8592; All posts</Link>
      <h1>{post.frontmatter.title}</h1>
      <small style={{ fontSize: '70%' }}>Updated: {post.frontmatter.date}</small>
      <hr
        style={{
          marginBottom: `1rem`,
        }}
      />
      <section
        className="blog-post"
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <hr
        style={{
          marginBottom: `1rem`,
        }}
      />
      <Bio />
      <ul
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
            <Link to={`/blog${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/blog${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousId: String
    $nextId: String
  ) {
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
        date(formatString: "MMMM DD, YYYY")
        tags
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
