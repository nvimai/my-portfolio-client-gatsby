import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "../../styles/components/sections/intro.scss";
import AnimatedButton from '../elements/animatedbutton';

const Intro = () => {
  const data = useStaticQuery(pageQuery);
  const { author:
    {
      name,
      firstName,
      lastName,
      streetAddress,
      highlights,
      emails,
      objectives
    },
    social
  } = data.site.siteMetadata;

  return (
    <div className={'intro bg-gradient padding-1 border-radius-30'}>
      <div className="brief columns">
        <div className="profile column is-one-third-desktop">
          <img
            className="profile"
            formats={["auto", "webp", "avif"]}
            src={data.avatar.publicURL}
            alt={name || 'alt'}
            style={{
              marginBottom: '0',
              borderRadius: '50%'
            }}
          />
        </div>
        <div className="column">
          <h1 className="name">{firstName + ' ' + lastName}</h1>
          <p className="slogan">{highlights.join(', ')}</p>
          <div className="contact">
            <ul className="contact-info">
              <li>
                <a href={'mailto:' + emails[0]}>
                  <i className="fa fa-envelope"></i>{emails[0]}
                </a>
              </li>
              <li>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                {streetAddress}
              </li>
            </ul>
            <div className="contact-social buttons is-grouped" >
              <a className="button is-dark" href={`https://github.com/${social.github}`} title="Nvi's GitHub">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
              <a className="button is-link" href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="objectives">
        {
          objectives.map((value, index) => {
            return (
              <p className="objective" key={index}>
                {value}
              </p>);
          })
        }
      </div>
      <AnimatedButton className="btn btn-floating scroll-wrapper padding-2 margin-1" internal='true' href="#projects">
        <svg className="mouse-outer">
          <rect x="2" y="2" fill="none" width="94%" height="94%" rx="20" ry="20"></rect>
        </svg>
        <svg className="mouse-inner btn-floating" height="1" width="1">
          <circle cx="23" cy="25" r="4" stroke="none" fill="white"></circle>
        </svg>
      </AnimatedButton>
    </div>
  )
}

export default Intro;

const pageQuery = graphql`
  query introQuery {
    avatar: file(absolutePath: { regex: "/nvi-emoji.png/" }) {
      publicURL
    }
    site {
      siteMetadata {
        author {
          name
          firstName
          lastName
          aliasName
          streetAddress
          summary
          shortBio
          profilePictures
          highlights
          emails
          objectives
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
