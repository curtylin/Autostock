/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link} from "gatsby"

import Header from "./header"
import "./layout.css"
import { Box, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface LayoutProps {
  children: React.ReactNode
}
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      {'Autostock '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();
const Layout = ({ children }: LayoutProps) => {
  const data: any = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle: string = data.site.siteMetadata?.title || `Title`

  return (
    <>
      <Header siteTitle={siteTitle} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1084,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <ThemeProvider theme={theme}>
                  {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            
            <Typography variant="body2" color="text.secondary" align="center">
              <Link className="aboutUsLink" to="/app/aboutus" >About us</Link>
            </Typography>
            <Copyright />
          </Box>
          {/* End footer */}
      </ThemeProvider>
      </div>
    </>
  )
}

export default Layout
