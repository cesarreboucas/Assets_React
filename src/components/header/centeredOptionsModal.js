import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CenteredOptionsModal extends React.Component {
  render() {
    return(
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}  centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Ativo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="user-form" action="/ativos/edit" method="POST" id="formEditAtivo" encType="application/x-www-form-urlencoded">
            <div className="form-group">
                <label htmlFor="ativo">Ativo</label>
                <input type="input" className="form-control" id="f2txtativo" name="ativo" required />
                <input type="hidden" id="f2txtid" name="id" />
                <input type="hidden" id="f2txtguess" name="guess" />
            </div>
            <div className="form-group">
                <label htmlFor="quantidade">Saldo Atual</label>
                <input type="number" className="form-control" id="f2txtsaldo" name="saldo" required />
            </div>
            <div className="form-group">
                <label htmlFor="valor">Unit&aacute;rio</label>
                <input type="number" className="form-control" id="f2txtunitario" name="unitario"  required />
            </div>
            <div className="form-group">
                <label>Classifica&ccedil;&atilde;o</label><br />
                (1) <input type="input" className="form-control" id="f2txtclass01" name="class_1" list="dl_class1" />
                (2) <input type="input" className="form-control" id="f2txtclass02" name="class_2" list="dl_class2" />
                (3) <input type="input" className="form-control" id="f2txtclass03" name="class_3" list="dl_class3" />
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

export default CenteredOptionsModal;