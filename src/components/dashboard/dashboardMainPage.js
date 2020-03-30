import React from 'react';
import CanvasChart from './../common/canvasChart.js';
import BootstrapTable from 'react-bootstrap-table-next';
import { Redirect } from 'react-router-dom';
import * as assetsApi from '../../api/assets.js';

const defaultCollumStyle = () => {
  return {
    color: '#dddddd'
  }
}

class DashboardMainPage extends React.Component {
  state = {
    loading: true,
    assets: [],
    assetDetails:false,
    assetId:null

  };

  tableColumns = [
    {
      dataField: 'name',
      text: 'Name',
      style: defaultCollumStyle
    }, {
      dataField: 'balance',
      text: 'Balance',
      align: 'right',
      headerAlign: 'right',
      style: defaultCollumStyle
    }, {
      dataField: 'unit',
      text: 'Unit',
      formatter: (cell) => { return `$ ${cell.toFixed(2)}`; },
      align: 'right',
      headerAlign: 'right',
      style: defaultCollumStyle
    }, {
      dataField: 'total',
      text: 'Total',
      align: 'right',
      headerAlign: 'right',
      formatter: (cell, row) => { return `$ ${(row.unit * row.balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`; },
      style: defaultCollumStyle
    }, {
      dataField: 'options',
      text: 'Options',
      align: 'center',
      headerAlign: 'center',
      style: defaultCollumStyle,
      formatter: (cell, row) => {
        return (<span>
          <button className="btn btn-sm btn-light" onClick={() => this.setState({ assetDetails: true, assetId: row._id})}>Options</button>&nbsp;
          </span>)
      },
    }
  ];

  async componentDidMount() {
    const result = await assetsApi.list(0);
    console.log(result);
    this.dataCharts = [];
    this.buildDatasets(result.assets);
    this.setState({ loading: false, assets: result.assets });
  }

  redirectToAssetDetails = () => {
    if(this.state.assetDetails) {
      return (
        <Redirect push to={`/assets/${this.state.assetId}`} />
      )
    }
    return null;
  }
  
  render() {
    return (<div>
      { this.redirectToAssetDetails() }
      <h1>Dashboard</h1>
      <div className="container">
        <div className="collapse show " id="divGraph" style={{ margin: "auto" }}>
          <div className="row">
            <div className="col">
              <BootstrapTable keyField='id' classes="table table-dark" data={this.state.assets} columns={this.tableColumns} bordered={false} />
            </div>
          <div className="col">
            {this.state.loading ? '' : <CanvasChart data={this.dataCharts[0]} />}
          </div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.loading ? '' :<CanvasChart data={this.dataCharts[1]} />}
            </div>
          </div>
        </div>
      </div>
    </div>);
  }



  buildDatasets(assets) {

    this.dataCharts.push(
      {
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
      },
      {
        labels: ["Undefinded"],
        datasets: [
          { data: [0], backgroundColor: [colors[0]] },
          { data: [0], backgroundColor: [colors[0]] },
          { data: [0], backgroundColor: [colors[0]] },
        ]
      }
    );
    
    assets.forEach((asset, i) => {
      //console.log("Asset", asset);
      this.dataCharts[0].labels.push(asset.name);
      this.dataCharts[0].datasets[0].data.push(Number(asset.total.toFixed(2)));
      this.dataCharts[0].datasets[0].backgroundColor.push(colors[i % colors.length]);

      if (asset.group_a === undefined || asset.group_a === null || asset.group_a.length === 0) { // If there no classification
        this.dataCharts[1].datasets[0].data[0] += asset.total;
      } else { // For assets with a classification
        this.insertIntoDataset(asset.group_a,0,asset.total);
      }

      if (asset.group_b === undefined || asset.group_b === null || asset.group_b.length === 0) { // If there no classification
        this.dataCharts[1].datasets[1].data[0] += asset.total;
      } else { // For assets with a classification
        this.insertIntoDataset(asset.group_b,1,asset.total);
      }

      if (asset.group_c === undefined || asset.group_c === null || asset.group_c.length === 0) { // If there no classification
        this.dataCharts[1].datasets[2].data[0] += asset.total;
      } else { // For assets with a classification
        this.insertIntoDataset(asset.group_c,2,asset.total);
      }
    });
    console.log("DataSets Built", this.dataCharts);
  }

  insertIntoDataset(classification, dataset, value) {
    let position = this.dataCharts[1].labels.indexOf(classification);
    if (position === -1) { // Inserting the classification
      //Push the label
      this.dataCharts[1].labels.push(classification);
      //Push the value to the dataset and 0 to the others
      this.dataCharts[1].datasets[0].data.push( (dataset===0?value:0) );
      this.dataCharts[1].datasets[1].data.push( (dataset===1?value:0) );
      this.dataCharts[1].datasets[2].data.push( (dataset===2?value:0) );
      
      //Getting the next color
      let color = colors[this.dataCharts[1].datasets[0].backgroundColor.length % colors.length];
      //Putting the collor to all sets
      this.dataCharts[1].datasets[0].backgroundColor.push(color);
      this.dataCharts[1].datasets[1].backgroundColor.push(color);
      this.dataCharts[1].datasets[2].backgroundColor.push(color);
    } else { //If the classification were there already
      this.dataCharts[1].datasets[dataset].data[position] += value;
    }
  }
}

const colors = ["#FF6666", "#FFB266", "#FFFF66", "#66FF66", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF",
  "#FF66FF", "#FF66B2", "#C0C0C0"];

export default DashboardMainPage;