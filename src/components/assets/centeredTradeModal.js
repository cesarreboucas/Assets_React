import React from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import * as assetsApi from '../../api/assets.js';
import momentjs from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class CenteredTradeModal extends React.Component {

  formSubmit = async (evt) => {
    
    const date = this.getDate(); 
    //console.log("DEFAULT",date.format());
    date.add(date.utcOffset(),'m'); //Taking the TimeDiff Back (Vancouver -480 by default)
    //console.log("GET MINUTES BACK",date.format());
    date.utcOffset(0);//Set Today to UTC
    //console.log("BRINGING TO ZERO",date.format());

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
    try {
      await assetsApi.updateMovement(body);  
      window.location.href = "/assets";
    } catch (error) {
      console.log(body);
    }
  }

    state = {
  };

  getDate() {
    let date;
    if(this.state.date) {
      date = momentjs(this.state.date);
    } else {
      date = momentjs(this.props.movementInfo.date);
      date.subtract(date.utcOffset(),'m'); //Adding the TimeDiff back. //Vancouver = -480 or -420 on summer
    }
    return date;
  }

  render() {
    let props = this.props.movementInfo;
    let date = this.getDate();
    console.log(props);
    return (
      <Modal size="lg" show={this.props.show} 
          onHide={() => {this.setState({date:null});;this.props.onHide(props);}}  centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Trade
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.formSubmit} method="POST">
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="ativo">Asset</label>
              <input type="input" className="form-control" id="mMovCode" defaultValue={props.asset_name} name="name" disabled />
              <input type="hidden" id="mMovAssetId" name="AssetId" defaultValue={props.asset_id} />
              <input type="hidden" id="mMovMovementId" name="MovementId" defaultValue={props._id} />
            </div>
            <div className="form-group">
              <div>Date</div>
              <DatePicker className="form-control" 
                selected={date.toDate()} 
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
          <button type="button" className="btn btn-primary" onClick={() => {this.props.onHide(props)}}>Close</button>
          <button type="button" id="btnopcoessubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default CenteredTradeModal;