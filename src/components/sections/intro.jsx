/**
 * Intro section component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from "react";
import axios from 'axios';
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import "../../styles/components/sections/intro.scss";
import AnimatedButton from '../elements/animatedbutton';

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      aliasName: '',
      streetAddress: '',
      shortBio: '',
      socials: {},
      profilePictures: [],
      highlights: [],
      emails: [],
      objectives: [],
      loading: false,
    }
  }

  componentDidMount() {
    this.getData();
    // this.timerID = setInterval(
    //   () => this.getData(),
    //   1000
    // );
  }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  getData() {
    this.setState({ loading: true });
    axios.get(`${process.env.API_ENDPOINT}/profiles`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          let profile = res.data.profiles[0];
          this.setState({
            firstName: profile.firstName,
            lastName: profile.lastName,
            aliasName: profile.aliasName,
            streetAddress: profile.streetAddress,
            shortBio: profile.shortBio,
            socials: profile.socials,
            profilePictures: profile.profilePictures,
            highlights: profile.highlights,
            emails: profile.emails,
            objectives: profile.objectives,
          })
        } else {
          console.log(res);
        }
        this.setState({ loading: false });
      }).catch(err => {

        this.setState({ loading: false });
      });
  }

  render() {
    const { firstName, lastName, streetAddress, socials, highlights, emails, objectives, loading} = this.state;
    return (
      <StaticQuery
        query={introQuery}
        render={data => {
          const { author } = data.site.siteMetadata
          return (
            <div className={`intro bg-gradient padding-1 border-radius-30 ${loading ? 'loading' : ''}`}>
              <div className="brief columns">
                <div className="profile column is-one-third-desktop">
                  <Image
                    className="profile"
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
                  <h1 className="name">{ firstName + ' ' + lastName }</h1>
                  <p className="slogan">{ highlights.join(', ') }</p>
                  <div className="contact">
                    <ul className="contact-info">
                      <li>
                        <a href={'mailto:' + emails[0]}>
                          <i className="fa fa-envelope"></i>{ emails[0] }
                      </a>
                      </li>
                      <li>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        { streetAddress }
                    </li>
                    </ul>
                    <div className="contact-social buttons is-grouped" >
                      <a className="button is-dark" href={socials.github} title="Nvi's GitHub">
                        <i className="fa fa-github" aria-hidden="true"></i>
                      </a>
                      <a className="button is-link" href={socials.linkedin} title="Nvi's LinkedIn">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </a>
                      <a className="button is-danger" href={socials.instagram} title="Nvi's Instagram">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
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
              <AnimatedButton className="btn btn-floating scroll-wrapper padding-2 margin-1" isInternal={true} href="#projects">
                <svg className="mouse-outer">
                  <rect x="2" y="2" fill="none" width="94%" height="94%" rx="20" ry="20"></rect>
                </svg>
                <svg  className="mouse-inner btn-floating" height="1" width="1">
                  <circle cx="23" cy="25" r="4" stroke="none" fill="white"></circle>
                </svg>
              </AnimatedButton>
            </div>
          )
        }}
      />
    )
  }
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
