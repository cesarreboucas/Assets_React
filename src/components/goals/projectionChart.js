import React from 'react';
import Chart from 'chart.js';

export default class ProjectionChart extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.colors = ["#eabd5d", "#cb5b5a", "#ac557a", "#8d4c7d", "#40324f"];
  }

  buildDatasets = (ds) => {
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
  }

  componentDidMount() {
    console.log("updated");
    console.log(this.props.ds)
    this.chart = new Chart(this.canvasRef.current, {
      data: {
        datasets: this.buildDatasets(this.props.ds), 
        /*[
          {
          label: 'Bar Dataset',
          data: [25, 20, 30, 40],
          backgroundColor: 'rgba(255, 99, 132)',
          order: 1
        },
        {
          label: 'Bar Dataset',
          data: [10, -11, 12, 14],
          backgroundColor: 'grey',
          order: 0
        },
        {
          label: 'Line Dataset',
          data: [10, 30, 50, 90],
          type: 'line',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          order: 3
        }
      ],*/
        labels: this.props.ds.x_labels
      },
      options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [
                /*{stacked: true}*/
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
    return <canvas style={{backgroundColor:'white'}} ref={this.canvasRef} />;
  }

}