import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CenteredTradeModal extends React.Component {
  render() {
    const formInfo = this.props.movementInfo.asset_info?this.props.movementInfo:null;
    let date;
    if(formInfo) {
      let dateObj = new Date(formInfo.movement.date);
      date = dateObj.getUTCFullYear()+"-"+(String("0")+(Number(dateObj.getUTCMonth()+1))).substr(-2)
        +"-"+(String("0")+(Number(dateObj.getUTCDate()))).substr(-2)
    }
    console.log(formInfo);
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}  centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Trade
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="user-form" action="/ativos/newtrade" method="POST" id="formNewTrade" encType="application/x-www-form-urlencoded">
            <div className="form-group">
              <label htmlFor="ativo">Asset</label>
              <input type="input" className="form-control" id="mMovCode" defaultValue={formInfo?formInfo.asset_info.code:''} name="code" disabled />
              <input type="hidden" id="mMovAssetId" name="AssetId" defaultValue={formInfo?formInfo.asset_info.code:''} />
              <input type="hidden" id="mMovMovementId" name="MovementId" defaultValue={formInfo?formInfo.movement._id:''} />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" className="form-control" id="mMovDate" name="date" 
                defaultValue={formInfo?date:''} required />
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
              <input type="number" className="form-control" id="mMovValue" name="mMovValue" defaultValue={formInfo?formInfo.movement.value:''}  placeholder="Total Value" required />
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Tipo de Operacao</label>
              <select name="tipo" id="seltipo" className="custom-select" defaultValue={formInfo?formInfo.movement.kind:''}>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="dividend">Dividend</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <button type="submit" id="btnopcoessubmit" className="btn btn-primary">Save changes</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CenteredTradeModal;