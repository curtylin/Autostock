// import * as React from "react"
// import { Link } from "gatsby"
// import {
//   Box,
//   Flex,
//   Avatar,
//   HStack,
//   Heading,
//   Spacer
// } from '@chakra-ui/react'
// import './header.css'
// import Button from '@mui/material/Button';

// const Header = ({siteTitle }: HeaderProps) =>   (
//     <>
//       <Box className='navbar' h='90' px={50} >
//         <Flex>
//           <Box p='20'  pt='20'>
//             <h1><Link to='/' className='autostock-link'>{siteTitle}</Link></h1>
//           </Box>
//           <HStack p='20' spacing='50px' pt='5'>
//             <p></p>
//             <h4><Link to='/CreateAlgorithm' className='text-link'>Create New Algorithm</Link></h4>
//             <h4><Link to='/MyAlgorithm' className='text-link'>My Algorithms</Link></h4>
//             <h4><Link to='/Algorithms' className='text-link'> Created Algorithms</Link></h4>  
//           </HStack>
//           <Spacer />
//           <Box p='20'  pt='25'>
//             <Button variant="contained" sx={{ mr: 2 }}>Sign Up</Button>
//             <Button variant="contained">Log In</Button>
//           </Box>
//         </Flex>
//       </Box>
//     </>
//   )

// export default Header

// interface HeaderProps { 
//   siteTitle: string
// }
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "gatsby"

interface HeaderProps { 
  siteTitle: string
}

const pages = [
  <Link to='/CreateAlgorithm' style={{ color: 'black', textDecoration: 'none' }}>Create Algorithm</Link>, 
  <Link to='/MyAlgorithm' style={{ color: 'black', textDecoration: 'none' }}>My Algorithms</Link>, 
  <Link to='/publicAlgorithms' style={{ color: 'black', textDecoration: 'none' }}>Public Algorithms</Link>];
  
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = ({siteTitle }: HeaderProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElAlg, setAnchorElAlg] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenAlgMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAlg(event.currentTarget);
  };

  const handleCloseAlgMenu = () => {
    setAnchorElAlg(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{mb:2}} style={{ background: '#059a76' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography 
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="Bold"
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}
            style={{ color: 'black'}}
          >
            <Link to='/' style={{ color: 'black', textDecoration: 'none' }} className='autostock-link'>{siteTitle}</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
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

            <Button onClick={handleOpenAlgMenu} sx={{ mt: 1, mx: 5, color: 'white', display: 'block' }}>
            <Typography 
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
              fontWeight="medium"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Algorithms
            </Typography>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElAlg}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElAlg)}
              onClose={handleCloseAlgMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Button sx={{ mt: 1, color: 'white', display: 'block' }}>
            <Typography 
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
              fontWeight="medium"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', md: 'flex' } }}
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
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
