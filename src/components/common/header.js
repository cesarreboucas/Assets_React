import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faUserCircle,faChartPie,faChartBar,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import * as account from '../../api/account';
import Carousel from '../common/carousel';




class Header extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  onLogOut() {
    try {
      account.logOut();
      this.setState({ redirect: true });
    } catch (error) {
      console.log('[ERROR]', error.message);
    }
  }

  redirectToLoggedOut = () => {
    if(this.state.redirect) {
      return <Redirect to='/' />
    }
    return null;
  }

  render() {
     
    let optionsBar, loginIcon;

    //Hide the Header Menu List in the Login Page
    const style = window.location.pathname ==='/' ? {display:'none'} :{};
    
    optionsBar = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link active" id="pills-home-tab" href="/dashboard" role="tab"><FontAwesomeIcon icon={faHome} /> Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" id="pills-profile-tab" href="/assets" role="tab"><FontAwesomeIcon icon={faChartPie} /> Assets</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" id="pills-contact-tab" href="/goals" role="tab"><FontAwesomeIcon icon={faChartBar} /> Goals</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" id="pills-home-tab" href="/profile" role="tab"><FontAwesomeIcon icon={faUserCircle} /> Profile</a>
        </li>
      </ul>
    );
    loginIcon = <a className="nav-link" href="/" onClick={() => this.onLogOut()} id="pills-contact-tab" role="tab"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</a>

    return (
      <React.Fragment>
        
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={style}>
         { this.redirectToLoggedOut() }
        <a className="navbar-brand" href="/dashboard" style={{"marginLeft":"10%"}}>
            <img src="/images/assets.svg" alt="logo" style={{width: "64px" ,height:"64px"}} />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            {optionsBar}
            <span className="navbar-text">
                {loginIcon}
            </span>
        </div>
      </nav>
      <div >
      <Carousel/>
      </div>
    
      </React.Fragment>
    )
  }
}

export default Header;