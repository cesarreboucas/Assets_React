import React from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import * as assetsApi from '../../api/assets.js';
import momentjs from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class CenteredTradeModal extends React.Component {

  formSubmit = async (evt) => {
    const dateObj = this.state.date?this.state.date:new Date(this.props.movementInfo.date);
    const date = momentjs(dateObj); 
    //console.log("DEFAULT",date.format());
    date.utcOffset(0);//Set Today to UTC
    //console.log("BRINGING TO ZERO",date.format());
    date.hour(0); // Set time to 0:00:00
    //console.log("SET MIDNIGHT",date.format());

    let body = {
      'asset':this.props.movementInfo.asset_id,
      'date':date.format(),
      'kind':document.getElementById("mMovSelKind").value,
      'comment':'no comments',
      'value':Number(document.getElementById("mMovValue").value),
      'balance': 0,
      'movement':this.props.movementInfo._id,
      
    };
    console.log(body);
    evt.preventDefault();
    await assetsApi.updateMovement(body);
    window.location.href = "/assets";
  }

    state = {
  };

  render() {
    let props = this.props.movementInfo;
    let date;
    if(this.state.date) {
      date = momentjs(this.state.date);
    } else {
      date = momentjs(new Date(props.date));
    }
    date.utcOffset(0);//Set Today to UTC
    date.hour(0); // Set time to 0:00:00

    return (
      <Modal size="lg" show={this.props.show} onHide={() => {this.props.onHide(props)}}  centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Trade
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.formSubmit} method="POST">
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="ativo">Asset</label>
              <input type="input" className="form-control" id="mMovCode" defaultValue={props.asset_code} name="code" disabled />
              <input type="hidden" id="mMovAssetId" name="AssetId" defaultValue={props.asset_id} />
              <input type="hidden" id="mMovMovementId" name="MovementId" defaultValue={props._id} />
            </div>
            <div className="form-group">
              <div>Date</div>
              <DatePicker className="form-control" 
                selected={new Date(date.year(),date.month(),date.date(),0,0,0,0)} //Needed to bypass timezone
                onChange={(date) => { this.setState({date: date}) }} 
                dateFormat="MMMM d, yyyy" /> <span>{date.format()}</span>
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
              <input type="number" className="form-control" id="mMovValue" name="mMovValue" defaultValue={props.value}  placeholder="Total Value" required />
            </div>
            <div className="form-group">
              <label htmlFor="mMovSelKind">Tipo de Operacao</label>
              <select name="mMovSelKind" id="mMovSelKind" className="custom-select" defaultValue={props.kind}>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="dividend">Dividend</option>
              </select>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type='submit' onClick={() => {this.props.onHide(props)}}>Close</button>
          <button id="btnopcoessubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default CenteredTradeModal;