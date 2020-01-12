import React from 'react';
import AssetsMainPage from './components/assets/assetsMainPage.js';
import ProfileMainPage from './components/profile/profileMainPage.js';
import GoalsMainPage from './components/goals/goalsMainPage.js';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";


class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/goals">
            <GoalsMainPage />
          </Route>
          <Route path="/profile">
            <ProfileMainPage />
          </Route>
          <Route path="/">
            <AssetsMainPage />
          </Route>
        </Switch>
      </Router>
    );
  }
  
}

export default App;
