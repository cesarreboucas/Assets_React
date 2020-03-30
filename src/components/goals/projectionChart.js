import React from 'react';
import Chart from 'chart.js';

export default class ProjectionChart extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.colors = ["#eabd5d", "#cb5b5a", "#ac557a", "#8d4c7d", "#40324f"];
  }

  /*buildDatasets = (ds) => {
    // last element on DS data is the result (handled later)
    let datasets = [];
    for (let i = 0; i < ds.data.length; i++) {
      let dataset = {};
      dataset.label = ds.labels[i];
      dataset.data = ds.data[i];
      dataset.backgroundColor = this.colors[i%this.colors.length];
      dataset.order = i;
      dataset.yAxisID = 'A';
      dataset.type = 'bar';
      datasets.push(dataset);
    }
    datasets[datasets.length - 1].yAxisID = 'B';
    datasets[datasets.length - 1].type = 'line';
    datasets[datasets.length - 1].backgroundColor = 'rgba(172,85,98,0.3)';
    return datasets;
  }*/

  buildDatasets = (ds) => {
    // last element on DS data is the result (handled later)
    const MAX_BARS = 12;
    const datasets = [];
    let labels = [];
    for (let i = 0; i < ds.data.length; i++) {
      const dataset = {};
      if (ds.data[i].length <= MAX_BARS) {
        dataset.data = ds.data[i];
        labels = ds.x_labels;
      } else {
        const pass = Math.floor(ds.data[i].length / MAX_BARS);
        const dataArray = [];
        let total = 0;
        for (let j = 0; j < ds.data[i].length; ++j) {
          if (j % pass === pass - 1 || (ds.data[i].length - 1) === j) {
            total += ds.data[i][j];
            dataArray.push(total);
            total = 0;
            if (i === 0) { // Single array
              labels.push(ds.x_labels[j]);
            }
          } else {
            total += ds.data[i][j];
          }
        }
        dataset.data = dataArray;
      }
      dataset.label = ds.labels[i];
      dataset.backgroundColor = this.colors[i % this.colors.length];
      dataset.order = i;
      dataset.yAxisID = 'A';
      dataset.type = 'bar';
      datasets.push(dataset);
    }
    datasets[datasets.length - 1].yAxisID = 'B';
    datasets[datasets.length - 1].type = 'line';
    datasets[datasets.length - 1].backgroundColor = 'rgba(172,85,98,0.3)';
    return { datasets: datasets, labels: labels };
  }

  componentDidMount() {
    console.log("updated");
    console.log(this.props.ds)
    this.chart = new Chart(this.canvasRef.current, {
      data: this.buildDatasets(this.props.ds),
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [
            {
              id: 'A',
              type: 'linear',
              stacked: true,
              position: 'left',
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',
            }
          ]
        }
      }
    });
  }


  render() {
    return <canvas style={{ backgroundColor: 'white' }} ref={this.canvasRef} />;
  }

}