/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout_landing.css"
import { Box, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

interface LayoutProps {
  children: React.ReactNode
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {"Autostock "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
const theme = createTheme()

const LayoutLanding = ({ children }: LayoutProps) => {
  const siteTitle: string = "Autostock"

  return (
    <>
      <Header siteTitle={siteTitle} />
      <div className="layout_body" style={{}}>
        <main>{children}</main>
        <ThemeProvider theme={theme}>
          {/* Footer */}
          <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="body2" color="text.secondary" align="center">
              <Link className="aboutUsLink" to="/app/aboutus">
                About us
              </Link>
            </Typography>
            <Copyright />
          </Box>
          {/* End footer */}
        </ThemeProvider>
      </div>
    </>
  )
}

export default LayoutLanding
