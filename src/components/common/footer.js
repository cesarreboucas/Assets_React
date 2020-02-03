import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

class Footer extends React.Component {
  render() {
    return(
      <Container>
        <Row 
          className="text-center text-xs-center text-sm-left text-md-left"
          style={{paddingLeft:'15%'}}>
          <Col xs={4}>
            <h5>Markets</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="http://www.b3.com.br/pt_br/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAngleDoubleRight} /> Bovespa</a></li>
              <li><a href="https://www.nasdaq.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAngleDoubleRight} /> Nasdaq</a></li>
              <li><a href="https://www.nyse.com/index" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAngleDoubleRight} /> NYSE</a></li>
              <li><a href="https://www.tsx.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAngleDoubleRight} /> TSX</a></li>
            </ul>
          </Col>
          <Col xs={4}>
            <h5>Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Mapa</a></li>
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> B3</a></li>
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Contato</a></li>
            </ul>
          </Col>
          <Col xs={4}>
            <h5>Parceiros</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/"><FontAwesomeIcon icon={faAngleDoubleRight} /> Inscreva-se</a></li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className={"text-center text-white"}>
            <p><u><a href="/">Assets Control</a></u> Vancouver, BC, Canada.</p>
            <p className="h6">{String.fromCharCode(169)} All rights reserved - Marcos Marangoni, Cesar Oliveira, Andre Sa</p>
          </Col>
        </Row>
      </Container>
   
    );
  }
}

export default Footer;