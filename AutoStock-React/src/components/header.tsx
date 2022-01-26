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
  "Profile",
  "Account",
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
          <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="Bold"
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Algorithm Links */}
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}

            <Button
              onClick={handleOpenAlgMenu}
              sx={{ mt: 1, mx: 5, color: "white", display: "block" }}
            >
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                noWrap
                component="div"
                sx={{ display: { xs: "none", md: "flex" } }}
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
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
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                Competitions
              </Typography>
            </Button>
            <Button               sx={{ mt: 1, mx: 5, color: "white", display: "block" }}
>
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                noWrap
                component="div"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                Leaderboards
              </Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
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
