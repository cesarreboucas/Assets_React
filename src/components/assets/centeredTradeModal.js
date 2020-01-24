import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CenteredTradeModal extends React.Component {

  formSubmit = async (evt) => {
    let body = {
      //"date":document.getElementById("mMovDate").value,
    };
    console.log(this.formInfo);
    evt.preventDefault();
    //await assetsApi.updateAsset(body);
    //window.location.href = "/assets";
  }

  state = {
    date: new Date(),
    kind: 'buy',
    value: 0,
    comment: '',
    _id: '',
    asset_id: '',
    asset_code: ''
  };

  render() {
    console.log("STATE",this.state);
    return (
      <Modal size="lg" show={this.props.show} onEnter={() => {this.setState(this.props.movementInfo)}} onHide={this.props.onHide}  centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Trade
          </Modal.Title>
        </Modal.Header>
        <form className="user-form" onSubmit={this.formSubmit}>
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="ativo">Asset</label>
              <input type="input" className="form-control" id="mMovCode" defaultValue={this.state.asset_code} name="code" disabled />
              <input type="hidden" id="mMovAssetId" name="AssetId" defaultValue={this.state.asset_id} />
              <input type="input" id="mMovMovementId" name="MovementId" defaultValue={this.state._id} />
            </div>
            <div className="form-group">
              <div>Date</div>
              <DatePicker className="form-control" selected={new Date(this.state.date)}
                onChange={(date) => { this.setState({date: date}) }} 
                dateFormat="MMMM d, yyyy" />
            </div>
            {/*
            //Put it back on add with IF
            <div className="form-group">
              <label htmlFor="quantidade">Quantity</label>
              <input type="number" className="form-control" id="mMovQuantity" name="quantity" placeholder="Quantity Negotiated" />
            </div>
            */}
            <div className="form-group">
              <label htmlFor="valor">Operation's Value </label>
              <input type="number" className="form-control" id="mMovValue" name="mMovValue" defaultValue={this.state.value}  placeholder="Total Value" required />
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Tipo de Operacao</label>
              <select name="tipo" id="seltipo" className="custom-select" defaultValue={this.state.kind}>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="dividend">Dividend</option>
              </select>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <button type="submit" id="btnopcoessubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default CenteredTradeModal;