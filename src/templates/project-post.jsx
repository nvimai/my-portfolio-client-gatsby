import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Tag from "../components/tag"
import Button from "../components/button"
import SEO from "../components/seo"
import "../styles/templates/project-post.scss"

class ProjectPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    // const { previous, next } = this.props.pageContext
    const { title, description, tags, startdate, enddate, url } = post.frontmatter

    return (
      <Layout location={this.props.location} title={siteTitle} childName="project-post">
        <SEO
          title={title}
          description={description || post.excerpt}
        />
        <Link to="/projects">&#8592; All projects</Link>
        <h1>{title}</h1>
        <p className="date">{startdate ? startdate : 'Present'} - <span className="end">{enddate ? enddate : 'Present'}</span></p>
        {tags ? tags.map((tag) => {
            return (
              <Tag className="tag">{tag}</Tag>
            )
          }) : ''}
        <hr />
        <MDXRenderer>{post.body}</MDXRenderer>
        <br />
        {!url ? '' :
          <a href={url}>
            <Button>Click here for more details <i class="fa fa-link" aria-hidden="true"></i></Button>
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
              <Link to={`projects${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`projects${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul> */}
      </Layout>
    )
  }
}

export default ProjectPostTemplate

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
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
        position
        startdate(formatString: "MMM YYYY")
        enddate(formatString: "MMM YYYY")
        categories
        tags
        url
      }
    }
  }
`
