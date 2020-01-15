import React from 'react';
import ls from 'local-storage';

class Login extends React.Component {
    render() {
        return(<div>
            <h1>Login Page</h1>
            <p style={{textAlign:'center'}}>
                <a className="btn btn-primary" role="button" href="/dashboard" onClick={() => {ls('user-token','AAAAAAAA'); }}>Automatic Login!</a>
            </p>
            <p style={{textAlign:'center'}}>
                <a className="btn btn-primary" role="button" href="/signup">Sign UP!</a>
            </p>
        </div>);
    }
}

export default Login;