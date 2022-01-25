import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Login from "../components/login"
import Algorithm from "../components/Algorithm"
import CreateAlgorithm from "../components/CreateAlgorithm"
import MyAlgorithm from "../components/MyAlgorithm"
import Home from "../components/home"
import PublicAlgorithms from "../components/PublicAlgorithms"
import PrivateRoute from "../components/privateRoute"
import Index from "./index"

const App = () => (
  <Router basepath="/app">
    <Login path="/login" />
    <PrivateRoute path="/algorithm" component={Algorithm} />
    <PrivateRoute path="/createalgorithm" component={CreateAlgorithm} />
    <PrivateRoute path="/myalgorithm" component={MyAlgorithm} />
    <PrivateRoute path="/publicalgorithms" component={PublicAlgorithms} />
    <PrivateRoute path="/home" component={Home} />
    <Index path="/" />
  </Router>
)

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent
