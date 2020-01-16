import React, {Component} from 'react';
import Chart from 'chart.js';

class CanvasChart extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        /*this.data = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };*/
      }
    
      componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
          type: 'doughnut',
          data: this.props.data,
          options: {
            "animation.animateRotate":false,
            legend: {
                position: 'right',
                labels: {
                    fontSize: 14,
                    boxWidth: 50,
                    fontColor:'#ffffff',
                }
            },
            tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                      return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = ((currentValue/total) * 100);
                    return percentage.toFixed(2) + "%";
                  }
                }
            }
          }
        });
        //console.log("Graph Mounted", this.props);
      }
      render() {
        return <canvas ref={this.canvasRef} />;
      }
}
export default CanvasChart;