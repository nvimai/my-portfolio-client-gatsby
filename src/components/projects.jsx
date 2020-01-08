import React from "react";
import { StaticQuery, graphql } from "gatsby";
import ProjectCard from "../components/projectcard";
 

function ProjectsSection () {
  return (
    <StaticQuery
      query={projectsQuery}
      render={data => {
        const projects = data.allMdx.edges
        return (
          <div className="columns is-multiline" style={{ margin: "20px 0 40px" }}>
            {
              projects.map(({ node }) => {
                const project = node
                return <ProjectCard {...project} />
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