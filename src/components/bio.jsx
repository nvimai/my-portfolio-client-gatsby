/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import "font-awesome/css/font-awesome.min.css"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Container>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Written by <strong>{author}</strong> who lives and works in Ontario, Canada building Websites/Applications.
            </p>
            <div>
              <ul
                style={{
                  display: `block`,
                  flexWrap: `wrap`,
                  justifyContent: `space-around`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  <a href={`https://github.com/${social.github}`} title="Nvi's GitHub">
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={`https://www.instagram.com/${social.instagram}`} title="Nvi's Instagram">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${social.email}`} title="email to Nvi">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </Container>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/nhat-profile.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter,
          github,
          linkedin,
          instagram,
          email
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
`

export default Bio
