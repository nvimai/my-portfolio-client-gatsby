import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import OranizationsSlider from "../components/organizations"
import Intro from "../components/intro"

import "../styles/pages/index.scss"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Gatsby Starter Personal Website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div id="intro">
          <Intro />
        </div>
        <div id="organizations">
          <h2 className="heading">Organizations</h2>
          <OranizationsSlider />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
