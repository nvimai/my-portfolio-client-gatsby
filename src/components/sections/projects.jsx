/**
 * Projects section component that queries for data
 * with Gatsby's StaticQuery component and display 
 * all item as cards
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import ProjectCard from "../elements/projectcard";
 

const ProjectsSection = () => {
  return (
    <StaticQuery
      query={projectsQuery}
      render={data => {
        const projects = data.allMarkdownRemark.nodes
        return (
          <div className="columns is-multiline" style={{ margin: "20px 0 40px" }}>
            {
              projects.map((project, idx) => {
                return <ProjectCard key={idx} {...project}/>
              })
            }
          </div>
        )
      }}
    />
  )
}

export default ProjectsSection

const projectsQuery = graphql`
  query ProjectsQuery{
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
`