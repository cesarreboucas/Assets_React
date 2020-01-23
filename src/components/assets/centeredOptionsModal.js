import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as assetsApi from '../../api/assets.js';


class CenteredOptionsModal extends React.Component {

  state = {
    codigo: "",
    _id: ""
  };

  componentDidUMount() {

    /*
    if(this.props.assetId!==null && this.props.assetId!==this.state._id){
      fetch(process.env.REACT_APP_API_ADDRESS+"/assets/"+this.props.assetId, {headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(result => {
        this.setState(result);
      });
    }*/
  }

  async fetchData() {
    try {

      /*if(this.props.assetId!==null && this.props.assetId!==this.state._id){
      }*/
      const result = await assetsApi.show(this.props.assetId);
      this.setState(result);
    } catch (error) {
      console.log('[ERROR]', error.message);
    }
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
        <form className="user-form" onSubmit={this.formSubmit} >
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="ativo">Asset</label>
              <input type="input" className="form-control" id="mOptCode" name="code" required defaultValue={this.state.code} onChange={this.handleForm} />
              <input type="hidden" id="mOptId" name="_id" defaultValue={this.state._id} />
              <input type="hidden" id="mOptIrr" name="irr" defaultValue={this.state.irr} />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade">Balance</label>
              <input type="number" step="0.01" className="form-control" id="mOptBalance" name="balance" defaultValue={this.state.balance} required />
            </div>
            <div className="form-group">
              <label htmlFor="valor">Unit</label>
              <input type="number" step="0.01" className="form-control" id="mOptUnit" name="unit" defaultValue={this.state.unit} required />
            </div>
            <div className="form-group">
              <label>Group</label><br />
              (A) <input type="input" className="form-control" id="mOptGroupA"
                name="group_a" defaultValue={this.state.group ? this.state.group.group_a : ''} list="dl_group_a" />
              (B) <input type="input" className="form-control" id="mOptGroupB"
                name="group_b" defaultValue={this.state.group ? this.state.group.group_b : ''} list="dl_group_b" />
              (C) <input type="input" className="form-control" id="mOptGroupC"
                name="group_c" defaultValue={this.state.group ? this.state.group.group_c : ''} list="dl_group_c" />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <button type="submit" id="btnmOptSubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default CenteredOptionsModal;