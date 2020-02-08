import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import * as account from '../../api/account';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordRepeat: '',
      redirectToLogin: false
    };
  }

  componentDidMount() { }

  async onResetPassword() {
    try {
      await account.resetPassword(this.state.password);
      this.setState({ redirectToAssets: true });
    } catch (error) {
      console.log(error);
      this.setState({ password: '' });
    }
  }

  redirectToAssets = () => {
    if (this.state.redirectToAssets) {
      return <Redirect to='/' />
    }
    return null;
  }

  render() {
    return (
      <Form className="loggedOut-tab-form">
        <Form.Group controlId="resetPassword" style={{ textAlign: 'left' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your new password"
            onChange={(event) => this.setState({ password: event.target.value })}
            value={this.state.password}
          />
        </Form.Group>

        <Form.Group controlId="resetRepeatPassword" style={{ textAlign: 'left' }}>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat you new password"
            onChange={(event) => this.setState({ passwordRepeat: event.target.value })}
            value={this.state.passwordRepeat}
          />
        </Form.Group>

        <Button variant="primary" className="LoginButton" type="button" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => this.onResetPassword()}>
          R E S E T  P A S S W O R D
        </Button>
      </Form>
    );
  }
}

export default ForgotPassword;