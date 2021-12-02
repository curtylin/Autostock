import * as React from "react"
import { Link } from "gatsby"
import { Flex, Spacer } from "@chakra-ui/react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import MainBox from "../components/main/mainBox"

const IndexPage = () => (
  <Layout>
    <Seo title="AutoStock" />
    <MainBox />

    {/*<Link to='/CreateAlgorithm'>Create New Algorithm</Link>
    <div></div>
    <Link to='/MyAlgorithm'>My Algorithms</Link>
    <div></div>
    <Link to='/Algorithms'> Created Algorithms</Link>
    <div></div>
    <Link to='https://www.youtube.com/watch?v=rTgj1HxmUbg'>Gatsby Tutorial</Link>*/}
  </Layout>
)

export default IndexPage
