import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as assetsApi from '../../api/assets.js';
import momentjs from 'moment';
import "react-datepicker/dist/react-datepicker.css";

class CenteredTradeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: null, //Indicates POST PUT or Null (to be set)
      alertMessage:false,
      shouldRefreshParent: false
    };
  }

  componentDidUpdate() {
    //console.log("DID UPDATE CALLED Entrou na decisao->", (this.state.operation === null && this.props.show));
    if (this.state.operation === null && this.props.show) {
      //console.log("Movement no Modal", this.props.movementInfo);
      if (this.props.movementInfo._id !== undefined) { //Asset Change Asset
        this.setState({
          asset: this.props.movementInfo.asset_id,
          movement: this.props.movementInfo._id,
          date: new Date(this.props.movementInfo.date),
          kind: this.props.movementInfo.kind,
          comment: '',
          value: this.props.movementInfo.value,
          quantity: null,
          delete:false,
          operation: 'PUT'
        });
      } else {
        let date = momentjs(new Date());
        date.startOf('d');
        this.setState({
          asset: this.props.movementInfo.asset_id,
          movement: '',
          date: date.toDate(),
          kind: 'dividend',
          comment: '',
          value: '',
          quantity: 0,
          delete:false,
          operation: 'POST'
        });
      }
    }
  }

  hideModal = () => {
    this.props.onHide({});
    this.setState({ operation: null, alertMessage:false, shouldRefreshParent:false });
    //console.log("MODAL CLOSED -> OP: ", this.state.operation)
  }

  formSubmit = async () => {
    console.log(this.state)
    try {
      if (this.state.operation === 'POST') {
        await assetsApi.createMovement(this.state);
      } else {
        await assetsApi.updateMovement(this.state);
      }
      if(this.state.delete) {
        this.setState({ alertMessage: "Movement Deleted", shouldRefreshParent:true });
      } else {
        this.setState({ alertMessage: "Movement Stored", shouldRefreshParent:true });
      }

    } catch (error) {
      this.setState({ alertMessage: "Ops, An error has ocurred" });
      console.log(error);
    }
  }

  render() {
    return (
      this.state.operation !== null && this.props.movementInfo !== undefined &&
      <Modal size="lg" show={this.props.show} onHide={this.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.state.operation === 'PUT' ? 'Edit' : 'Add'} Trade
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.alertMessage?
            <Alert variant="success" onClose={() => this.setState({ alertMessage: false })} dismissible>
              {this.state.alertMessage}
            </Alert > : ''
          }
          <div className="form-group">
            <label htmlFor="ativo">Asset</label>
            <input type="input" className="form-control" defaultValue={this.props.movementInfo.asset_name} name="name" disabled />
          </div>
          <div className="form-group">
            <div>Date</div>
            <DatePicker className="form-control"
              selected={this.state.date}
              onChange={(date) => { this.setState({ date: date }) }}
              dateFormat="MMMM d, yyyy" />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Operation's Value </label>
            <input type="number" className="form-control" name="mMovValue" placeholder="Total Value" style={{ textAlign: 'right' }} required
              defaultValue={this.state.value} onBlur={(e) => { this.setState({ value: e.target.value }) }} />
          </div>
          <div className="form-group">
            <label htmlFor="mMovSelKind">Operation Type</label>
            <select name="mMovSelKind" className="custom-select" defaultValue={this.state.kind}
              onChange={(e) => this.setState({ kind: e.target.value })}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="dividend">Dividend</option>
            </select>
          </div>
          {
            (this.state.operation === 'POST' && (this.state.kind === 'buy' || this.state.kind === 'sell')) ?
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" className="form-control" name="quantity" style={{ textAlign: 'right' }} placeholder="Quantity Negotiated"
                  onBlur={(e) => this.setState({ quantity: e.target.value })} />
              </div> :
              ''
          }
          {
            (this.state.operation==='PUT'
            ?
            <div className={"form-check" + (this.state.delete?' bg-warning':'')} style={{borderRadius:"4px"}}>
              <input type="checkbox" className="form-check-input"
                checked={this.state.delete} name="delete" onChange={() => { this.setState({ delete: !this.state.delete }) }} />
              <label className="form-check-label">
                Delete this Trade</label>
            </div>
            : ''
            )
          }
          
        </Modal.Body>
        <Modal.Footer>
          {
            this.state.shouldRefreshParent?
              <button type="button" className="btn btn-secondary" onClick={() => {window.location.reload()}}>Close</button>
            :
            <button type="button" className="btn btn-secondary" onClick={this.hideModal}>Close</button>
          }
          
          <button type="button" onClick={this.formSubmit} id="btnopcoessubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CenteredTradeModal;