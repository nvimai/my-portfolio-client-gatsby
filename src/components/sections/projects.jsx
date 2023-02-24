import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ProjectCard from "../elements/projectcard";
 

const ProjectsSection = () => {

  const data = useStaticQuery(pageQuery);
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
}

export default ProjectsSection

const pageQuery = graphql`
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