import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Tag from "../components/elements/tag"
import Button from "../components/elements/button"
import Seo from "../components/seo"
import "../styles/templates/project-post.scss"

const ProjectPostTemplate = ({
  data: { previous, next, site, markdownRemark: post }, location 
}: any) => {
  const siteTitle = site.siteMetadata?.title || 'Title';
  const { title, description, tags, startdate, date, present, url } = post.frontmatter

  return (
    <Layout location={location} title={siteTitle} childName="project-post">
      <Seo
        title={title}
        description={description || post.excerpt}
      />
      <Link to="/projects">&#8592; All projects</Link>
      <h1>{title}</h1>
      <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{present ? 'Present' : date }</span></p>
      {tags ? tags.map((tag: string, idx: number) => {
          return (
            <Tag className="tag" key={idx}>{tag}</Tag>
          )
        }) : ''}
      <hr />
      <section
        className="project-post"
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
      <br />
      {!url ? '' :
        <a href={url}>
          <Button>Click here for more details <i className="fa fa-link" aria-hidden="true"></i></Button>
        </a>
      }
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
      </ul>
    </Layout>
  )
}

export default ProjectPostTemplate

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
        position
        startdate(formatString: "MMM YYYY")
        present
        date(formatString: "MMM YYYY")
        categories
        tags
        url
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
