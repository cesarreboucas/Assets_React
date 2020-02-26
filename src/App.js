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
import ResetPassword from './components/account/resetPassword';

import Header from './components/common/header.js';
import Footer from './components/common/footer.js'

import AssetsMainPage from './components/assets/assetsMainPage.js';
import AssetDetail from './components/assets/assetDetail.js';
import ProfileMainPage from './components/profile/profileMainPage.js';
import GoalsMainPage from './components/goals/goalsMainPage.js';
import GoalsDetail from './components/goals/goalsDetail.js';
<<<<<<< HEAD
import DashboardMainPage from './components/dashboard/dashboardMainPage.js';
=======
import DshboardMainPage from './components/dashboard/dashboardMainPage.js';
//import MovementDetails from './components/assets/movementDetails';
>>>>>>> 991350f8dd372aa3fd16fc82d92e2b12f2ad8874

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={LoggedOut} />
<<<<<<< HEAD
          <PublicRoute exact path="/reset_password?token=:token&username=:username" component={ResetPassword} />
          <PrivateRoute path="/dashboard" component={DashboardMainPage} />
=======
          <PrivateRoute path="/dashboard" component={DshboardMainPage} />
>>>>>>> 991350f8dd372aa3fd16fc82d92e2b12f2ad8874
          <PrivateRoute exact path="/goals" component={GoalsMainPage} />
          <PrivateRoute exact path="/goals/:goal" component={GoalsDetail} />
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

const WrapperComponentsRender = (props) => {
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

function PublicRoute({ children, component, ...rest }) {
  return (
    <Route {...rest}>
      <WrapperComponentsRender component={component} />
    </Route>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, component, ...rest }) {
  if (account.isAuthenticated()) {
    return (
      <Route {...rest}>
        <WrapperComponentsRender component={component}  location={{...rest}.location} />
      </Route>
    );
  } else {
    return (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}

export default App;

