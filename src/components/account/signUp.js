import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import * as account from '../../api/account';

/**
 * CSS
 */
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      remember: false,
      redirect: false,
    };
  }

  componentDidMount() {

  }

  async onSignUp() {
    const { firstName, lastName, username, password } = this.state;
    try {
      const token = await account.signUp(firstName, lastName, username, password);
      console.log('[TOKEN]', token);
      this.setState({ redirect: true });
    } catch(error) {
      console.log(error);
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
      <Form style={{ flex: 1, width:'30vw', margin: 30 }}>
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
        <Form.Group controlId="signUpRemember" style={{ alignItems:'center', fontSize:'15px' }}>
          <Form.Check type="checkbox" label="Check me out" onChange={(event) => this.setState({ remember: event.target.value })} />
        </Form.Group>
        <Button variant="primary" type="button" style={{ width:'100%', fontWeight:'bold' }} onClick={() => this.onSignUp()}>
          S U B M I T
        </Button>
        { this.renderRedirect() }
      </Form>
    );
  }
}

export default SignUp;