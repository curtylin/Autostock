import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="AutoStock" />
    <Link to='/CreateAlgorithm'>Create New Algorithm</Link>
    <Link to='/MyAlgorithm'>My Algorithms</Link>
    <Link to='/Algorithms'> Created Algorithms</Link>
  </Layout>
)

export default IndexPage