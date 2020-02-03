import React, { Component } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import '../styles/components/footernavbar.scss';

export default class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false,
			preload: true,
		};
	}

	handleFreeze = (e) => {
		e.preventDefault();
	};

	toggleMenu = () => {
		this.setState((state) => ({
			menuOpen: !state.menuOpen,
			preload: false,
		}));
	};

	render() {
		return (
			<StaticQuery
        query={footerNavBarQuery}
        render={data => {
          const { title, bio, author, social } = data.site.siteMetadata
          return (
            <nav className="footer">
              <main className="columns">
                <div className="brand column">
                  <Link to="/">
                    <img
                      src={data.avatar.publicURL}
                      className="logo d-inline-block"
                      alt={title + ' logo'}
                      style={{
                        marginBottom: '0',
                        width: '120px'
                      }}
                    />
                  </Link>
                  <div>{bio}</div>
                </div>
                <div className="navigation column">
                  <div className="columns is-mobile">
                    <div className="column">
                      <h4>Categories</h4>
                      <ul className="">
                        <li>
                          <Link to="/projects">Projects</Link>
                        </li>
                        <li>
                          <Link to="/blogs">Blogs</Link>
                        </li>
                        <li>
                          <Link to="/#contact">Contact</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="column">
                      <h4>Groups</h4>
                      <ul className="">
                        <li>
                          <Link to="#">Web Application</Link>
                        </li>
                        <li>
                          <Link to="#">WordPress</Link>
                        </li>
                        <li>
                          <Link to="#">Computer Science</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="social column">
                  <h4>More About Me</h4>
                  <ul>
                    <li>
                      <a className="social-item" href={`https://github.com/${social.github}`} title="Nvi's GitHub">
                        <i className="fa fa-github" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a className="social-item" href={`https://www.linkedin.com/in/${social.linkedin}`} title="Nvi's LinkedIn">
                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a className="social-item" href={`https://www.instagram.com/${social.instagram}`} title="Nvi's Instagram">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a className="social-item" href={`mailto:${social.email}`} title="email to Nvi">
                        <i className="fa fa-envelope-square" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </main>
              <aside>
                <div className="copyright">
                  <p>© {new Date().getFullYear()} by <b>{author}</b> with <i className="fa fa-heart" aria-hidden="true"></i></p>
                </div>
                <div className="terms">
                  <p><Link to="#">Privacy Policy</Link> | <Link to="#">Terms &#38; Conditions</Link></p>
                </div>
              </aside>
            </nav>
          )
        }}
      />
		);
	}
}


const footerNavBarQuery = graphql`
  query FooterNavBarQuery {
    avatar: file(absolutePath: { regex: "/nvi-emoji.png/" }) {
      publicURL
    }
    site {
      siteMetadata {
        title
        bio
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