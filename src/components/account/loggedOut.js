import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
//import { Redirect } from 'react-router-dom';

import LogIn from './logIn';
import SignUp from './signUp';
import ForgotPassword from './forgotPassword';

class LoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab || 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {

  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
  }


  render() {
    return (
      <div className="Logged-out-header loggedOut-tabs">
        <div style={{ height:'75vh' }}>
          <Tabs 
          activeKey={this.state.activeTab}
          id="uncontrolled-tab-example"
          onSelect={this.handleSelect}>
            <Tab eventKey={1} title="LogIn">
              <LogIn />
            </Tab>
            <Tab eventKey={2} title="SignUp">
              <SignUp />
            </Tab>
            <Tab eventKey={3} title="Forgot Password">
              <ForgotPassword />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default LoggedOut;