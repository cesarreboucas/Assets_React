import React from 'react';
import GoalItemForm from './goalItemForm';
import { userInfo } from '../../api/account.js';
import GoalsTable from './goalsTable';
import * as goalsApi from '../../api/goals.js';

export default class GoalsDetail extends React.Component {

  state = {
    nOfBoxes: 0,
    showTable: false,
    dataLoaded: 0,
    user_stats: {return:0, asset_amt:0},

    _id: null,
    name:'',
    insertAssets:true,
    returnWithIrr:true,
    useAssetIrrOnResult:true,
    irrOnResult:1,
  }

  data = {
    boxes: []
  };

  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < this.state.nOfBoxes; ++i) {
      boxes.push(<GoalItemForm n={i} key={this.state.dataLoaded + "_" + i} saveData={this.saveDataFromBoxes} data={this.data.boxes[i]} />)
    }
    return boxes;
  }

  saveDataFromBoxes = (data, i) => {
    this.data.boxes[i] = data;
  }

  async componentDidMount() {
    if(this.props.params.goal!==undefined && this.props.params.goal!=="create") {
      let goal;
      try {
        goal = await goalsApi.getGoal(this.props.params.goal);  
        console.log("From DB",goal);
        this.data.boxes = goal.boxes;
        delete goal.boxes;
        this.setState({...goal});

      } catch (error) {
        console.log(error);
      }  
    }
    /*this.data = {
      boxes: [
        {
          description: 'Salary',
          periodicity: "monthly",
          value: 950,
          dateStart: "2017-12-10T00:22:15.357Z",
          dateEnd: "2024-12-10T00:22:16.357Z",
          interestRate: 2,
          useIRR: false
        },
        {
          description: 'Rent',
          periodicity: "monthly",
          value: -1500,
          dateStart: "2018-09-10T00:22:17.357Z",
          dateEnd: "2025-12-10T00:22:18.357Z",
          interestRate: 1,
          useIRR: false
        },
        {
          description: 'Gov Help',
          periodicity: "quaterly",
          value: 200,
          dateStart: "2020-09-10T00:22:00.357Z",
          dateEnd: "2025-12-10T00:22:00.357Z",
          interestRate: 1,
          useIRR: false
        }
      ]
    };*/

    //Converting toIsoStrings to Date Obj
    for(let i=0; i < this.data.boxes.length; ++i) {
      const box = this.data.boxes[i];
      box.dateStart = new Date(this.data.boxes[i].dateStart);
      box.dateEnd = new Date(this.data.boxes[i].dateEnd);
    }
    let user = {stats: this.state.user_stats};
    try {
      user = await userInfo();  
    } catch (error) {
      
    }
     
    this.setState({ dataLoaded: 1, nOfBoxes: this.data.boxes.length, showTable: false, user_stats: user.stats });
  }

  getIrrOnResult = () => {
    if(this.state.returnWithIrr) {
      if(this.state.useAssetIrrOnResult) {
        return this.state.user_stats.return * 100;
      } else {
        return this.state.irrOnResult;
      }
    } else {
      return 0;
    }
  }

  saveGoal = async () => {
    this.data.name = this.state.name;
    this.data.insertAssets = this.state.insertAssets;
    this.data.returnWithIrr = this.state.returnWithIrr;
    this.data.useAssetIrrOnResult = this.state.useAssetIrrOnResult;
    this.data.irrOnResult = this.state.irrOnResult;
    this.data.delete = false;
    await goalsApi.createGoal(this.data);
  }

  render() {
    return (
      <div className="container">
        <h1>Create</h1>
        <div className="form-group" style={{ padding: "10px 30px", backgroundColor: "#ffffff", margin: "0px" }}>
          <div className="form-row" >
            <h3>Options</h3>
          </div>
          <div className="form-row">
            <label>Name</label>
            <input type="text" className="form-control" name="name"
              onBlur={(e) => {this.setState({name:e.target.value})}} defaultValue={this.state.description}  />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="insertAssets"
              onChange={(e) => {this.setState({insertAssets: e.target.checked})}} defaultChecked={this.state.insertAssets} />
            <label className="form-check-label">Use my Assets as a starting point</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="returnWithIrr"
              onChange={(e) => {this.setState({returnWithIrr: e.target.checked})}} defaultChecked={this.state.returnWithIrr} />
            <label className="form-check-label">Update Return with an Interest Rate</label>
          </div>
          {
            this.state.returnWithIrr &&
            <React.Fragment>
              <div className="form-inline">
              <label>Yearly Interest Rate (%): </label>&nbsp;
              <input type="number" step="0.01" style={{ textAlign: 'right' }} className="form-control" name="irrOnResult"
                disabled={this.state.useAssetIrrOnResult}  defaultValue={this.state.irrOnResult}
                onBlur={(e) => {this.setState({irrOnResult: parseFloat(e.target.value)})}} />
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="useAssetIrrOnResult"
                  onChange={(e) => { this.setState({ useAssetIrrOnResult: e.target.checked }) }} defaultChecked={this.state.useAssetIrrOnResult} />
                <label className="form-check-label">Use my Assets Return Rate</label>
              </div>
            </React.Fragment>
          }
        </div>
        {
          this.renderBoxes()
        }
        <div className="form-group text-right" style={{ padding: "15px", backgroundColor: "#ffffff", margin: "0px" }}>
          <button type="button" className="btn btn-primary"
            onClick={() => { this.setState({ nOfBoxes: (this.state.nOfBoxes + 1) }) }}
          >Add Collumn</button>
        </div>
        <div className="form-group text-right" style={{ padding: "15px", backgroundColor: "#ffffff" }}>
          <button type="button" className="btn btn-primary" style={{ margin: "4px"}}
            onClick={() => this.setState({ showTable: !this.state.showTable })}>{this.state.showTable ? 'Hide Table' : 'Show Table'}</button>
          {
            (this.state.showTable?
              <button type="button" className="btn btn-primary" style={{ margin: "4px"}}
                onClick={() => this.setState({ dataLoaded: this.state.dataLoaded+1 })}>Update</button>:'')
          }            
          <button type="button" className="btn btn-primary" style={{ margin: "4px"}}
            onClick={() => this.saveGoal()}>Save</button>
        </div>
        {this.state.showTable &&
          <div className="form-row">
            {
              <GoalsTable data={this.data} insertAssets={this.state.insertAssets} assetsTotal={this.state.user_stats.asset_amt}
                irrOnResult={this.getIrrOnResult()} myIrr={this.state.user_stats.return * 100} />
            }
          </div>
        }
      </div>

    );
  }
}