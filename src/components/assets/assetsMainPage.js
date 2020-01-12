import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import TradeTable from './tradeTable.js';
import CanvasChart from './canvasChart.js';
import CenteredOptionsModal from './centeredOptionsModal.js';
import CenteredTradeModal from './centeredTradeModal.js';

const defaultCollumStyle = () => {
  return {
    color: '#dddddd'
  }
}

class AssetsMainPage extends Component {
  state =  {
      loading:true,
      assets: [],
      showModalOptions:false,
      showModalTrade:false,
      asset_id:null
    }

    toggleModalOptions = (asset_id) => {
      this.setState({showModalOptions:!this.state.showModalOptions, asset_id:asset_id})
    }

    toggleModalTrade = (asset_id, trade_id) => {
      this.setState({showModalTrade:!this.state.showModalTrade});
      console.log("Modal Trade Called - Show: ", this.state.showModalTrade);
    }

    expandRow = {
      renderer: row => (
        <TradeTable trades={row.trades} toggleModalTrade={this.toggleModalTrade}/>
      ),showExpandColumn: true,
      expandByColumnOnly: true
    };

  tableColumns = [
    {
      dataField: 'codigo',
      text: 'Name',
      style: defaultCollumStyle
    }, {
      dataField: 'saldo',
      text: 'Balance',
      align: 'right',
      style: defaultCollumStyle
    }, {
      dataField: 'unitario',
      text: 'Unit',  
      formatter: (cell) => { return `$ ${cell.toFixed(2)}`;},
      align: 'right',
      style: defaultCollumStyle
    }, {
      dataField: 'total',
      text: 'Total',
      align: 'right',
      formatter: (cell,row) => { return `$ ${(row.unitario * row.saldo).toFixed(2)}`;},
      style: defaultCollumStyle
    }, {
      dataField: 'guess',
      text: 'Return',
      align: 'right',
      formatter: (cell) => { return `${(cell*100).toFixed(2)}%`;},
      style: defaultCollumStyle
    }, {
      dataField: 'options',
      text: 'Options',
      style: defaultCollumStyle,
      formatter: (cell,row) => { 
        return (<span>
            <button className="btn btn-sm btn-light" onClick={() => this.toggleModalOptions(row._id)}>Options</button>&nbsp;
            <button className="btn btn-sm btn-light" onClick={() => this.toggleModalTrade(row._id,null)}>Add Trade</button>
          </span>)},
    }
  ];

    //dataCharts = [];
    
  componentDidMount(){
    fetch(process.env.REACT_APP_API_ADDRESS+"/ativos", {headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(result => {
      this.dataCharts = [];
      this.buildDatasets(result);
      this.setState({loading:false,assets: result});
      console.log(this.state.assets);
    });
  }
  
  render() {
    return (
      <div>
        <h1>Assets List</h1>
        <div className="container">
          <BootstrapTable keyField='id' classes="table table-dark" data={this.state.assets} columns={this.tableColumns} bordered={false} expandRow={this.expandRow}/>         
          
          <div className="text-right" style={{padding: "0px 20px 20px 0px"}}>
            <a className="btn btn-primary" data-toggle="collapse" href="#divGraph" role="button">Ver Gr&aacute;fico</a>&nbsp;
            <a className="btn btn-primary" role="button" href="/ativos/create">Novo</a>
          </div>
          <div className="collapse show " id="divGraph" style={{width:"800px", margin:"auto"}}>
            <div className="row">
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[0]} />}
              </div>
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[1]} />}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[2]} />}
              </div>
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[3]} />}
              </div>
            </div>
          </div>
        </div>
        <CenteredOptionsModal show={this.state.showModalOptions} onHide={this.toggleModalOptions} assetId={this.state.asset_id}/>
        <CenteredTradeModal show={this.state.showModalTrade} onHide={this.toggleModalTrade} />   
      </div>
    );
  }
  
  buildDatasets(assets) {
    let dataChart = {
      labels: [], 
      datasets:[{ data: [], backgroundColor: [] }]
    };
    this.dataCharts.push(dataChart, {}, {}, {});
    this.dataCharts[1] = {labels: ["Undefined"], datasets:[{ data: [0], backgroundColor: [colors[0]] }]};
    this.dataCharts[2] = {labels: ["Undefined"], datasets:[{ data: [0], backgroundColor: [colors[0]] }]};
    this.dataCharts[3] = {labels: ["Undefined"], datasets:[{ data: [0], backgroundColor: [colors[0]] }]};

    assets.forEach((asset, i) => {
      //console.log("Asset", asset);
      this.dataCharts[0].labels.push(asset.codigo);
      this.dataCharts[0].datasets[0].data.push(Number(asset.patrimonio.toFixed(2)));
      this.dataCharts[0].datasets[0].backgroundColor.push(colors[i%10]);

      if(asset.class.c1 === undefined || asset.class.c1.length === 0) { // If there no classification
        this.dataCharts[1].datasets[0].data[0] += asset.patrimonio;
      } else { // For assets with a classification
        this.inserIntoDataset(asset.class.c1, 1, asset.patrimonio);
      }

      if(asset.class.c2 === undefined || asset.class.c2.length === 0) { 
        this.dataCharts[2].datasets[0].data[0] += asset.patrimonio;
      } else { 
        this.inserIntoDataset(asset.class.c2, 2, asset.patrimonio);
      }

      if(asset.class.c3 === undefined || asset.class.c3.length === 0) { 
        this.dataCharts[3].datasets[0].data[0] += asset.patrimonio;
      } else { 
        this.inserIntoDataset(asset.class.c3, 3, asset.patrimonio);
      }
    });
    console.log("DataSets Built",this.dataCharts);
  }

  inserIntoDataset(classification, index, value) {
    let position = this.dataCharts[index].labels.indexOf(classification);
    if(position===-1) { // Inserting the classification
      this.dataCharts[index].labels.push(classification);
      this.dataCharts[index].datasets[0].data.push(value);
      this.dataCharts[index].datasets[0].backgroundColor.push(colors[this.dataCharts[1].datasets[0].backgroundColor.length]);
      
    } else { //If the classification were there already
      this.dataCharts[index].datasets[0].data[position] += value;
    }
  }
}

const colors = ["#FF6666", "#FFB266", "#FFFF66", "#66FF66", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF",
"#FF66FF", "#FF66B2", "#C0C0C0"];

export default AssetsMainPage;