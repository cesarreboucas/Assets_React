import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="row text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Home</a></li>
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Sobre</a></li>
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> FAQ</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Mapa</a></li>
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> B3</a></li>
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Contato</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            <h5>Parceiros</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Inscreva-se</a></li>
              
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul className="list-unstyled list-inline social text-center">
              <li className="list-inline-item"><a href="/"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></li>
              <li className="list-inline-item"><a href="/"><FontAwesomeIcon icon={faTwitter} size="2x" /></a></li>
              <li className="list-inline-item"><a href="/"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
              <li className="list-inline-item"><a href="/" target="_blank"><FontAwesomeIcon icon={faEnvelope} size="2x" /></a></li>
            </ul>
          </div>
        </div>	
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p><u><a href="/">Assets Control</a></u> Vancouver, BC, Canada.</p>
            <p className="h6">{String.fromCharCode(169)} All right Reversed - Marcos Marangoni & Cesar Oliveira</p>
          </div>
        </div>
      </div>  
    );
  }
}

export default Footer;