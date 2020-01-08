/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "../styles/components/intro.scss"

function Intro() {
  return (
    <StaticQuery
      query={introQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div className="intro">
            <div className="brief columns">
              <div className="profile column is-one-third-desktop">
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={author}
                  style={{
                    marginBottom: 0,
                    minWidth: 50,
                    borderRadius: `100%`,
                  }}
                />
              </div>
              <div className="column">
                <h1 className="name">{author}</h1>
                <p className="slogan">Curious Developer, Passionate Web Designer</p>
                <div className="contact">
                  <ul className="contact-info">
                    <li>
                      <a href="mailto:contact@nvimai.com">
                        <i className="fa fa-envelope"></i>contact@nvimai.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+1 437-986-6892">
                      <i className="fa fa-phone" aria-hidden="true"></i>+1 437-986-6892
                      </a>
                    </li>
                    <li>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      Ontario, Canada
                    </li>
                  </ul>
                  <div className="contact-social buttons is-grouped" >
                      <a className="button is-dark" href={`https://github.com/${social.github}`} title="Nvi's GitHub">
                          <i className="fa fa-github" aria-hidden="true"></i>
                      </a>
                      <a className="button is-link" href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </a>
                      <a className="button is-danger" href={`https://www.instagram.com/${social.instagram}`} title="Nvi's Instagram">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="objectives">
              <p className="objective">
                Working on Front-end, Back-end, Full-stack developer those which are programming languages and frameworks: C#, ASP.net, PHP, JavaScript, SQL, WordPress, MongoDB, Express.js, React, Node.JS (MERN) and beyond.
              </p>
            </div>
          </div>
        )
      }}
    />
  )
}

const introQuery = graphql`
  query introQuery {
    avatar: file(absolutePath: { regex: "/nhat-profile.jpg/" }) {
      childImageSharp {
        fixed(width: 200, height: 200) {
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
export default Intro
