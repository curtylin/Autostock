import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import Login from "../components/screens/login"
import Algorithm from "../components/screens/Algorithm"
import CreateAlgorithm from "../components/screens/CreateAlgorithm"
import MyAlgorithm from "../components/screens/MyAlgorithm"
import Home from "../components/screens/home"
import PublicAlgorithms from "../components/screens/PublicAlgorithms"
import PrivateRoute from "../components/privateRoute"
import Index from "./index"

const App = () => (
  <Router basepath="/app">
    <RouterPage path="/login" pageComponent={<Login />} />
    <PrivateRoute path="/algorithm" component={Algorithm} />
    <PrivateRoute path="/createalgorithm" component={CreateAlgorithm} />
    <PrivateRoute path="/myalgorithm" component={MyAlgorithm} />
    <PrivateRoute path="/publicalgorithms" component={PublicAlgorithms} />
    <PrivateRoute path="/home" component={Home} />
    <RouterPage path="/" pageComponent={<Index />} />
  </Router>
)

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent
