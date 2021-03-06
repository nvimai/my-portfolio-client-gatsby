import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import OranizationsSlider from "../components/sections/organizations"
import Intro from "../components/sections/intro"
import ProjectsSection from "../components/sections/projects"
import ContactForm from "../components/forms/contactform"
import AnimatedButton from "../components/elements/animatedbutton"
import "../styles/pages/index.scss"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Gatsby Starter Personal Website"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`portfolio`, `blog`, `gatsby`, `javascript`, `react`]}
        />
        <div id="intro">
          <Intro />
        </div>
        <div id="projects">
          <h2><AnimatedButton className="heading btn btn-topbottom" isInternal={true} href="/projects">Projects</AnimatedButton></h2>
          <ProjectsSection />
        </div>
        <div id="organizations">
          <h2><AnimatedButton className="heading btn btn-topbottom" isInternal={true} href="/organizations">Organizations</AnimatedButton></h2>
          <OranizationsSlider />
        </div>
        <div id="contact">
          <h2 className="heading btn btn-topbottom">Contact Me</h2>
          <p className="sub-heading">Don’t miss to contact me for more information, kindly fill the form below.</p>
          <ContactForm />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
