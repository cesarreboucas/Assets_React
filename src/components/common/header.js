import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faUserCircle,faChartPie,faChartBar,faUser } from '@fortawesome/free-solid-svg-icons'



class Header extends React.Component{
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/" style={{"marginLeft":"10%"}}>
            <img src="/images/assets.svg" alt="logo" style={{width: "64px" ,height:"64px"}} />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" href="/" role="tab"><FontAwesomeIcon icon={faHome} /> Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-home-tab" href="/profile" role="tab"><FontAwesomeIcon icon={faUserCircle} /> Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-profile-tab" href="/ativos" role="tab"><FontAwesomeIcon icon={faChartPie} /> Assets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-contact-tab" href="/goals" role="tab"><FontAwesomeIcon icon={faChartBar} /> Goals</a>
                </li>
            </ul>
            <span className="navbar-text">
                <a className="nav-link" id="pills-contact-tab" href="/" role="tab" onClick={() => this.onLogOut()}><FontAwesomeIcon icon={faUser} /> Logout</a>
            </span>
        </div>
      </nav>
    );
  }
}

export default Header;