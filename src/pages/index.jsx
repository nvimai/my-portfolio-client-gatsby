import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import OranizationsSlider from "../components/organizations"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Gatsby Starter Personal Website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
        <Link to="/projects/">
          <Button marginTop="35px">Go to Projects</Button>
        </Link>
        <img style={{ margin: 0 }} src="./images/GatsbyScene.svg" alt="Gatsby Scene" />
        <h1>
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <OranizationsSlider />
        <p>Welcome to your new Gatsby website. You are on your home page.</p>
        <p>
          This starter comes out of the box with styled components and Gatsby's
          default starter blog running on Netlify CMS.
        </p>
        <p>Now go build something great!</p>
      </Layout>
    )
  }
}

export default IndexPage
