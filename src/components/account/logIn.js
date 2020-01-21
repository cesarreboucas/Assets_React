import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import * as account from '../../api/account';

/**
 * CSS
 */
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      redirectToAssets: false
    };
  }

  componentDidMount() {

  }

  async onSignIn() {
    const { username, password } = this.state;
    try {
      const token = await account.logIn(username, password);
      console.log('[TOKEN]', token);
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
          />
        </Form.Group>
        <Form.Group controlId="logInCheckbox" style={{ alignItems: 'center', fontSize: '15px' }}>
          <Form.Check type="checkbox" label="Remember me" onChange={(event) => this.setState({ remember: event.target.value })} />
        </Form.Group>
        <Button variant="primary" type="button" style={{ width: '100%', fontWeight: 'bold' }} onClick={() => this.onSignIn()}>
          S U B M I T
        </Button>
        {this.redirectToAssets()}
      </Form>
    );
  }
}

export default LogIn;