/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout_landing.css"

interface LayoutProps {
  children: React.ReactNode
}

const LayoutLanding = ({ children }: LayoutProps) => {
  const siteTitle: string = "Autostock"

  return (
    <>
      <Header siteTitle={siteTitle} />
      <div className="layout_body" style={{}}>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}
          {` `}
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">AutoStock</a>
        </footer>
      </div>
    </>
  )
}

export default LayoutLanding
