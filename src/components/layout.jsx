import React from "react"
// import { Link } from "gatsby"
import styled from "styled-components"

import '../styles/main.scss'
import TopNavBar from "./topnavbar"
import FooterNavBar from "./footernavbar"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    // const blogPath = `${__PATH_PREFIX__}/blog/`
    // const projectsPath = `${__PATH_PREFIX__}/projects/`

    return (
      <Wrapper>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: `56rem`,
          }}
        >
          <header>
            <TopNavBar />
          </header>
          <main>{children}</main>
        </div>
        <FooterNavBar />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Layout
