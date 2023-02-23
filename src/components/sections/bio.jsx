/**
 * Bio section component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import "font-awesome/css/font-awesome.min.css"
import "../../styles/components/sections/bio.scss";

const Bio = () => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div className="bio">
            <Link to="/" className="media" style={{ color: `unset`}}>
              <img
                className="media-left"
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src={data.avatar.publicURL}
                alt={author?.name || 'alt'}
                style={{
                  marginBottom: 0,
                  minWidth: 50,
                  borderRadius: `50%`,
                }}
              />
              <div className="media-content">
                <div className="content">
                  <p>Written by <strong>{author?.name}</strong> who lives and works in Ontario, Canada building Websites/Applications.</p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item" href={`https://github.com/${social.github}`} title="Nvi's GitHub">
                      <span className="icon is-small"><i className="fa fa-github"></i></span>
                    </a>
                    <a className="level-item" href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
                      <span className="icon is-small"><i className="fa fa-linkedin"></i></span>
                    </a>
                    <a className="level-item" href={`https://www.instagram.com/${social.instagram}`} title="Nvi's Instagram">
                      <span className="icon is-small"><i className="fa fa-instagram"></i></span>
                    </a>
                    <a className="level-item" href={`mailto:${social.email}`} title="email to Nvi">
                      <span className="icon is-small"><i className="fa fa-envelope"></i></span>
                    </a>
                  </div>
                </nav>
              </div>
            </Link>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/nvi-emoji.png/" }) {
      publicURL
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
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

export default Bio
