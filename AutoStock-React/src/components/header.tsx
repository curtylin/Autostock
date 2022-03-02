import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
import TemporaryDrawer from "../components/drawer"

interface HeaderProps {
  siteTitle: string
}

const pages = [
  <Link
    to="/app/createalgorithm"
    style={{ color: "black", textDecoration: "none" }}
  >
    Create Algorithm
  </Link>,
  <Link
    to="/app/myalgorithms"
    style={{ color: "black", textDecoration: "none" }}
  >
    My Algorithms
  </Link>,
  <Link
    to="/app/publicalgorithms"
    style={{ color: "black", textDecoration: "none" }}
  >
    Public Algorithms
  </Link>,
]

const settings = [
  <Link to="/app/quickstartguide" style={{ color: "black", textDecoration: "none" }}>
  Quick Start Guide
  </Link>,
  "Profile",
  <Link to="/app/edituser" style={{ color: "black", textDecoration: "none" }}>
    Edit Account
  </Link>,
  <Link to="/app/login" style={{ color: "black", textDecoration: "none" }}>
    Login
  </Link>,
  <Link
    to="/"
    style={{ color: "black", textDecoration: "none" }}
    onClick={event => {
      event.preventDefault()
      logout(() => navigate(`/app/login`))
    }}
  >
    Logout
  </Link>,
]

const Header = ({ siteTitle }: HeaderProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [anchorElAlg, setAnchorElAlg] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleOpenAlgMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAlg(event.currentTarget)
  }

  const handleCloseAlgMenu = () => {
    setAnchorElAlg(null)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  
  return (
    <AppBar sx={{ mb: 2 }} style={{ background: "#059a76" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* hamburger menu */}
          <Box sx={{ mr: 5, display:{lg:"none", md:"flex", sm:"flex"}}}>
            <TemporaryDrawer></TemporaryDrawer>
          </Box>
          <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="Bold"
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 5, display: { md: "flex" } }}
            style={{ color: "black" }}
          >
            <Link
              to="/app/home"
              style={{ color: "black", textDecoration: "none" }}
              className="autostock-link"
            >
              {siteTitle}
            </Link>
          </Typography>

          {isLoggedIn() ? <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleOpenAlgMenu}
              sx={{ mt: 1, mx: 5, color: "white", display: "block" }}
            >
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                noWrap
                component="div"
                sx={{ display: { xs: "none", md: "none", lg:"flex" } }}
              >
                Algorithms
              </Typography>
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElAlg}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElAlg)}
              onClose={handleCloseAlgMenu}
            >
              {pages.map(page => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Button sx={{ mt: 1, mx: 5, color: "white", display: "block" }} onClick={()=>{navigate("/app/competitions")}}>
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                noWrap
                component="div"
                sx={{ display: {xs: "none", md:"none", lg:"flex" } }}
              >
                Competitions
              </Typography>
            </Button>
            <Button sx={{ mt: 1, mx: 5, color: "white", display: "block" }}>
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                noWrap
                component="div"
                sx={{ display: { xs: "none", md: "none",  lg:"flex"} }}
              >
                Leaderboards
              </Typography>
            </Button>
          </Box>
          : <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}></Box>
          <Box  sx={{ flexGrow: 0, display: { } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
