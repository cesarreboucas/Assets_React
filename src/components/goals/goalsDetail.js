import React from 'react';
import GoalItemForm from './goalItemForm';
import { userInfo } from '../../api/account.js';
import GoalsTable from './goalsTable';
import { Alert } from 'react-bootstrap';
import * as goalsApi from '../../api/goals.js';

export default class GoalsDetail extends React.Component {

  state = {
    nOfBoxes: 0,
    showTable: false,
    dataLoaded: 0,
    message: null,
    user_stats: { return: 0, asset_amt: 0 },

    _id: null,
    name: '',
    delete: false,
    deletechecker:'',
    insertAssets: true,
    returnWithIrr: true,
    useAssetIrrOnResult: true,
    irrOnResult: 1,
  }

  deleteInput = (i) => {
    this.data.boxes.splice(i, 1);
    //DataLoaded to force update inputs
    this.setState({ nOfBoxes: this.data.boxes.length, dataLoaded: this.state.dataLoaded + 1 });
  }

  data = {
    boxes: []
  };

  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < this.state.nOfBoxes; ++i) {
      boxes.push(<GoalItemForm n={i} key={this.state.dataLoaded + "_" + i}
        deleteInput={this.deleteInput} data={this.data} />)
    }
    return boxes;
  }

  async componentDidMount() {
    if (this.props.params.goal !== undefined && this.props.params.goal !== "create") {
      let goal;
      try {
        goal = await goalsApi.getGoal(this.props.params.goal);
        console.log("From DB", goal);
        this.data.boxes = goal.boxes;
        delete goal.boxes;
        this.setState({ ...goal });
      } catch (error) {
        console.log(error);
      }
    }

    //Converting toIsoStrings to Date Obj
    for (let i = 0; i < this.data.boxes.length; ++i) {
      const box = this.data.boxes[i];
      box.dateStart = new Date(this.data.boxes[i].dateStart);
      box.dateEnd = new Date(this.data.boxes[i].dateEnd);
    }
    let user = { stats: this.state.user_stats };
    try {
      user = await userInfo();
    } catch (error) {
    }
    this.setState({
      dataLoaded: this.state.dataLoaded + 1,
      nOfBoxes: this.data.boxes.length,
      showTable: false,
      user_stats: user.stats
    });
  }

  getIrrOnResult = () => {
    if (this.state.returnWithIrr) {
      if (this.state.useAssetIrrOnResult) {
        return this.state.user_stats.return * 100;
      } else {
        return this.state.irrOnResult;
      }
    } else {
      return 0;
    }
  }

  saveGoal = async () => {
    this.data._id = this.state._id;
    this.data.name = this.state.name;
    this.data.insertAssets = this.state.insertAssets;
    this.data.returnWithIrr = this.state.returnWithIrr;
    this.data.useAssetIrrOnResult = this.state.useAssetIrrOnResult;
    this.data.irrOnResult = this.state.irrOnResult;
    this.data.delete = this.state.delete;
    this.data.deletechecker = this.state.deletechecker;
    this.data.delete = false;
    if (this.data._id !== null) {
      await goalsApi.updateGoal(this.data);
      this.setState({ message: "Goal updated!" });
    } else {
      await goalsApi.createGoal(this.data);
      this.setState({ message: "Goal updated!" });
    }
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
              onBlur={(e) => { this.setState({ name: e.target.value }) }} defaultValue={this.state.name} />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="insertAssets"
              onChange={(e) => { this.setState({ insertAssets: e.target.checked }) }} defaultChecked={this.state.insertAssets} />
            <label className="form-check-label">Use my Assets as a starting point</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="returnWithIrr"
              onChange={(e) => { this.setState({ returnWithIrr: e.target.checked }) }} defaultChecked={this.state.returnWithIrr} />
            <label className="form-check-label">Update Return with an Interest Rate</label>
          </div>
          {
            this.state.returnWithIrr &&
            <React.Fragment>
              <div className="form-inline">
                <label>Yearly Interest Rate (%): </label>&nbsp;
              <input type="number" step="0.01" style={{ textAlign: 'right' }} className="form-control" name="irrOnResult"
                  disabled={this.state.useAssetIrrOnResult} defaultValue={this.state.irrOnResult}
                  onBlur={(e) => { this.setState({ irrOnResult: parseFloat(e.target.value) }) }} />
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
        <div className="form-check" style={{ backgroundColor: "#ffffff", marginBottom: "0px", marginTop: "0px" }}>
          <div className="form-row" style={{paddingLeft:"15px"}}>
            <div className="col-md-4">
              <input className="form-check-input" type="checkbox" name="insertAssets"
                onChange={(e) => { this.setState({ delete: e.target.checked }) }} defaultChecked={this.state.delete} />
              <label className="form-check-label">Delete Goal</label>
            </div>
            {
              this.state.delete &&
                <div className="form-group col-md-8">
                  <label htmlFor="ativo">Email Confirmation</label>
                  <input type="input" className="form-control" id="txtDeleteChecker" name="deletechecker"
                    onChange={(e) => this.setState({deletechecker : e.target.value})} placeholder="Please fill with your email" />
                </div>
          }
          </div>
        </div>
        <div className="form-group text-right" style={{ padding: "15px", backgroundColor: "#ffffff" }}>
          <button type="button" className="btn btn-primary" style={{ margin: "4px" }}
            onClick={() => this.setState({ showTable: !this.state.showTable })}>{this.state.showTable ? 'Hide Table' : 'Show Table'}</button>
          {
            (this.state.showTable ?
              <button type="button" className="btn btn-primary" style={{ margin: "4px" }}
                onClick={() => this.setState({ dataLoaded: this.state.dataLoaded + 1 })}>Update Table</button> : '')
          }
          <button type="button" className="btn btn-primary" style={{ margin: "4px" }}
            disabled={this.state.delete===true && this.state.deletechecker===''}
            onClick={() => this.saveGoal()}>Save Goal</button>
          {
            this.state.message !== null &&

            <Alert variant="success" style={{ marginTop: "20px", textAlign: "left" }}
              onClose={() => this.setState({ message: null })} dismissible>
              {this.state.message}
            </Alert >
          }
        </div>
        {
          this.state.showTable &&
          <div className="form-row">
            {
              <GoalsTable data={this.data} insertAssets={this.state.insertAssets} 
                assetsTotal={this.state.user_stats.asset_amt}
                irrOnResult={this.getIrrOnResult()} myIrr={this.state.user_stats.return * 100} />
            }
          </div>
        }
      </div>

    );
  }
}