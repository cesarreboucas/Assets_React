import React from 'react';
import AssetsMainPage from './components/assets/assetsMainPage.js';
import ProfileMainPage from './components/profile/profileMainPage.js';
import GoalsMainPage from './components/goals/goalsMainPage.js';
import DashboardMainPage from './components/dashboard/dashboardMainPage.js';
import Home from './components/common/home.js';
import Login from './components/common/login.js';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import Signup from './components/common/signup.js';


class App extends React.Component {



  render() {
    return (
      <Router>
        {this.props.isLogged? 
          <Switch>
            <Route path="/goals">
              <GoalsMainPage />
            </Route>
            <Route path="/profile">
              <ProfileMainPage />
            </Route>
            <Route path="/assets">
              <AssetsMainPage />
            </Route>
            <Route path="/">
              <DashboardMainPage />
            </Route>
          </Switch>
          :
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>}
        
      </Router>
    );
  }
  
}

export default App;

