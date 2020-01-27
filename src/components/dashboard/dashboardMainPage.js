import React from 'react';
import CanvasChart from './../common/canvasChart.js';
import BootstrapTable from 'react-bootstrap-table-next';
import * as assetsApi from '../../api/assets.js';


const defaultCollumStyle = () => {
  return {
    color: '#dddddd'
  }
}

class DashboardMainPage extends React.Component {
  state = {
    loading: true,
    assets: []
  };

  tableColumns = [
    {
      dataField: 'code',
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
          <button className="btn btn-sm btn-light" onClick={() => this.toggleModalOptions(row._id)}>Options</button>&nbsp;
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

    /*fetch(process.env.REACT_APP_API_ADDRESS + "/assets?irr=0", {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        this.dataCharts = [];
        this.buildDatasets(result.assets);
        console.log(result)
        this.setState({ loading: false, assets: result.assets });
      });*/
  }
  render() {
    return (<div>
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
            <div className="col">
              {this.state.loading ? '' :<CanvasChart data={this.dataCharts[2]} />}
            </div>
            <div className="col">
              {this.state.loading ? '' :<CanvasChart data={this.dataCharts[3]} />}
            </div>
          </div>
          {/*<div className="row">
            <div className="col">
              {this.state.loading ? '' : /*<CanvasChart data={this.dataCharts[4]} />*/}
            {/*</div>
          </div>*/}
        </div>
      </div>
    </div>);
  }



  buildDatasets(assets) {
    let dataChart = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }]
    };
    this.dataCharts.push(dataChart, {}, {}, {});
    this.dataCharts[1] = { labels: ["Undefined"], datasets: [{ data: [0], backgroundColor: [colors[0]] }] };
    this.dataCharts[2] = { labels: ["Undefined"], datasets: [{ data: [0], backgroundColor: [colors[0]] }] };
    this.dataCharts[3] = { labels: ["Undefined"], datasets: [{ data: [0], backgroundColor: [colors[0]] }] };
    /*LIXOOO
    this.dataCharts[4] = {
      labels: ["Undefined1","Undefinded2"],
      datasets: [
        {
          data: [15,0],
          backgroundColor: [colors[0],'']
        },
        {
          data: [0,12],
          backgroundColor: ['',colors[1]]
        },
      ]
    };
    */
    assets.forEach((asset, i) => {
      //console.log("Asset", asset);
      this.dataCharts[0].labels.push(asset.code);
      this.dataCharts[0].datasets[0].data.push(Number(asset.total.toFixed(2)));
      this.dataCharts[0].datasets[0].backgroundColor.push(colors[i % 10]);

      if (asset.group.group_a === undefined || asset.group.group_a === null || asset.group.group_a.length === 0) { // If there no classification
        this.dataCharts[1].datasets[0].data[0] += asset.total;
      } else { // For assets with a classification
        this.inserIntoDataset(asset.group.group_a, 1, asset.total);
      }

      if (asset.group.group_b === undefined || asset.group.group_b === null|| asset.group.group_b.length === 0) {
        this.dataCharts[2].datasets[0].data[0] += asset.total;
      } else {
        this.inserIntoDataset(asset.group.group_b, 2, asset.total);
      }

      if (asset.group.group_c === undefined || asset.group.group_b === null|| asset.group.group_c.length === 0) {
        this.dataCharts[3].datasets[0].data[0] += asset.total;
      } else {
        this.inserIntoDataset(asset.group.group_c, 3, asset.total);
      }
    });

    for (let x = 0; x < this.dataCharts.length; ++x) {
      if (this.dataCharts[x].datasets[0].data[0] === 0) {
        this.dataCharts[x].datasets[0].data.shift();
        //this.dataCharts[x].datasets[0].backgroundColor.shift();
        this.dataCharts[x].labels.shift();
      }
    }
    console.log("DataSets Built", this.dataCharts);
  }

  inserIntoDataset(classification, index, value) {
    let position = this.dataCharts[index].labels.indexOf(classification);
    if (position === -1) { // Inserting the classification
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

export default DashboardMainPage;