import React, { Component } from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import '../styles/components/topnavbar.scss'

export default class TopNavBar extends Component {
  constructor(props) {
		super(props);
    this.state = {
      menuOpened: false,
			// alphaColor: 0,
		};
  }

  // componentDidMount = () => {
	// 	window.addEventListener('scroll', this.handleScroll);
  // }
  
	// componentWillUnmount = () => {
	// 	window.removeEventListener('scroll', this.handleScroll);
  // }

  toggleMenu = () => {
		this.setState((state) => ({
			menuOpened: !state.menuOpened
		}));
	};
  
  // handleScroll = (e) => {
	// 	let maxTop = -500;
	// 	let scrollTop = e.srcElement.body.getBoundingClientRect().top;
	// 	this.setState({
	// 		alphaColor: scrollTop < maxTop ? 1 : scrollTop * (1.0) / maxTop
	// 	});
	// }
  
  render() {
    return (
      <StaticQuery
        query={navBarQuery}
        render={data => {
          const { title, social } = data.site.siteMetadata
          return (
            <nav
              className={`navbar is-fixed-top ${this.state.menuOpen ? 'is-active' : ''}`}
              role="navigation"
              aria-label="main navigation"
              // style={{
              //   backgroundColor: `rgba(46, 46, 46, ${this.state.alphaColor})`
              // }}
            >
              <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                  <img
                    src={data.avatar.publicURL}
                    className="d-inline-block align-top"
                    alt={title + ' logo'}
                    style={{
                      marginBottom: '0',
                      width: '50px'
                    }}
                  />
                </Link>
                <div onClick={this.toggleMenu} className={`navbar-burger burger ${
								this.state.menuOpened ? 'is-active' : ''
								}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div id="navbarExampleTransparentExample" className={`navbar-menu ${this.state.menuOpened ? 'is-active' : ''}`}>
                <div className="navbar-start">
                  <Link className="navbar-item" to="/">
                    Home
                </Link>
                  <Link className="navbar-item" to="/projects">
                    Projects
                </Link>
                  <Link className="navbar-item" to="/blog">
                    Blog
                </Link>
                </div>

                <div className="navbar-end">
                  <a className="navbar-item" href={`https://github.com/${social.github}`} title="Nvi's GitHub">
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </a>
                  <a className="navbar-item" href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a className="navbar-item" href={`https://www.instagram.com/${social.instagram}`} title="Nvi's Instagram">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a className="navbar-item" href={`mailto:${social.email}`} title="email to Nvi">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </nav>
          )
        }}
      />
    )
  }
}

const navBarQuery = graphql`
  query NavBarQuery {
    avatar: file(absolutePath: { regex: "/logo-nuniversal.svg/" }) {
      publicURL
    }
    site {
      siteMetadata {
        title
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