/**
 * Intro section component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import "../../styles/components/sections/intro.scss";
import AnimatedButton from '../elements/animatedbutton';

const Intro = () => {
  const state = {
    firstName: 'Nvi',
    lastName: 'Mai',
    aliasName: '',
    streetAddress: 'Canada',
    shortBio: 'CURIOUS DEVELOPER, PASSIONATE WEB DESIGNER',
    socials: {
      github: 'https://github.com/nvimai',
      linkedin: 'https://www.linkedin.com/in/nhatmai/'
    },
    profilePictures: ['https://lh3.googleusercontent.com/CPfRKG_LZv5pTLiNjtPCPITIM9u7RA9jt7P8RXX0Vt56iK_C1sQDEJVWiKDcxY8T5w3H7qt4ZVtzOB5YnbcHmIsFswfkuCIX2bB0Wxi2dwoO1E73di6HUffzxZ70zHrbyDKSBHVsb9NoNgzIZUZuYXsdwgTDHuci4PRIKTkRyDmiNrE9ntcempAl-N2fMbjxafVZ0e_P6KwrE8yAj3CBzeL6UB-Hng2ezShtF5TGmZ2exFjd5PZzI5oFKfaUbVJiHUnru61rKF4iWf2PeFnGq3X8MYGt7zGQRk4OeW_-kPfjqO6S8qr1qqv3AQkhhw2dPN8KRmeTZaere0Ed7cI7KuPeqtPudSCC5Mn_X0FtwMIVHMnqbZBR_0_1vKgIVth7SPCfZISoDDiaw8FLiumU-YewDWMFDyfOT85knZ5T7OmunO394QY_nX0BqFLbKJSyHXORzW--KgbJYRfqjiluSrIYmpMsjqEC_BVWw6jiOS_xl-5JkAdk4dknxx-1blakOMzlXM60Ry3ghlcYLjppTAokwttiH9_CHXWkaAu9sr2s_rpQZ-Wd2SywRfk0VR3MWwPFs_BOoPuBRL_QZqW8BR0ME0NlenrB597rEMQgOmjUbF7OEABtHKqxFU-AdH6XbB_eRtckZjkfNNcY9ZQFBsc5_GsB63z40gS5ZNeyy8RiH8OJ54cJn18TZfoYJVE5DAxCydV1oQPchW1p2e9g961hbg=s1234-no'],
    highlights: ['Curious Developer', 'Passionate Web Designer'],
    emails: ['contact@nvimai.com'],
    objectives: ['Working on Front-end, Back-end, Full-stack developer those which are programming languages and frameworks: C#, ASP.net, PHP, JavaScript, SQL, WordPress, MongoDB, Express.js, React, React Native, VueJS, AngularJS, Node.JS and beyond.'],
  }

  const { firstName, lastName, streetAddress, socials, highlights, emails, objectives } = state;
  return (
    <StaticQuery
      query={introQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div className={'intro bg-gradient padding-1 border-radius-30'}>
            <div className="brief columns">
              <div className="profile column is-one-third-desktop">
                <img
                  className="profile"
                  formats={["auto", "webp", "avif"]}
                  src={data.avatar.publicURL}
                  alt={author?.name || 'alt'}
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
                    <a className="button is-dark" href={socials.github} title="Nvi's GitHub">
                      <i className="fa fa-github" aria-hidden="true"></i>
                    </a>
                    <a className="button is-link" href={socials.linkedin} title="Nvi's LinkedIn">
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
      }}
    />
  )
}

export default Intro;

const introQuery = graphql`
  query introQuery {
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
