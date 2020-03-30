import React, { Component } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import * as account from '../../api/account';


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      redirectToAssets: false,
      loading: false,
      showAlert: false,
      variant: 'success',
      message: ''
    };
  }

  componentDidMount() {

  }

  async onSignIn() {
    const { username, password } = this.state;
    try {
      this.setState({ loading: true });
      const token = await account.logIn(username, password);
      console.log('[TOKEN]', token);
      this.setState({ redirectToAssets: true, loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ password: '', loading: false, variant: 'danger', message: error.message, showAlert: true});
    }
  }

  redirectToAssets = () => {
    if (this.state.redirectToAssets) {
      return <Redirect to='/assets' />
    }
    return null;
  }

  //User can Login pressing Enter Key instead of click the button
  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.onSignIn()
    }
  }

  render() {
    return (
      <Form className="loggedOut-tab-form">
        <Form.Row>
          <Alert variant={this.state.variant} show={this.state.showAlert} style={{width: '100%'}}>
            {this.state.message}
          </Alert>
        </Form.Row>
        <Form.Group controlId="logInEmail" style={{ textAlign: 'left' }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => this.setState({ username: event.target.value })}
            value={this.state.username}
          />
          <div>
            <Form.Text className="text-muted" style={{ textAlign: 'center', fontSize: '18px' }}>
              We'll never share your email with anyone else.
            </Form.Text>
          </div>
        </Form.Group>

        <Form.Group controlId="logInPassword" style={{ textAlign: 'left' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => this.setState({ password: event.target.value })}
            value={this.state.password}
            onKeyPress={this.keyPressed}
            
          />
        </Form.Group>
        <Form.Group controlId="logInCheckbox" style={{ alignItems: 'center', fontSize: '15px' }}>
          <Form.Check type="checkbox" label="Remember me" onChange={(event) => this.setState({ remember: event.target.value })} />
        </Form.Group>
        <Button variant="primary" className="LoginButton" type="button" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => this.onSignIn()}>
          { this.state.loading ? <Spinner animation='border' /> : 'L O G I N' }
        </Button>
        {this.redirectToAssets()}
      </Form>
    );
  }

  
}

export default LogIn;