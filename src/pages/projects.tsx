import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/elements/projectcard"

type DataQuery = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      excerpt: string;
      fields: {
        slug: string;
      }
      frontmatter: {
        date: string;
        title: string;
        present: boolean;
        description: string;
        startdate: string;
        position: string;
        location: string;
        categories: string[];
        tags: string[];
        image: string;
      }
    }[]
  }
}

type Props = {
  data: DataQuery;
  location: any;
};

const Projects = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes
  const title = "All projects"
  const description = "The projects I have been working on and done since I started as a developer"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={title} description={description} />
      <h1>{title}</h1>
      <div className="columns is-multiline" style={{ margin: "20px 0 40px" }}>
        {
          posts.map((project, idx) => {
            return <ProjectCard key={idx} {...project} />
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
