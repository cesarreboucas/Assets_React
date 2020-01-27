import React, { Component } from 'react';
import * as assetsApi from '../../api/assets.js';
import { Form, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

class AssetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      _id: "",
      autorefresh: false,
      irr: 0,
      /*Ticker*/
      openBox: false,
      selectedOption: []
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
      const result = await assetsApi.show(id);
      this.setState(result);
      console.log(this.state)
    } catch (error) {
      console.log('[ERROR]', error.message);
    }
  }

  searchAlphaAPi = (evt) => {
    console.log(this.searchTicker.getInput().value);
    this.setState({ openBox: true })
    evt.preventDefault();
  }

  formSubmit = (event) => {
    console.log(event);
  }

  onSelectedOption = (selected) => {
    console.log('[SELECTED]', selected);
    this.setState({ openBox: false, selectedOption: selected });
  }

  //a = useParams();
  render() {
    return (
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <Form className="user-form" onSubmit={this.formSubmit} >
          <input type="hidden" id="mOptId" name="_id" defaultValue={this.state._id} />
          <input type="hidden" id="mOptIrr" name="irr" defaultValue={this.state.irr} />
          <Form.Group>
            <label htmlFor="ativo">Asset Name</label>
            <input type="input" className="form-control" id="mOptName" name="name" required defaultValue={this.state.name} onChange={this.handleForm} />
          </Form.Group>
          <Form.Check>
            <input type="checkbox" className="form-check-input" id="exampleCheck1"
              defaultChecked={this.state.autorefresh} onChange={this.togglePublicAsset} />
            <label className="form-check-label" forhtml="exampleCheck1">
              This Asset is public <i>(for Stock Market Assets)</i></label>
          </Form.Check>

          {this.state.autorefresh &&
            <Form.Row>
              <Col xs={10}>
                <label htmlFor="ativo">Stock Market Code (Ticker)</label>
                <Typeahead id="searchTicker"
                  ref={(typeahead) => this.searchTicker = typeahead}
                  open={this.state.openBox}
                  selectHintOnEnter={true}
                  onChange={this.onSelectedOption}
                  selected={this.state.selectedOption}
                  options={[
                    { id: "1", label: 'John' },
                    { id: "2", label: 'Miles' },
                    { id: "3", label: 'Charles' },
                    { id: "4", label: 'Herbie' },
                  ]}
                  placeholder="Choose a state..."
                />
              </Col>
              <Col xs={2} style={{ display:'flex' }}>
                <button 
                onClick={this.searchAlphaAPi} 
                className="btn btn-primary" 
                style={{ alignSelf: 'flex-end' }} 
                id="searchBotton">
                  Search
                </button>
              </Col>
            </Form.Row>
          }
          <div className="form-group">
            <label htmlFor="quantidade">Balance</label>
            <input type="number" step="0.01" className="form-control" id="mOptBalance" name="balance" defaultValue={this.state.balance} required />
          </div>
          <Form.Group>
            <label htmlFor="valor">Unit</label>
            <input type="number" step="0.01" className="form-control" id="mOptUnit" name="unit" defaultValue={this.state.unit} required />
          </Form.Group>
          <Form.Group>
            <label>Group</label><br />
            (A) <input type="input" className="form-control" id="mOptGroupA"
              name="group_a" defaultValue={this.state.group ? this.state.group.group_a : ''} list="dl_group_a" />
            (B) <input type="input" className="form-control" id="mOptGroupB"
              name="group_b" defaultValue={this.state.group ? this.state.group.group_b : ''} list="dl_group_b" />
            (C) <input type="input" className="form-control" id="mOptGroupC"
              name="group_c" defaultValue={this.state.group ? this.state.group.group_c : ''} list="dl_group_c" />
          </Form.Group>
          <Form.Group>
            <button type="submit" id="btnmOptSubmit" className="btn btn-primary">Save changes</button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default AssetDetail;