import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import * as account from '../../api/account';

/**
 * CSS
 */
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      redirectToAssets: false
    };
  }

  componentDidMount() {

  }

  async onSignIn() {
    const { username, password, remember } = this.state;
    console.log('[REMEMBER]', remember);
    try {
      let response = await account.logIn(username, password);
      this.setState({ redirectToAssets: true });
    } catch (error) {
      console.log(error);
      this.setState({
        password: '',
      });
    }
  }

  redirectToAssets = () => {
    if (this.state.redirectToAssets) {
      return <Redirect to='/assets' />
    }
    return null;
  }

  render() {
    return (
      <Form style={{ flex: 1, width: '30vw', margin: 30 }}>
        <Form.Group controlId="forgotPasswordEmail" style={{ textAlign: 'left' }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => this.setState({ username: event.target.value })}
            value={this.state.username}
          />
          <div>
            <Form.Text className="text-muted" style={{ textAlign: 'center', fontSize: '18px' }}>
              An email will be sent to you requesting a new password.
            </Form.Text>
          </div>
        </Form.Group>

        <Button variant="primary" type="button" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => this.onSignIn()}>
          S U B M I T
        </Button>
      </Form>
    );
  }
}

export default ForgotPassword;