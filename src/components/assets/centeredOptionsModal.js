import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class CenteredOptionsModal extends React.Component {
  
  state = {
    codigo: "",
    _id : ""
  };

  componentDidUpdate() {   
    if(this.props.assetId!==null && this.props.assetId!==this.state._id){
      fetch(process.env.REACT_APP_API_ADDRESS+"/assets/"+this.props.assetId, {headers: {'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(result => {
        this.setState(result);
      });
    }
  }

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
                <input type="input" className="form-control" id="mOptCode" name="code" required defaultValue={this.state.code} />
                <input type="hidden" id="mOpt_id" name="_id" defaultValue={this.state._id} />
                <input type="hidden" id="mOptIrr" name="irr" defaultValue={this.state.irr} />
            </div>
            <div className="form-group">
                <label htmlFor="quantidade">Saldo Atual</label>
                <input type="number" className="form-control" id="mOptBalance" name="balance" defaultValue={this.state.balance} required />
            </div>
            <div className="form-group">
                <label htmlFor="valor">Unit&aacute;rio</label>
                <input type="number" className="form-control" id="mOptUnit" name="unit" defaultValue={this.state.unit}  required />
            </div>
            <div className="form-group">
                <label>Classifica&ccedil;&atilde;o</label><br />
                (1) <input type="input" className="form-control" id="mOptGroupA" 
                      name="group_a" defaultValue={this.state.group?this.state.group.group_c:''} list="dl_group_a" />
                (2) <input type="input" className="form-control" id="mOptGroupB" 
                      name="group_b" defaultValue={this.state.group?this.state.group.group_b:''} list="dl_group_b" />
                (3) <input type="input" className="form-control" id="mOptGroupC" 
                      name="group_c" defaultValue={this.state.group?this.state.group.group_c:''} list="dl_group_c" />
            </div>
            <datalist id="dl_group_a"></datalist>
            <datalist id="dl_group_b"></datalist>
            <datalist id="dl_group_c"></datalist>
          </form>
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