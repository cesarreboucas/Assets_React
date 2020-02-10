import React, { Component } from 'react';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';
//import { Redirect } from 'react-router-dom';

import LogIn from './logIn';
import SignUp from './signUp';

import ForgotPassword from './forgotPassword';
import Header from '../common/header.js'
import Footer from '../common/footer.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main.css';



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
            <Header/>
          </header>
        <div className="Logged-out-header">
          
          <Container>
            <Row>
              <Col>
                <img style={{paddingTop:'10vh', margin:'0 auto', width: "20vh" ,height:"20vh"}} src="/images/assets.svg" alt="logo"  />
                <h1 >WELCOME TO <p style={{color:'#ff7315'}}>ASSETS LOOKUP!</p></h1>
                <h3 style={{textAlign:'center', fontSize:'1.2rem'}}><u>A versatile tool to keep track of your investments return</u></h3>
              </Col>

              <Col>
                <div style={{ paddingTop:'6vh' , paddingBottom: '6vh'}}>
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