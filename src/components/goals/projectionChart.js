import React from 'react';
import Chart from 'chart.js';

export default class ProjectionChart extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    const colors = ["#FF6666", "#FFB266", "#FFFF66", "#66FF66", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF",
      "#FF66FF", "#FF66B2", "#C0C0C0"];
  }

  componentDidMount() {
    console.log("updated");
    this.chart = new Chart(this.canvasRef.current, {
      type: 'bar',
      data: {
        datasets: [
          {
          label: 'Bar Dataset',
          data: [25, 20, 30, 40],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
        ],
          order: 2
        },
        {
          label: 'Bar Dataset',
          data: [10, -11, 12, 14],
          backgroundColor: [
            'grey',
            'yellow',
            'violet',
            'green',
        ],
          order: 1
        },
        {
          label: 'Line Dataset',
          data: [10, 30, 50, 90],
          type: 'line',
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
        ],
          order: 3
        }
      ],
        labels: ['January', 'February', 'March', 'April']
      },
      options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
    });
  }


  render() {
    return <canvas style={{backgroundColor:'white'}} ref={this.canvasRef} />;
  }

}