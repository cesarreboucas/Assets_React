import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as account from '../../api/account';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      redirectToLogin: false
    };
  }

  componentDidMount() {

  }

  async onForgotPassword() {
    try {
      await account.forgotPassword(this.state.username);
    } catch (error) {
      console.log(error);
      this.setState({
        password: '',
      });
    }
  }

  render() {
    return (
      <Form className="loggedOut-tab-form">
        <Form.Group controlId="forgotPasswordEmail" style={{ textAlign: 'left' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            onChange={(event) => this.setState({ username: event.target.value })}
            value={this.state.password}
          />
          <div>
            <Form.Text className="text-muted" style={{ textAlign: 'center', fontSize: '18px' }}>
              An email will be sent to you requesting a new password.
            </Form.Text>
          </div>
        </Form.Group>

        <Button variant="primary" className="LoginButton" type="button" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => this.onForgotPassword()}>
          S U B M I T
        </Button>
      </Form>
    );
  }
}

export default ForgotPassword;