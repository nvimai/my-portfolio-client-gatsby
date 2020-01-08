import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectCard from "../components/projectcard"

class Project extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    const title = "All projects"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} />
        <h1>{title}</h1>
        <div className="columns is-multiline" style={{ margin: "20px 0 40px" }}>
          {
            posts.map(({ node }) => {
              const project = node
              return <ProjectCard { ...project} />
            })
          }
        </div>
        <Bio />
      </Layout>
    )
  }
}

export default Project

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { categories: { eq: "projects" }}},
      sort: { fields: [frontmatter___enddate], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            startdate(formatString: "MMM YYYY")
            enddate(formatString: "MMM YYYY")
            title
            position
            location
            categories
            tags
            image
          }
        }
      }
    }
  }
`
