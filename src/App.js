import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

import * as account from './api/account';

import LoggedOut from './components/account/loggedOut.js';

import Header from './components/common/header.js';
import Footer from './components/common/footer.js'

import AssetsMainPage from './components/assets/assetsMainPage.js';
import AssetDetail from './components/assets/assetDetail.js';
import ProfileMainPage from './components/profile/profileMainPage.js';
import GoalsMainPage from './components/goals/goalsMainPage.js';
import GoalsDetail from './components/goals/goalsDetail.js';
import DshboardMainPage from './components/dashboard/dashboardMainPage.js';
//import MovementDetails from './components/assets/movementDetails';

/* import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'; */

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoggedOut} />
          <PrivateRoute path="/dashboard" component={DshboardMainPage} />
          <PrivateRoute exact path="/goals" component={GoalsMainPage} />
          <PrivateRoute exact path="/goals/create" component={GoalsDetail} />
          <PrivateRoute path="/profile" component={ProfileMainPage} />
          <PrivateRoute exact path="/assets" component={AssetsMainPage} />
          <PrivateRoute exact path="/assets/create" component={AssetDetail} />
          <PrivateRoute exact path="/assets/:assetId" component={AssetDetail} />
          {/*<PrivateRoute exact path="/assets/movement/:assetId" component={MovementDetails} />*/}
        </Switch>
      </Router>
    );
  }
}

const PrivateComponentsRender = (props) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div  id="body_content" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <props.component params={useParams()} location={props.location} />
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
  //console.log('[AUTH]', account.isAuthenticated());
  if (account.isAuthenticated()) {
    return (
      <Route {...rest}>
        <PrivateComponentsRender component={component} location={{...rest}.location} />
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

