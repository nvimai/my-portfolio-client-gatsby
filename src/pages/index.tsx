import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import OranizationsSlider from "../components/sections/organizations"
import Intro from "../components/sections/intro"
import ProjectsSection from "../components/sections/projects"
import ContactForm from "../components/forms/contactform"
import AnimatedButton from "../components/elements/animatedbutton"
import "../styles/pages/index.scss"
import { PageProps } from "gatsby"

type Props = {
  location: string;
}

const IndexPage = ({ location }: PageProps<Props>) => {
  const siteTitle = "Gatsby Starter Personal Website";

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="Home"
        keywords={[`portfolio`, `blog`, `gatsby`, `javascript`, `react`]}
      />
      <div id="intro">
        <Intro />
      </div>
      <div id="projects">
        <AnimatedButton internal='true' href="/projects">
          <h2 className="heading btn btn-topbottom">Projects</h2>
        </AnimatedButton>
        <ProjectsSection />
      </div>
      <div id="organizations">
        <AnimatedButton internal='true' href="/organizations">
          <h2 className="heading btn btn-topbottom">Organizations</h2>
        </AnimatedButton>
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

export default IndexPage;
