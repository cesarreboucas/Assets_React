import React, { Component } from 'react';
import { Form, Button, Row, Col, Container, Alert, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import * as account from '../../api/account';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordRepeat: '',
      redirectToLogin: false,
      variant: 'success',
      showAlert: false,
      message: '',
      loading: false,
    };
    this.queries = null;
  }

  componentDidMount() { 
    const { search } = this.props.location;
    this.queries = qs.parse(search.substring(1, search.length));
  }

  async onResetPassword() {
    try {
      const { password, passwordRepeat } = this.state;
      this.setState({ loading: true });
      if(password === passwordRepeat) {
        await account.resetPassword(this.queries.username, this.state.password, this.queries.token);
        this.setState({ redirectToAssets: true, showAlert: true, variant: 'success'
        , message: 'Your password has been successfuly reseted', loading: false });
      } else {
        throw new Error('Passwords doesnt match');
      }
    } catch (error) {
      console.log(error);
      this.setState({ password: '', passwordRepeat: '', showAlert: true, 
      variant: 'danger', message: error.message, loading: false });
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
      <Container style={{ paddingTop:'10vh' }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form className="resetPassword-form">
              <Form.Row>
                <Alert variant={this.state.variant} show={this.state.showAlert}>
                  {this.state.message}
                </Alert>
              </Form.Row>
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
              { this.state.loading ? <Spinner animation="border" /> : 'RESET PASSWORD'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ForgotPassword;