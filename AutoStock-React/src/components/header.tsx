import * as React from "react"
import { Link } from "gatsby"
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Heading,
  Spacer,
  IconButton,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import './header.css'
import Button from '@mui/material/Button';


const Header = ({siteTitle }: HeaderProps) =>   (
    <>
      <Box className='navbar' h='90' px={50} >
        <Flex>
          <Box p='20'  pt='20'>
            <h1><Link to='/' className='autostock-link'>{siteTitle}</Link></h1>
          </Box>
          <HStack p='20' spacing='50px' pt='5'>
            <p></p>
            <h4><Link to='/CreateAlgorithm' className='text-link'>Create New Algorithm</Link></h4>
            <h4><Link to='/MyAlgorithm' className='text-link'>My Algorithms</Link></h4>
            <h4><Link to='/Algorithms' className='text-link'> Created Algorithms</Link></h4>  
          </HStack>
          <Spacer />
          <Box p='20'  pt='25'>
            <Button variant="contained" sx={{ mr: 2 }}>Sign Up</Button>
            <Button variant="contained">Log In</Button>
          </Box>
        </Flex>
      </Box>
    </>
  )

export default Header

interface HeaderProps { 
  siteTitle: string
}

// const Header = ({ siteTitle }: HeaderProps) => (
//   <header
//     style={{
//       background: `#059a76`,
//       marginBottom: `1.45rem`,
//     }}
//   >
//     <div
//       style={{
//         margin: `0 auto`,
//         maxWidth: 960,
//         padding: `1.45rem 1.0875rem`,
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: `white`,
//             textDecoration: `none`,
//           }}
//         >
//           {siteTitle}
//         </Link>
//       </h1>

//     </div>
//   </header>


// )
// export default Header
