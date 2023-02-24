import React from "react"
import { Link, graphql } from "gatsby"
// import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Tag from "../components/elements/tag"
import Button from "../components/elements/button"
import Seo from "../components/seo"
import "../styles/templates/project-post.scss"

const ProjectPostTemplate = ({ data, location, children }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  // const { previous, next } = pageContext
  const { title, description, tags, startdate, enddate, present, url } = post.frontmatter

  return (
    <Layout location={location} title={siteTitle} childName="project-post">
      <Seo
        title={title}
        description={description || post.excerpt}
      />
      <Link to="/projects">&#8592; All projects</Link>
      <h1>{title}</h1>
      <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{present ? 'Present' : enddate }</span></p>
      {tags ? tags.map((tag, idx) => {
          return (
            <Tag className="tag" key={idx}>{tag}</Tag>
          )
        }) : ''}
      <hr />
      <section
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      {/* <MDXRenderer>{post.html}</MDXRenderer> */}
      <br />
      {!url ? '' :
        <a href={url}>
          <Button>Click here for more details <i className="fa fa-link" aria-hidden="true"></i></Button>
        </a>
      }
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
            <Link to={`/projects${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/projects${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul> */}
    </Layout>
  )
}

export default ProjectPostTemplate

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        position
        startdate(formatString: "MMM YYYY")
        present
        enddate(formatString: "MMM YYYY")
        categories
        tags
        url
      }
    }
  }
`
