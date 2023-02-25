import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/elements/projectcard"

const Projects = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes
  const title = "All projects"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={title} />
      <h1>{title}</h1>
      <div className="columns is-multiline" style={{ margin: "20px 0 40px" }}>
        {
          posts.map((project, idx) => {
            return <ProjectCard key={idx} { ...project} />
          })
        }
      </div>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: "projects" }}},
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
          date(formatString: "MMM YYYY")
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
`
