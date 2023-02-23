import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Button from "../components/elements/button"

const Organizations = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes
  const title = "All organizations"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={title} />
      <Bio />
      <div style={{ margin: "20px 0 40px" }}>
        {posts.map(({ frontmatter, fields, excerpt }) => {
          const title = frontmatter.title || fields.slug
          return (
            <div key={fields.slug}>
              <h3>
                <Link
                  style={{ boxShadow: `none` }}
                  to={`/organizations${fields.slug}`}
                >
                  {title}
                </Link>
              </h3>
              <small>{frontmatter.present ? 'Present' : frontmatter.enddate}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: frontmatter.description || excerpt,
                }}
              />
            </div>
          )
        })}
      </div>
      <Link to="/">
        <Button marginTop="85px">Go Home</Button>
      </Link>
    </Layout>
  )
}

export default Organizations

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: "organizations" }}},
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          startdate(formatString: "MMM YYYY")
          present
          enddate(formatString: "MMM YYYY")
          title
          categories
          position
        }
      }
    }
  }
`
