import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import '../../styles/components/navbar/topnavbar.scss'

const TopNavBar = () => {

  const [menuOpened, setMenuOpened] = useState(false);

  // componentDidMount = () => {
	// 	window.addEventListener('scroll', this.handleScroll);
  // }
  
	// componentWillUnmount = () => {
	// 	window.removeEventListener('scroll', this.handleScroll);
  // }

  const toggleMenu = () => {
		setMenuOpened((preState) => !preState);
	};
  
  // handleScroll = (e) => {
	// 	let maxTop = -500;
	// 	let scrollTop = e.srcElement.body.getBoundingClientRect().top;
	// 	this.setState({
	// 		alphaColor: scrollTop < maxTop ? 1 : scrollTop * (1.0) / maxTop
	// 	});
	// }
  

  const data = useStaticQuery(pageQuery);
  const { title, social } = data.site.siteMetadata
  return (
    <nav
      className={`navbar is-fixed-top ${menuOpened ? 'is-active' : ''}`}
      role="navigation"
      aria-label="main navigation"
      // style={{
      //   backgroundColor: `rgba(46, 46, 46, ${alphaColor})`
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
              borderRadius: '50%'
            }}
          />
        </Link>
        <button onClick={toggleMenu} className={`navbar-burger burger ${
        menuOpened ? 'is-active' : ''
        }`}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div id="navbarExampleTransparentExample" className={`navbar-menu ${menuOpened ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
              Home
          </Link>
          <Link className="navbar-item" to="/#contact">
              Contact
          </Link>
          <Link className="navbar-item" to="/projects">
              Projects
          </Link>
          <Link className="navbar-item" to="/blog">
              Blog
          </Link>
        </div>

        <div className="navbar-end">
          <OutboundLink target="_blank" className="navbar-item" href={`https://github.com/${social.github}`} title="Nvi's GitHub">
            <i className="fa fa-github" aria-hidden="true"></i>
          </OutboundLink>
          <OutboundLink target="_blank" className="navbar-item" href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </OutboundLink>
          <OutboundLink target="_blank" className="navbar-item" href={`https://www.instagram.com/${social.instagram}`} title="Nvi's Instagram">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </OutboundLink>
          <OutboundLink target="_blank" className="navbar-item" href={`mailto:${social.email}`} title="email to Nvi">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </OutboundLink>
        </div>
      </div>
    </nav>
  )
}

export default TopNavBar;

const pageQuery = graphql`
  query NavBarQuery {
    avatar: file(absolutePath: { regex: "/nvi-emoji.png/" }) {
      publicURL
    }
    site {
      siteMetadata {
        title
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