import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import '../../styles/components/navbar/footernavbar.scss';

const FooterNavBar = () => {

  // Animation the plane when it's been clicked
  const flyClick = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.querySelector('.plane').classList.add('fly');
    setTimeout(() => {
      document.querySelector('.plane').classList.remove('fly');
    }, 4000);
  }

  const data = useStaticQuery(pageQuery);

  const { title, author, social } = data.site.siteMetadata
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
                width: '120px',
                borderRadius: '50%'
              }}
            />
          </Link>
          <div>{author.summary}</div>
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
                  <Link to="/blog">Blog</Link>
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
          <p>© {new Date().getFullYear()} by <strong>{author?.name}</strong> with <i className="fa fa-heart" aria-hidden="true"></i></p>
        </div>
        <div className="terms">
          <p><Link to="#">Privacy Policy</Link> | <Link to="#">Terms &#38; Conditions</Link></p>
        </div>
      </aside>
      <button className="plane-container" onClick={flyClick}>
        <div className="plane-rotater" style={{ transform: `rotate(-90deg)` }}>
          <div className="plane">
            <svg className="plane-svg" viewBox="0 0 28 26">
              <path className="plane-svg__path" fill="#fff" d="M0,0 28,13 0,26 0,13 20,13 0,7z"></path>
            </svg>
          </div>
        </div>
      </button>
    </nav>
  )
}

export default FooterNavBar

const pageQuery = graphql`
  query FooterNavBarQuery {
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