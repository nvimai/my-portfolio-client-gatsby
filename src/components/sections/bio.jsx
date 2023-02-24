import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import "font-awesome/css/font-awesome.min.css"
import "../../styles/components/sections/bio.scss";

const Bio = () => {
  const data = useStaticQuery(pageQuery);
  const { author, social } = data.site.siteMetadata;
  return (
    <div className="bio">
      <div className="media" style={{ color: `unset`}}>
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
      </div>
    </div>
  )
}

export default Bio;

export const pageQuery = graphql`
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
