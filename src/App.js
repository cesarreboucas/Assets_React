import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useLocation
} from "react-router-dom";

import * as account from './api/account';

import LoggedOut from './components/account/loggedOut.js';

import Header from './components/common/header.js';
import Footer from './components/common/footer.js'

import AssetsMainPage from './components/assets/assetsMainPage.js';
import ProfileMainPage from './components/profile/profileMainPage.js';
import GoalsMainPage from './components/goals/goalsMainPage.js';
import DshboardMainPage from './components/dashboard/dashboardMainPage.js';

import './components/common/layout.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoggedOut} />
          <PrivateRoute path="/dashboard" component={<DshboardMainPage />} />
          <PrivateRoute path="/goals" component={<GoalsMainPage />} />
          <PrivateRoute path="/profile" component={<ProfileMainPage />} />
          <PrivateRoute exact path="/assets" component={<AssetsMainPage />} />
        </Switch>
      </Router>
    );
  }
}

const PrivateComponentsRender = (props) => {
  console.log('[USE_PARAMS]', useParams());
  return (
    <div>
      <header>
        <Header />
      </header>
      <div style={{ width: '90%', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        {props.component}
      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, component, ...rest }) {
  console.log('[AUTH]', account.isAuthenticated());

  if (account.isAuthenticated()) {
    return (
      <Route {...rest}>
        <PrivateComponentsRender component={component} />
      </Route>
    );
  } else {
    return <Redirect
      to={{
        pathname: "/",
        //state: { from: window.location }
      }}
    />
  }
}

export default App;

