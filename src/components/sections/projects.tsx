import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ProjectCard from "../elements/projectcard";
import { ProjectType } from "../../models";

type DataQuery = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    nodes: ProjectType[]
  }
}

const ProjectsSection = () => {

  const data = useStaticQuery<DataQuery>(pageQuery);
  const projects = data.allMarkdownRemark.nodes
  return (
    <div className="columns is-multiline" style={{ margin: "20px 0 40px" }}>
      {
        projects.map((project, idx) => {
          return <ProjectCard key={idx} {...project} />
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
          date(formatString: "MMM YYYY")
          title
          description
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