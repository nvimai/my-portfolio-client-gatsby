import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/sections/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

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
        description: string;
      }
    }[]
  }
}

type Props = {
  data: DataQuery;
  location: any;
};

const Blog = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes
  const title = "All posts"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={title} />
      <h1>{title}</h1>
      <Bio />
      <div style={{ margin: "20px 0 40px" }}>
        {posts.map(({ frontmatter, fields, excerpt }) => {
          const title = frontmatter.title || fields.slug
          return (
            <Link
              style={{ boxShadow: `none`, color: 'unset' }}
              to={`/blog${fields.slug}`}
              key={fields.slug}
            >
              <article key={fields.slug}
                style={{
                  padding: '10px',
                  margin: '10px 0',
                  boxShadow: `0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)`
                }}>
                <h2>{title}</h2>
                <small style={{ fontSize: '70%' }}>{frontmatter.date}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: frontmatter.description || excerpt,
                  }}
                />
              </article>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: "blog" }}},
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
