import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import Login from "../components/screens/login"
import CreateAccount from "../components/screens/createAccount"
import Algorithm from "../components/screens/Algorithm"
import CreateAlgorithm from "../components/screens/CreateAlgorithm"
import MyAlgorithm from "../components/screens/MyAlgorithm"
import Home from "../components/screens/home"
import PublicAlgorithms from "../components/screens/PublicAlgorithms"
import competition from "../components/screens/competition"
import competitions from "../components/screens/competitions"
import PrivateRoute from "../components/privateRoute"
import Index from "./index"
import QuickStartGuide from "../components/screens/QuickstartGuide"
import EditAlgorithm from "../components/screens/EditAlgorithm"
import EditUser from "../components/screens/EditUser"
import LandingPage from "../components/screens/landingPage"

const App = () => (
  <Router basepath="/app">
    <RouterPage path="/login" pageComponent={<Login />} />
    <RouterPage path="/createaccount" pageComponent={<CreateAccount />} />

    <PrivateRoute path="/algorithm" component={Algorithm} />
    <PrivateRoute path="/createalgorithm" component={CreateAlgorithm} />
    <PrivateRoute path="/editalgorithm" component={EditAlgorithm} />
    <PrivateRoute path="/edituser" component={EditUser} />
    <PrivateRoute path="/myalgorithms" component={MyAlgorithm} />
    <PrivateRoute path="/competition" component={competition} />
    <PrivateRoute path="/competitions" component={competitions} />
    <PrivateRoute path="/publicalgorithms" component={PublicAlgorithms} />
    <PrivateRoute path="/quickstartguide" component={QuickStartGuide} />
    <PrivateRoute path="/home" component={Home} />
    <PrivateRoute path="/landing" component={LandingPage} />


    <RouterPage path="/" pageComponent={<Index />} />
  </Router>
)

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent
