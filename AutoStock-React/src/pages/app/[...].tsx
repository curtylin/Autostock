import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import Login from "../../components/screens/login"
import CreateAccount from "../../components/screens/createAccount"
import Algorithm from "../../components/screens/Algorithm"
import CreateAlgorithm from "../../components/screens/CreateAlgorithm"
import MyAlgorithm from "../../components/screens/MyAlgorithm"
import Home from "../../components/screens/home"
import PublicAlgorithms from "../../components/screens/PublicAlgorithms"
import competition from "../../components/screens/competition"
import competitions from "../../components/screens/competitions"
import allCompetitions from "../../components/screens/allCompetitions"
import enteredCompetitions from "../../components/screens/enteredCompetitions"
import notEnteredCompetitions from "../../components/screens/notEnteredCompetitions"
import PrivateRoute from "../../components/privateRoute"
import Index from ".././index"
import QuickStartGuide from "../../components/screens/QuickstartGuide"
import QuickStartAlgo from "../../components/screens/Quickstartalgo"
import EditAlgorithm from "../../components/screens/EditAlgorithm"
import EditUser from "../../components/screens/EditUser"
import LandingPage from "../../components/screens/landingPage"
import Leaderboards from "../../components/screens/leaderboards"
import AboutUs from "../../components/screens/AboutUs"

const App = () => (
  <Router basepath="/app">
    <RouterPage path="/login" pageComponent={<Login />} />
    <RouterPage path="/createaccount" pageComponent={<CreateAccount />} />
    <RouterPage path="/landing" pageComponent={<LandingPage />} />
    <RouterPage path="/aboutus" pageComponent={<AboutUs />} />

    <PrivateRoute path="/algorithm" component={Algorithm} />
    <PrivateRoute path="/leaderboards" component={Leaderboards} />
    <PrivateRoute path="/createalgorithm" component={CreateAlgorithm} />
    <PrivateRoute path="/editalgorithm" component={EditAlgorithm} />
    <PrivateRoute path="/edituser" component={EditUser} />
    <PrivateRoute path="/myalgorithms" component={MyAlgorithm} />
    <PrivateRoute path="/competition" component={competition} />
    <PrivateRoute path="/competitions" component={competitions} />
    <PrivateRoute
      path="/notenteredcompetitions"
      component={notEnteredCompetitions}
    />
    <PrivateRoute path="/enteredcompetitions" component={enteredCompetitions} />
    <PrivateRoute path="/allcompetitions" component={allCompetitions} />
    <PrivateRoute path="/publicalgorithms" component={PublicAlgorithms} />
    <PrivateRoute path="/quickstartguide" component={QuickStartGuide} />
    <PrivateRoute path="/quickstartcreatealgo" component={QuickStartAlgo} />
    <PrivateRoute path="/home" component={Home} />
    <RouterPage path="/" pageComponent={<Index />} />
  </Router>
)

export default App

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent
