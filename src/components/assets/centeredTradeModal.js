import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CenteredTradeModal extends React.Component {
  render() {
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
              <label htmlFor="ativo">Ativo</label>
              <input type="input" className="form-control" id="txtativo" name="ativo" disabled />
              <input type="hidden" id="txtid" name="id" />
            </div>
            <div className="form-group">
              <label htmlFor="date">Data</label>
              <input type="date" className="form-control" id="txtdate" name="date" placeholder="Data do evento" required />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade</label>
              <input type="number" className="form-control" id="txtquantidade" name="quantidade" placeholder="Quantidade" required />
            </div>
            <div className="form-group">
              <label htmlFor="valor">Valor Total da Operacao</label>
              <input type="number" className="form-control" id="txtvalor" name="valor" placeholder="Total Investido" required />
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Tipo de Operacao</label>
              <select name="tipo" id="seltipo" className="custom-select">
                  <option value="c" selected >Compra</option>
                  <option value="v">Venda</option>
                  <option value="d">Dividendo</option>
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