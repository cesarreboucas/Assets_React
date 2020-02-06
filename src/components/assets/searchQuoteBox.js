import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, Col } from 'react-bootstrap';
import * as assetsApi from '../../api/assets.js';

export default class SeachQuoteBox extends Component {
  
  defaultQuoteOption = {code : "", name: "" ,currency: "Default"};
  constructor(props) {
    super(props);
    this.defaultQuoteOption.code = props.code
    this.state = {
      openBox: false,
      selectedOption: [],
      quoteOptions : [this.defaultQuoteOption],
      isLoadingQuotes:false
    }
  }

  searchAlphaAPi = async (evt) => {
    //console.log(this.searchTicker.getInput().value);
    this.setState({isLoadingQuotes:true});
    try {
      const results = await assetsApi.getQueryQuote(this.searchTicker.getInput().value);
      
      if(results.data[0]===undefined) { // For empty results
        results.data = [this.defaultQuoteOption];
      }
      this.setState({ openBox: true, quoteOptions: results.data, })
    } catch (error) {
      console.log(error);
    }
  }

  onSelectedOption = (selected) => {
    console.log('[QUOTE SELECTED]', selected);
    if(selected.length === 0) {
      //Cleaning the code (Empty box)
      selected = [ {code:''} ];
      this.setState({ openBox: false, quoteOptions: [this.defaultQuoteOption] });  //Allows to search again
    } else {
      this.setState({ openBox: false, code: selected[0].code });
    }
    this.props.handleChange(selected)
    
  }

  render() {
    return (
      <Form.Row>
        <Col xs={10}>
          <label htmlFor="ativo">Stock Market Code (Ticker)</label>
          <Typeahead id="searchTicker"
            labelKey={(option) => `${option.code} ${option.name} (${option.currency})`}
            multiple={false}
            defaultSelected={[this.state.quoteOptions[0]]}
            ref={(typeahead) => this.searchTicker = typeahead} //the actually input ref
            open={this.state.openBox} // the div box
            isLoading={this.state.isLoadingQuotes} //isLoading box
            selectHintOnEnter={true} //select using enter
            onChange={this.onSelectedOption}
            options={this.state.quoteOptions} //the pool of options
            placeholder="Enter the Ticker or Name..."
          />
        </Col>
        <Col xs={2} style={{ display: 'flex' }}>
          <button type="button"
            onClick={this.searchAlphaAPi}
            className="btn btn-primary" style={{ alignSelf: 'flex-end' }} id="searchBotton">Search
                </button>
        </Col>
      </Form.Row>
    )
  }
}