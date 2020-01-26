import React, { Component } from 'react';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';
//import { Redirect } from 'react-router-dom';

import LogIn from './logIn';
import SignUp from './signUp';
import ForgotPassword from './forgotPassword';
import Header from '../common/header.js'
import Footer from '../common/footer.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../common/layout.css';



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
      <div>
        <header>
            <Header />
          </header>
        <div className="Logged-out-header">
          
          <Container>
            <Row>
              <Col>
                TESTE
              <img src="/images/assets.svg" alt="logo" style={{ width: "100px", height: "100px" }} />
              </Col>

              <Col>
                <div style={{ height: '50vh' }}>
                  <Tabs
                    className="custom-tab"
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
              </Col>
            </Row>

          </Container>
        </div>
        <footer id="footer" style={{ display: 'block' }}>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default LoggedOut;