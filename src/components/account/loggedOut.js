import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import LogIn from './logIn';
import SignUp from './signUp';
import ForgotPassword from './forgotPassword';

/**
 * CSS
 */
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="Logged-out Logged-out-header">
        <div style={{ height:'75vh' }}>
          <Tabs defaultActiveKey="logIn" id="uncontrolled-tab-example" style={{ flex: 1, borderColor: 'white', borderWidth:3}}>
            <Tab eventKey="logIn" title="LogIn">
              <LogIn />
            </Tab>
            <Tab eventKey="signUp" title="SignUp">
              <SignUp />
            </Tab>
            <Tab eventKey="forgotPassword" title="Forgot Password">
              <ForgotPassword />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default LoggedOut;