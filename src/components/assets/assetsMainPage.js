import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import TradeTable from './tradeTable.js';
import CenteredOptionsModal from './centeredOptionsModal.js';
import CenteredTradeModal from './centeredTradeModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import * as assetsApi from '../../api/assets.js';

const defaultCollumStyle = () => {
  return {
    color: '#dddddd'
  }
}

const colors = ["#FF6666", "#FFB266", "#FFFF66", "#66FF66", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF",
                "#FF66FF", "#FF66B2", "#C0C0C0"];

class AssetsMainPage extends Component {
  state = {
    loading: true,
    assets: [],
    asset_total: null,
    showModalOptions: false,
    showModalTrade: false,
    asset_id: null
  }

  toggleModalOptions = (asset_id) => {
    this.setState({ showModalOptions: !this.state.showModalOptions, asset_id: asset_id })
  }

  toggleModalTrade = (asset_id, trade_id) => {
    this.setState({ showModalTrade: !this.state.showModalTrade });
    console.log("Modal Trade Called - Show: ", this.state.showModalTrade);
  }

  expandRow = {
    renderer: row => (
      <TradeTable movements={row.movements} toggleModalTrade={this.toggleModalTrade} />
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
      dataField: 'code',
      text: 'Name',
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
      formatter: (cell, row) => { return `$ ${(row.total).toFixed(2)}`; },
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
        return (<span>
          <button className="btn btn-sm btn-light" onClick={() => this.toggleModalOptions(row._id)}>Options</button>&nbsp;
            <button className="btn btn-sm btn-light" onClick={() => this.toggleModalTrade(row._id, null)}>Add Trade</button>
        </span>)
      },
    }
  ];

  //dataCharts = [];

  async componentDidMount() {
    try {
      const axios = await assetsApi.list(1);
      console.log(axios);
      this.tableColumns[3].footer = `$ ${(axios.asset_total.total).toFixed(2)}`;
      this.tableColumns[4].footer = `${(axios.asset_total.irr * 100).toFixed(2)}%`;
      this.setState({ asset_total: axios.asset_total, loading: false, assets: axios.assets });
    } catch (error) {
      
    }

    /*fetch(process.env.REACT_APP_API_ADDRESS + "/assets?irr=1", {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.tableColumns[3].footer = `$ ${(result.asset_total.total).toFixed(2)}`;
        this.tableColumns[4].footer = `${(result.asset_total.irr * 100).toFixed(2)}%`;
        this.setState({ asset_total: result.asset_total, loading: false, assets: result.assets });
      });*/
  }

  render() {
    return (
      <div>
        <h1>Assets List</h1>
        <div className="container">
          {this.state.loading ? '' :
            <BootstrapTable keyField='id' classes="table table-dark" data={this.state.assets} columns={this.tableColumns}
              bordered={false} expandRow={this.expandRow} />}

          <div className="text-right" style={{ padding: "0px 20px 20px 0px" }}>
            <a className="btn btn-primary" role="button" href="/ativos/create">Novo</a>
          </div>
        </div>
        <CenteredOptionsModal show={this.state.showModalOptions} onHide={this.toggleModalOptions} assetId={this.state.asset_id} />
        <CenteredTradeModal show={this.state.showModalTrade} onHide={this.toggleModalTrade} />
      </div>
    );
  }
}

export default AssetsMainPage;