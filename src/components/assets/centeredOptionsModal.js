import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as assetsApi from '../../api/assets.js';


class CenteredOptionsModal extends React.Component {

  

  componentDidUMount() {
  }

  

  handleForm = (evt) => {
    //Validations to be Done HERE!
  }

  formSubmit = async (evt) => {
    let body = {
      asset: document.getElementById("mOptId").value,
      code: document.getElementById("mOptCode").value,
      group_a: document.getElementById("mOptGroupA").value,
      group_b: document.getElementById("mOptGroupB").value,
      group_c: document.getElementById("mOptGroupC").value,
      unit: Number(document.getElementById("mOptUnit").value),
      balance: Number(document.getElementById("mOptBalance").value),
      autorefresh: false
    };
    
    evt.preventDefault();
    await assetsApi.updateAsset(body);
    window.location.href = "/assets";
  }

  render() {
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}
        onEnter={() => this.fetchData(this.props.assetId)} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Asset
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <button type="submit" id="btnmOptSubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
        
      </Modal>
    );
  }
}

export default CenteredOptionsModal;