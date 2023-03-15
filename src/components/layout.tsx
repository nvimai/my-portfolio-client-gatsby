/**
 * Layout component that frames the whole site
 */
import React from "react"
import styled from "styled-components"

import '../styles/main.scss'
import TopNavBar from "./navbar/topnavbar"
import FooterNavBar from "./navbar/footernavbar"

type Props = {
  children: any;
  childName?: string;
  location: any;
  title: string;
}

const Layout = ({ children, childName }: Props) => {
  return (
    <Wrapper>
      <div
        className="container"
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: `56rem`,
        }}
      >
        <header>
          <TopNavBar />
        </header>
        <main className={childName}>{children}</main>
      </div>
      <FooterNavBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Layout
