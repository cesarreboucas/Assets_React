import React from 'react';
import {  
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation} from "react-router-dom";

import * as account from './api/account';

import LoggedOut from './components/account/loggedOut.js';
import SignUp from './components/account/signUp.js';

import Header from './components/header/header.js';
import Footer from './components/header/footer.js'

import AssetsMainPage from './components/assets/assetsMainPage.js';
import ProfileMainPage from './components/profile/profileMainPage.js';
import GoalsMainPage from './components/goals/goalsMainPage.js';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoggedOut}/>
          <PrivateRoute path="/goals">
            {PrivateComponentsRender(<GoalsMainPage/>)}
          </PrivateRoute>
          <PrivateRoute path="/profile">
            {PrivateComponentsRender(<ProfileMainPage/>)}
          </PrivateRoute>
          <PrivateRoute path="/assets">
            {PrivateComponentsRender(<AssetsMainPage/>)}
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
  
}

function PrivateComponentsRender(component) {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <div style={{ width:'90%', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        {component}
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        account.isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
