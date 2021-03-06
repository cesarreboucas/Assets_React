import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as account from '../../api/account';
import { Alert } from 'react-bootstrap';

class ProfileMainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          username: '',
          password: '',
          new_password1: '',
          new_password2:'',
          _id:'',
          redirect: false,
          alertMessage: false,
          message:''
        };
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
          return <Redirect to='/dashboard' />
        }
        return null;
      }

    async componentDidMount(){
        const res =  await account.userInfo();
        this.setState({...res});
    }

   updateProfile = async () => {

        const res = await account.editUserInfo(this.state);

        if(res.status!==''){
            this.setState({message:res.status, alertMessage:true});
        }
        else{
            this.setState({ alertMessage: "Profile Updated!", redirect: true });
        }

    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={{
              pathname: "/assets",
              state: { message: this.state.alertMessage, date: new Date() }
            }} />;
          }

        return (
        
        <div>
            {this.state.alertMessage ?
          <Alert variant="danger" onClose={() => this.setState({ alertMessage: false })} dismissible>
            { this.state.message}
          </Alert > : ''
        }
        <div style={{width:'50vh', margin:'0 auto', paddingBottom:'5vh' }}>
            <h1>Edit Profile</h1>
            <Form className="loggedOut-tab-form" style={{borderTopLeftRadius: '5px' , borderTopRightRadius:'5px', borderTopWidth:'1px' }}>
                <Form.Group controlId="profileFirstName" style={{ textAlign: 'left' }}>
                    <Form.Label style={{color:'white'}}>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        onBlur={(event) => this.setState({ first_name: event.target.value })}
                        defaultValue={this.state.first_name}
                    />
                </Form.Group>

                <Form.Group controlId="profileLastName" style={{ textAlign: 'left' }}>
                    <Form.Label style={{color:'white'}}>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        onBlur={(event) => this.setState({ last_name: event.target.value })}
                        defaultValue={this.state.last_name}
                    />
                </Form.Group>

                <Form.Group controlId="profileEmail" style={{ textAlign: 'left' }}>
                    <Form.Label style={{color:'white'}}>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onBlur={(event) => this.setState({ username: event.target.value })}
                        defaultValue={this.state.username}
                    />
                </Form.Group>

                <Form.Group controlId="profilePassword1" style={{ textAlign: 'left' }}>
                    <Form.Label style={{color:'white'}}>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onBlur={(event) => this.setState({ new_password1: event.target.value })}
                    
                    />
                </Form.Group>


                <Form.Group controlId="profilePassword2" style={{ textAlign: 'left' }}>
                    <Form.Label style={{color:'white'}}>Re-type Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onBlur={(event) => this.setState({ new_password2: event.target.value })}
                        
                    />
                </Form.Group>
                {<Button variant="primary" className="LoginButton" type="button" style={{ width: '100%', fontWeight: 'bold' }} onClick={this.updateProfile}>
                    U P D A T E
                </Button>}    
           
            </Form>
            </div>
        </div>
        );

    }
}

export default ProfileMainPage;