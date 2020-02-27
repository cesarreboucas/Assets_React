import React, { Component } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as account from '../../api/account';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      variant: 'success',
      showAlert: false,
      message: '',
      loading: false,
    };
  }

  componentDidMount() {

  }

  async onForgotPassword() {
    try {
      this.setState({ loading: true });
      await account.forgotPassword(this.state.username);
      this.setState({ showAlert: true, variant: 'success'
      , message: 'A link has been sent to your email', loading: false})
    } catch (error) {
      console.log(error);
      this.setState({ showAlert: true, variant: 'danger', message: error.message, loading: false });
    }
  }

  render() {
    return (
      <Form className="loggedOut-tab-form">
        <Form.Group controlId="forgotPasswordEmail" style={{ textAlign: 'left' }}>
          <Form.Row>
            <Alert variant={this.state.variant} show={this.state.showAlert} style={{width: '100%'}}>
              {this.state.message}
            </Alert>
          </Form.Row>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
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
          { this.state.loading ? <Spinner animation="border" /> : 'SUBMIT'}
        </Button>
      </Form>
    );
  }
}

export default ForgotPassword;