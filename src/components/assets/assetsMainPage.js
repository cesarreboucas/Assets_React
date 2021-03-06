import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import TradeTable from './tradeTable.js';
import { Alert } from 'react-bootstrap';
import CenteredTradeModal from './centeredTradeModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import * as assetsApi from '../../api/assets.js';

const defaultCollumStyle = () => {
  return {
    color: '#dddddd'
  }
}

class AssetsMainPage extends Component {

  state = {
    loading: true,
    assets: [],
    asset_total: null,
    showModalTrade: false,
    movement_info: {},
    alertMessage: ( // If there is a message and is not older than 7 seconds
      (this.props.location.state &&
        ((new Date()).getTime() - this.props.location.state.date.getTime()) < 7000) ?
        this.props.location.state.message :
        false
    ),
    showalert: false,
    movementsDetail: false,
    assetDetails: false,
    assetId: '',
  };

  toggleModalTrade = (movement) => {
    console.log("Movement no Parent", movement);
    this.setState({ movement_info: movement, showModalTrade: !this.state.showModalTrade });
  }

  expandRow = {
    renderer: row => (
      <TradeTable movements={row.movements} asset={{ id: row._id, name: row.name }} toggleModalTrade={this.toggleModalTrade} />
    ), showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      return (isAnyExpands ? <FontAwesomeIcon icon={faAngleDoubleDown} /> : <FontAwesomeIcon icon={faAngleDoubleRight} />)
    },
    expandColumnRenderer: ({ expanded }) => {
      return (expanded ? <FontAwesomeIcon icon={faAngleDoubleDown} /> : <FontAwesomeIcon icon={faAngleDoubleRight} />)
    }
  };

  tableColumns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell, row) => { return (<a style={{ color: "white" }} href={'/assets/' + row._id}>{cell}</a>); },
      style: defaultCollumStyle,
      footer: '',
    }, {
      dataField: 'balance',
      text: 'Balance',
      align: 'right',
      headerAlign: 'right',
      style: defaultCollumStyle,
      footer: '',
    }, {
      dataField: 'unit',
      text: 'Unit',
      formatter: (cell) => { return `$ ${cell.toFixed(2)}`; },
      align: 'right',
      headerAlign: 'right',
      style: defaultCollumStyle,
      footer: "",
    }, {
      dataField: 'total',
      text: 'Total',
      align: 'right',
      headerAlign: 'right',
      formatter: (cell, row) => { return `$ ${(row.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`; },
      style: defaultCollumStyle,
      footer: this.state.asset_total ? this.state.asset_total.total : 'b',
      footerAlign: 'right',
    }, {
      dataField: 'irr',
      text: 'Return',
      align: 'right',
      headerAlign: 'right',
      formatter: (cell) => { return `${(cell * 100).toFixed(2)}%`; },
      style: defaultCollumStyle,
      footer: "123",
      footerAlign: 'right',
    }, {
      dataField: 'options',
      text: 'Options',
      align: 'center',
      headerAlign: 'center',
      style: defaultCollumStyle,
      footer: "",
      formatter: (cell, row) => {
        return (
          <span>
            <button className="btn btn-sm btn-light" onClick={() => this.setState({ assetDetails: true, assetId: row._id })}>Options</button>&nbsp;
            <button className="btn btn-sm btn-light"
              onClick={() => this.toggleModalTrade({ asset_id: row._id, asset_name: row.name })}>Add Trade</button>
          </span>);
      },
    }
  ];

  async componentDidMount() {
    try {
      const axios = await assetsApi.list(1);
      console.log(axios);
      this.tableColumns[3].footer = `$ ${(axios.asset_total.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      this.tableColumns[4].footer = `${(axios.asset_total.irr * 100).toFixed(2)}%`;
      this.setState({
        asset_total: axios.asset_total,
        loading: false,
        assets: axios.assets
      });
      //this.fillDatalists();
    } catch (error) {

    }
  }

  render() {
    return (
      <div>
        {this.redirectToMovementsDetail()}
        {this.redirectToAssetDetails()}
        {this.state.alertMessage ?
          <Alert variant="success" onClose={() => this.setState({ alertMessage: false })} dismissible>
            {this.props.location.state.message}
          </Alert > : ''
        }
        <h1>Assets List</h1>
        <div className="container">
          {this.state.loading ? '' :
            <BootstrapTable keyField='id' classes="table table-dark" data={this.state.assets} columns={this.tableColumns}
              bordered={false} expandRow={this.expandRow} />}

          <div className="text-right" style={{ padding: "0px 20px 20px 0px" }}>
            <a className="btn btn-sm btn-light" role="button" href="/assets/create">New Asset</a>
          </div>
        </div>
        <CenteredTradeModal show={this.state.showModalTrade} onHide={this.toggleModalTrade} movementInfo={this.state.movement_info} />
      </div>
    );
  }

  redirectToAssetDetails = () => {
    if (this.state.assetDetails) {
      return (
        <Redirect push to={`/assets/${this.state.assetId}`} />
      )
    }
    return null;
  }

  redirectToMovementsDetail = () => {
    if (this.state.movementsDetail) {
      return (
        <Redirect push to={`/assets/movement/${this.state.assetId}`} />
      )
    }
    return null;
  }
}

export default AssetsMainPage;