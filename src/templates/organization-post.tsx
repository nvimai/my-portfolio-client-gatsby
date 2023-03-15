import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import '../styles/templates/organization-post.scss';

const OrganizationPostTemplate = ({
  data: { previous, next, site, markdownRemark: post }, location 
}: any) => {
  const siteTitle = site.siteMetadata?.title || 'Title';
  const { title, description, startdate, date, present } = post.frontmatter

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
        { present ? 'Present' : date }
      </p>
      <section
        className="organization-post"
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <hr />
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
      </ul>
    </Layout>
  )
}

export default OrganizationPostTemplate

export const pageQuery = graphql`
  query PostBySlug(
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
        present
        date(formatString: "MMMM DD, YYYY")
        categories
        position
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
