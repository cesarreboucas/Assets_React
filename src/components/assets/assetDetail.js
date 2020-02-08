import React, { Component } from 'react';
import * as assetsApi from '../../api/assets.js';
import { Form, Alert } from 'react-bootstrap';
import SearchQuoteBox from './searchQuoteBox.js'


class AssetDetail extends Component {
  
  //defaultQuoteOption = {code : "", name: "" ,currency: "Default"};

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      _id: "",
      name: "",
      group_a: "",
      group_b: "",
      group_c: "",
      autorefresh: false,
      irr: 0,
      delete:false,
      deletechecker:"",
      showalert:false,
      alertMessage:"",
    };

    if (props.params.assetId !== undefined) {
      this.fetchData(props.params.assetId)
    }
  }

  togglePublicAsset = (evt) => {
    this.setState({ autorefresh: evt.target.checked });
  }


  async fetchData(id) {
    try {
      let result = await assetsApi.show(id);
      result.quoteOptions = [{code : result.code, name: result.name ,currency: "Default"}];
      this.setState(result);
      //this.setState(result);
      console.log(this.state)
    } catch (error) {
      console.log('[ERROR]', error.message);
    }
  }


  handleForm = (event) => {
    const { value, name } = event.target
    this.setState({ [name] : value}, function() {
    });
  }

  handleQuoteCode = (selected) => {
    //console.log("Call change on Detail",selected);
    this.setState({code : selected[0].code});
  }

  formSubmit = async (event) => {
    event.preventDefault();
    if(this.state._id==="") {
      let answer = await assetsApi.createAsset(this.state);
      if(answer.data.name !== undefined) { //Created
        this.setState({alertMessage : "Asset Created", showalert:true});
      }
    } else {
      console.log(this.state);
      let answer = await assetsApi.updateAsset(this.state);  
      if(answer.data.name !== undefined) { // Updated
        this.setState({alertMessage : "Asset Updated", showalert:true});
      } else if(answer.data.deleted !== undefined) { // Deleted
        this.setState({alertMessage : "Asset Deleted", showalert:true});
      }
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: "#FFFFFF" }}>
        {this.state.showalert &&
          <Alert variant="success" onClose={() => this.setState({showalert: false})} dismissible>
            {this.state.alertMessage}  
          </Alert >
        }
        <Form className="user-form" onSubmit={this.formSubmit} >
          <input type="hidden" id="txtId" name="_id" defaultValue={this.state._id} />
          <input type="hidden" id="txtIrr" name="irr" defaultValue={this.state.irr} />
          <Form.Group>
            <label htmlFor="ativo">Asset Name</label>
            <input type="input" className="form-control" id="txtName" name="name" required defaultValue={this.state.name} onChange={this.handleForm} />
          </Form.Group>
          <Form.Check>
            <input type="checkbox" className="form-check-input" id="chkMarket"
              checked={this.state.autorefresh} name="autorefresh" onChange={this.togglePublicAsset} />
            <label className="form-check-label">
              This Asset is public <i>(for Stock Market Assets)</i></label>
          </Form.Check>

          {this.state.autorefresh &&
            <SearchQuoteBox handleChange={this.handleQuoteCode} code={this.state.code} />
          }
          <div className="form-group">
            <label>Balance</label>
            <input type="number" step="0.01" className="form-control" id="txtBalance" name="balance" 
              defaultValue={this.state.balance} required onChange={this.handleForm} />
          </div>
          <Form.Group>
            <label>Unit</label>
            <input type="number" step="0.01" className="form-control" id="txtUnit" name="unit" 
              defaultValue={this.state.unit} required onChange={this.handleForm} />
          </Form.Group>
          <Form.Group>
            <label>Group</label><br />
            (A) <input type="input" className="form-control" id="txtGroupA"
                  name="group_a" defaultValue={this.state.group_a} 
                  list="dl_group_a" onChange={this.handleForm} />
            (B) <input type="input" className="form-control" id="txtGroupB"
                  name="group_b" defaultValue={this.state.group_b} 
                  list="dl_group_b" onChange={this.handleForm} />
            (C) <input type="input" className="form-control" id="txtGroupC"
                  name="group_c" defaultValue={this.state.group_c} 
                  list="dl_group_c" onChange={this.handleForm} />
          </Form.Group>
          <Form.Check>
            <input type="checkbox" className="form-check-input" id="chkDelete"
              checked={this.state.delete} name="delete" onChange={() => {this.setState({delete:!this.state.delete})}} />
            <label className="form-check-label">
              Delete this Asset</label>
          </Form.Check>
          {
            this.state.delete &&
            <Form.Group className="bg-warning" style={{padding:"5px"}}>
              <label htmlFor="ativo">Email Confirmation</label>
              <input type="input" className="form-control" id="txtDeleteChecker" name="deletechecker"
                onChange={this.handleForm} placeholder="Please fill with your email"/>
          </Form.Group>
          }
          
          <Form.Group>
            <button type="submit" id="btnmOptSubmit" className="btn btn-primary">Save changes</button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AssetDetail;