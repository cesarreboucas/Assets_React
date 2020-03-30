import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

import * as account from '../../api/account';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      redirect: false,
      loading: false,
      showAlert: false,
      variant: 'success',
      message: ''
    };
  }

  componentDidMount() {

  }

  async onSignUp() {
    const { firstName, lastName, username, password } = this.state;
    try {
      this.setState({ loading: true });
      const token = await account.signUp(firstName, lastName, username, password);
      this.setState({ redirect: true });
    } catch(error) {
      this.setState({ showAlert: true, loading: false, message: error.message, variant: 'danger' })
    }
  }

  renderRedirect = () => {
    if(this.state.redirect) {
      return <Redirect to='/assets' />
    }
    return null;
  }

  render() {
    return (
      <Form className="loggedOut-tab-form">
        <Form.Row>
          <Alert variant={this.state.variant} show={this.state.showAlert} style={{width: '100%'}}>
            {this.state.message}
          </Alert>
        </Form.Row>
        <Form.Group controlId="signUpFirstName" style={{ textAlign: 'left' }}>
          <Form.Label>First Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="First Name" 
          onChange={(event) => this.setState({firstName: event.target.value})} 
          value={this.state.firstName} 
          />
        </Form.Group>

        <Form.Group controlId="signUpLastName" style={{ textAlign: 'left' }}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Last Name" 
          onChange={(event) => this.setState({lastName: event.target.value})} 
          value={this.state.lastName} 
          />
        </Form.Group>

        <Form.Group controlId="signUpEmail" style={{ textAlign: 'left' }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Enter email" 
          onChange={(event) => this.setState({username: event.target.value})} 
          value={this.state.username}
          />
        </Form.Group>

        <Form.Group controlId="signUpPassword" style={{ textAlign: 'left' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange={(event) => this.setState({password: event.target.value})} 
          value={this.state.password} 
          />
        </Form.Group>
        {<Button variant="primary" className="LoginButton" type="button" style={{ width:'100%', fontWeight:'bold' }} onClick={() => this.onSignUp()}>
          { this.state.loading ? <Spinner animation='border' /> : 'S I G N U P' }
        </Button>}
        { this.renderRedirect() }
      </Form>
    );
  }
}

export default SignUp;