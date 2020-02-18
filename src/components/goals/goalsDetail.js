import React from 'react';
import GoalItemForm from './goalItemForm';

class GoalsDetail extends React.Component {

  state = {
    nOfBoxes: 1,
    showTable:false,
    dataLoaded:"0x"
  }

  data = [];

  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < this.state.nOfBoxes; ++i) {
      boxes.push(<GoalItemForm n={i} key={this.state.dataLoaded+"_"+i} saveData={this.saveData} data={this.data[i]} />)
    }
    return boxes;
  }

  saveData = (data, i) => {
    this.data[i] = data;
  }

  renderTable = () => {
    console.log(this.data);
    let minDate = new Date();
    let maxDate = new Date();

    for(let i=0; i < this.data.length; ++i) {
      if(minDate > this.data[i].dateStart) { minDate = this.data[i].dateStart}
      if(maxDate < this.data[i].dateEnd) { minDate = this.data[i].dateEnd}
    }
    let currentMonth = minDate;
    currentMonth.setDate(10);
    console.log(currentMonth);
  }

  componentDidMount() {
    this.data = [
      {
        description:'Salary',
        periodicity:"monthly",
        value:950,
        dateStart: new Date('2018-12-01'),
        dateEnd: new Date('2024-12-30'),
        interestRate:2,
        useIRR:false
      },
      {
        description:'Rent',
        periodicity:"monthly",
        value:-1500,
        dateStart: new Date('2018-09-01'),
        dateEnd: new Date('2025-12-30'),
        interestRate:1,
        useIRR:false
      }
    ]
    this.setState({dataLoaded:"1x", nOfBoxes:this.data.length});
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        {
          this.renderBoxes()
        }
        <div className="form-group text-right" style={{padding:"15px", backgroundColor:"#ffffff", margin:"0px"}}>
          <button type="button" className="btn btn-primary" 
            onClick={() => {this.setState({nOfBoxes: (this.state.nOfBoxes+1)})}} 
            >Add Collumn</button>
        </div>
        <div className="form-group text-right" style={{padding:"15px", backgroundColor:"#ffffff"}}>
          <button type="button" className="btn btn-primary"
            onClick={()=> this.setState({showTable: !this.state.showTable})}>{this.state.showTable?'Hide':'Show'}</button>&nbsp;
          <button type="button" className="btn btn-primary">Save</button>
        </div>
        { this.state.showTable && 
          <div className="form-row">
            {
              this.renderTable()
            }
          </div>
        }
      </div>
      
    );
  }
}

export default GoalsDetail;