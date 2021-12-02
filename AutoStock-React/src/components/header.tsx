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
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';


export default function Header() {
  return (
    <>
      <Box bg='#059a76' px={4}>
        <Flex>
          <Box p='20'  pt='40'>
            <h1><Link to='/Index'>AutoStock</Link></h1>
          </Box>
          <HStack p='' spacing='20px'>
            <p></p>
            <h4><Link to='/CreateAlgorithm'>Create New Algorithm</Link></h4>
            <h4><Link to='/MyAlgorithm'>My Algorithms</Link></h4>
            <h4><Link to='/Algorithms'> Created Algorithms</Link></h4>
          </HStack>
          <Spacer />
          <Box p='20'  pt='50'>
            <Button colorScheme='blue' mr='4'>
              Sign Up
            </Button>
            <Button colorScheme='blue'>Log in</Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
//export default Header

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
